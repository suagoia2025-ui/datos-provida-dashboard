# Guía de Deployment

## 🚀 Estrategia de Deployment

Este proyecto utiliza una estrategia de deployment modular:
- **Frontend**: Vercel
- **Backend**: Railway (alternativa: Render)
- **Base de Datos**: Railway PostgreSQL (alternativa: Supabase)

---

## 📋 Pre-requisitos

Antes de hacer deploy, asegúrate de tener:

- [ ] Cuenta en Vercel
- [ ] Cuenta en Railway o Render
- [ ] Repositorio en GitHub
- [ ] Variables de entorno configuradas
- [ ] Tests pasando
- [ ] Build local exitoso

---

## 🎯 PARTE 1: Deploy del Frontend (Vercel)

### Paso 1: Preparar el Proyecto

```bash
# Navegar al frontend
cd frontend

# Verificar que build funciona localmente
npm run build

# Verificar que no hay errores de TypeScript
npm run type-check

# Verificar que linter pasa
npm run lint
```

### Paso 2: Conectar con Vercel

**Opción A: Desde la interfaz web**

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Import tu repositorio de GitHub
4. Selecciona la carpeta `frontend/`
5. Configura las variables de entorno (ver abajo)
6. Click en "Deploy"

**Opción B: Desde CLI**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy desde la carpeta frontend
cd frontend
vercel

# Para producción
vercel --prod
```

### Paso 3: Configurar Variables de Entorno

En el dashboard de Vercel, agrega estas variables:

```env
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api/v1
NEXT_PUBLIC_ENVIRONMENT=production
```

### Paso 4: Configurar Dominio (Opcional)

1. Ve a Settings > Domains
2. Agrega tu dominio personalizado
3. Configura DNS según instrucciones
4. Espera propagación (~24-48 horas)

### Paso 5: Configurar Build Settings

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

---

## 🎯 PARTE 2: Deploy del Backend (Railway)

### Paso 1: Preparar el Proyecto

```bash
# Navegar al backend
cd backend

# Verificar que build funciona
npm run build

# Verificar que tests pasan
npm test

# Verificar conexión a BD local
npm run migrate:dev
```

### Paso 2: Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio
5. Selecciona la carpeta `backend/`

### Paso 3: Agregar PostgreSQL

1. En tu proyecto Railway, click en "New"
2. Selecciona "Database"
3. Escoge "PostgreSQL"
4. Railway automáticamente crea `DATABASE_URL`

### Paso 4: Configurar Variables de Entorno

En Railway Settings > Variables:

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=tu_secret_super_seguro_cambiar
CORS_ORIGIN=https://tu-frontend.vercel.app

# API Keys (si aplica)
WHO_API_KEY=xxx
WORLDBANK_API_KEY=xxx
```

### Paso 5: Configurar Build

```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Paso 6: Ejecutar Migraciones

**Opción A: Desde Railway CLI**

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Linkar al proyecto
railway link

# Ejecutar migraciones
railway run npm run migrate:deploy
```

**Opción B: Desde el Dashboard**

1. Ve a tu servicio de backend
2. Click en "Settings"
3. Scroll a "Deploy"
4. Agrega comando de migración en "Build Command":

```bash
npm run build && npm run migrate:deploy
```

### Paso 7: Health Check

Verifica que el backend esté funcionando:

```bash
curl https://tu-backend.railway.app/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-10-16T10:00:00.000Z",
  "database": "connected"
}
```

---

## 🎯 PARTE 3: Configurar CI/CD con GitHub Actions

### Archivo: .github/workflows/deploy.yml

```yaml
name: Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18.x'

jobs:
  # ========== FRONTEND ==========
  test-frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

  # ========== BACKEND ==========
  test-backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: provida_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate Prisma Client
        run: npx prisma generate
      
      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/provida_test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/provida_test
      
      - name: Build
        run: npm run build

  # ========== DEPLOY FRONTEND ==========
  deploy-frontend:
    needs: [test-frontend, test-backend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'

  # ========== DEPLOY BACKEND ==========
  deploy-backend:
    needs: [test-frontend, test-backend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

### Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions
3. Agrega estos secrets:

```
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
RAILWAY_TOKEN=xxx
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api/v1
```

---

## 🎯 PARTE 4: Monitoreo Post-Deployment

### 1. Health Checks

Crea endpoint de health check en backend:

```typescript
// src/routes/health.routes.ts
router.get('/health', async (req, res) => {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: process.env.npm_package_version
    })
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new.toISOString(),
      database: 'disconnected',
      error: error.message
    })
  }
})
```

### 2. Uptime Monitoring

Configura servicios de monitoreo:

**Opción A: UptimeRobot (Gratis)**
1. Crea cuenta en [uptimerobot.com](https://uptimerobot.com)
2. Agrega monitors para:
   - Frontend: https://tu-app.vercel.app
   - Backend API: https://tu-backend.railway.app/health
3. Configura alertas por email

**Opción B: Railway Built-in**
- Railway incluye métricas básicas
- Ve a tu servicio > Metrics

### 3. Error Tracking

**Sentry (Recomendado)**

```bash
# Instalar en ambos proyectos
npm install @sentry/nextjs  # Frontend
npm install @sentry/node    # Backend
```

Configurar:

```typescript
// frontend/sentry.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  tracesSampleRate: 0.1,
})

// backend/src/config/sentry.ts
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

### 4. Logs

**Railway Logs:**
```bash
# Ver logs en tiempo real
railway logs

# Filtrar por servicio
railway logs -s backend
```

**Vercel Logs:**
1. Dashboard > Tu proyecto > Logs
2. Filtrar por deployment

---

## 🔄 PARTE 5: Actualizar y Rollback

### Actualizar Aplicación

```bash
# Hacer cambios en tu código
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# CI/CD automáticamente:
# 1. Ejecuta tests
# 2. Hace build
# 3. Deploya si todo pasa
```

### Rollback en Vercel

1. Dashboard de Vercel
2. Deployments
3. Encuentra el deployment anterior
4. Click en "..." > "Promote to Production"

### Rollback en Railway

1. Dashboard de Railway
2. Tu servicio > Deployments
3. Encuentra el deployment anterior
4. Click en "Redeploy"

### Rollback de Base de Datos

```bash
# Conectar a Railway
railway link

# Ver migraciones
railway run npx prisma migrate status

# Rollback (¡CUIDADO!)
railway run npx prisma migrate resolve --rolled-back MIGRATION_NAME
```

---

## 🎯 PARTE 6: Environments

### Desarrollo (Local)

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_ENVIRONMENT=development

# backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/provida_dev
NODE_ENV=development
PORT=4000
```

### Staging (Opcional)

```env
# Branch: develop
# Vercel preview deployment automático
# Railway staging environment

NEXT_PUBLIC_API_URL=https://staging-backend.railway.app/api/v1
NEXT_PUBLIC_ENVIRONMENT=staging
```

### Producción

```env
# Branch: main
# Variables configuradas en Vercel/Railway

NEXT_PUBLIC_API_URL=https://api.datosprovidadashboard.com/api/v1
NEXT_PUBLIC_ENVIRONMENT=production
```

---

## 🔐 PARTE 7: Seguridad en Producción

### Checklist de Seguridad

- [ ] Todas las API keys en variables de entorno
- [ ] HTTPS habilitado (automático en Vercel/Railway)
- [ ] CORS configurado correctamente
- [ ] Rate limiting activo
- [ ] Headers de seguridad configurados
- [ ] SQL injection prevention (Prisma lo hace)
- [ ] Validación de inputs (Zod)
- [ ] Passwords hasheados (bcrypt)
- [ ] JWT secrets fuertes
- [ ] No hay console.logs con data sensible
- [ ] Backups de base de datos configurados

### Headers de Seguridad

```typescript
// backend/src/middlewares/security.ts
import helmet from 'helmet'

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
}))
```

### CORS Configuration

```typescript
// backend/src/config/cors.ts
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
```

---

## 📊 PARTE 8: Performance en Producción

### Frontend Optimizations

```javascript
// next.config.js
module.exports = {
  // Compresión
  compress: true,
  
  // Image optimization
  images: {
    domains: ['tu-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Headers caching
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
}
```

### Backend Optimizations

```typescript
// Compression middleware
import compression from 'compression'
app.use(compression())

// Connection pooling
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Para migraciones
}

// Pool configurado en Railway/Supabase automáticamente
```

---

## 🗄️ PARTE 9: Backups

### Base de Datos

**Railway (Automático):**
- Backups diarios automáticos
- Retención de 7 días en plan gratuito
- 30 días en planes pagos

**Manual:**

```bash
# Backup manual
railway run pg_dump $DATABASE_URL > backup.sql

# Restaurar
railway run psql $DATABASE_URL < backup.sql
```

### Código

```bash
# Git es tu backup
# Asegúrate de:
- Push frecuente a GitHub
- Tags para releases importantes

git tag -a v1.0.0 -m "Primera versión estable"
git push origin v1.0.0
```

---

## 📈 PARTE 10: Scaling

### Horizontal Scaling

**Vercel:**
- Escala automáticamente según tráfico
- No requiere configuración adicional

**Railway:**
1. Dashboard > Tu servicio > Settings
2. Resources:
   - vCPU: Ajustar según carga
   - Memory: Ajustar según uso
3. Replicas (en planes pagos):
   - Múltiples instancias
   - Load balancing automático

### Database Scaling

**Cuando escalar:**
- Queries lentas (>500ms)
- CPU >80% constantemente
- Conexiones cerca del límite

**Opciones:**
1. **Vertical**: Aumentar recursos de BD
2. **Read Replicas**: Para queries de lectura
3. **Connection Pooling**: PgBouncer
4. **Índices**: Optimizar queries

---

## 🚨 PARTE 11: Troubleshooting

### Frontend no carga

```bash
# Verificar build logs en Vercel
# Común: variables de entorno faltantes

# Fix:
1. Vercel Dashboard > Settings > Environment Variables
2. Agregar NEXT_PUBLIC_API_URL
3. Redeploy
```

### Backend no responde

```bash
# Ver logs en Railway
railway logs -s backend

# Problemas comunes:
1. Migraciones no ejecutadas
   Fix: railway run npm run migrate:deploy

2. Variables de entorno faltantes
   Fix: Railway > Settings > Variables

3. Puerto incorrecto
   Fix: Usar PORT=4000 o el que Railway asigne

4. Base de datos no conectada
   Fix: Verificar DATABASE_URL
```

### Base de datos llena

```bash
# Verificar uso
railway run psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size('railway'));"

# Limpiar logs antiguos
railway run npm run db:clean-logs
```

### Errores 429 (Rate Limit)

```typescript
// Aumentar límites temporalmente
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // Aumentado de 100
})
```

### Build falla

```bash
# Verificar localmente primero
npm run build

# Errores comunes:
1. TypeScript errors
   Fix: npm run type-check y corregir

2. Linter errors
   Fix: npm run lint --fix

3. Tests fallando
   Fix: npm test y corregir

4. Dependencias faltantes
   Fix: Verificar package.json
```

---

## 📞 PARTE 12: Support y Recursos

### Vercel

- Docs: https://vercel.com/docs
- Status: https://vercel-status.com
- Support: support@vercel.com (planes pagos)
- Community: https://github.com/vercel/next.js/discussions

### Railway

- Docs: https://docs.railway.app
- Status: https://railway.statuspage.io
- Discord: https://discord.gg/railway
- Support: team@railway.app

### Prisma

- Docs: https://www.prisma.io/docs
- Community: https://www.prisma.io/community

---

## ✅ Checklist Final Pre-Deploy

### Código

- [ ] Todos los tests pasan
- [ ] Build funciona localmente
- [ ] No hay console.logs sensibles
- [ ] Variables de entorno documentadas
- [ ] README actualizado

### Seguridad

- [ ] Secrets en variables de entorno
- [ ] CORS configurado
- [ ] Rate limiting activo
- [ ] Headers de seguridad
- [ ] HTTPS habilitado

### Base de Datos

- [ ] Migraciones listas
- [ ] Seeds preparados (opcional)
- [ ] Índices configurados
- [ ] Backups configurados

### Monitoreo

- [ ] Health checks funcionando
- [ ] Sentry configurado
- [ ] Uptime monitoring activo
- [ ] Logs accesibles

### Performance

- [ ] Lighthouse score >90
- [ ] Imágenes optimizadas
- [ ] Caché configurado
- [ ] Compresión activa

### Documentación

- [ ] API documentada (Swagger)
- [ ] README completo
- [ ] DEPLOYMENT.md actualizado
- [ ] CHANGELOG iniciado

---

## 🎉 ¡Deploy Exitoso!

Si llegaste aquí y todo funciona:

1. ✅ Frontend en Vercel funcionando
2. ✅ Backend en Railway funcionando
3. ✅ Base de datos conectada
4. ✅ CI/CD configurado
5. ✅ Monitoreo activo

**URLs de tu proyecto:**
- Frontend: https://tu-app.vercel.app
- Backend API: https://tu-backend.railway.app
- API Docs: https://tu-backend.railway.app/api/v1/docs

**Próximos pasos:**
1. Monitorear logs primeras 48 horas
2. Recoger feedback de usuarios
3. Iterar y mejorar
4. Celebrar 🎉

---

## 📚 Recursos Adicionales

### Tutoriales

- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Railway Deployment Guide](https://docs.railway.app/deploy/deployments)
- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)

### Herramientas Útiles

- **Lighthouse**: Auditoría de performance
- **Postman**: Testing de API
- **DB Diagram**: Diseño de base de datos
- **Figma**: Diseño de UI

### Comunidades

- r/nextjs
- r/node
- Railway Discord
- Vercel Discord

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025  
**Mantenido por:** Tu equipo

¡Buena suerte con tu deploy! 🚀