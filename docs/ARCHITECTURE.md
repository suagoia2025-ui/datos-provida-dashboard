# Arquitectura del Sistema

## 📐 Visión General

El sistema está diseñado con una arquitectura de microservicios separando completamente el frontend del backend, permitiendo escalabilidad, mantenibilidad y despliegue independiente.

## 🏗️ Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIOS                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │  Gráficos    │  │  Filtros     │      │
│  │  Principal   │  │  Interactivos│  │  Regionales  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  Deploy: Vercel                                              │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY / BACKEND                      │
│                    (Node.js + Express)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Endpoints REST                          │   │
│  │  /api/v1/indicators                                  │   │
│  │  /api/v1/regions                                     │   │
│  │  /api/v1/statistics                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                     │
│  ┌──────────────┐  ┌───┴────────┐  ┌──────────────┐        │
│  │ Controllers  │  │  Services  │  │ External API │        │
│  │              │  │            │  │  Connectors  │        │
│  └──────────────┘  └────────────┘  └──────────────┘        │
│                                                               │
│  Deploy: Railway/Render                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  BASE DE DATOS (PostgreSQL)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Indicators  │  │   Regions    │  │  Statistics  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  Data Sources│  │  API Logs    │                         │
│  └──────────────┘  └──────────────┘                         │
│                                                               │
│  Deploy: Railway/Supabase                                    │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    APIS EXTERNAS                             │
│  • WHO API                                                   │
│  • World Bank Open Data                                      │
│  • UN Data                                                   │
│  • Data.gov                                                  │
│  • PubMed                                                    │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Capas de la Aplicación

### 1. Capa de Presentación (Frontend)

**Tecnologías:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts

**Responsabilidades:**
- Renderizar interfaz de usuario
- Gestionar estado local (Context API / Zustand)
- Consumir API REST
- Caché de datos con SWR
- Experiencia de usuario optimizada

**Estructura:**
```
frontend/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx           # Dashboard principal
│   │   ├── layout.tsx         # Layout global
│   │   └── api/               # API Routes (opcional)
│   ├── components/
│   │   ├── ui/                # Componentes reutilizables
│   │   ├── charts/            # Gráficos
│   │   ├── filters/           # Filtros y controles
│   │   └── layout/            # Layout components
│   ├── services/              # Llamadas a API
│   ├── hooks/                 # Custom hooks
│   ├── types/                 # TypeScript types
│   ├── utils/                 # Utilidades
│   └── constants/             # Constantes
├── public/                    # Archivos estáticos
└── styles/                    # Estilos globales
```

### 2. Capa de Lógica de Negocio (Backend)

**Tecnologías:**
- Node.js 18+
- Express.js
- TypeScript
- Prisma ORM
- Zod (validación)
- Axios (llamadas a APIs externas)

**Responsabilidades:**
- Exponer endpoints REST
- Validar datos de entrada
- Procesar y transformar datos
- Integrar APIs externas
- Cachear datos frecuentes
- Logging y monitoreo

**Estructura:**
```
backend/
├── src/
│   ├── controllers/           # Controladores REST
│   ├── services/              # Lógica de negocio
│   ├── repositories/          # Acceso a datos
│   ├── middlewares/           # Middlewares
│   ├── routes/                # Definición de rutas
│   ├── validators/            # Schemas de validación
│   ├── integrations/          # Conectores APIs externas
│   │   ├── who.service.ts
│   │   ├── worldbank.service.ts
│   │   └── undata.service.ts
│   ├── types/                 # TypeScript types
│   ├── utils/                 # Utilidades
│   └── config/                # Configuración
├── prisma/
│   ├── schema.prisma          # Schema de BD
│   └── migrations/            # Migraciones
└── tests/                     # Tests unitarios/integración
```

### 3. Capa de Datos (PostgreSQL)

**Responsabilidades:**
- Almacenar indicadores históricos
- Guardar datos de regiones
- Logs de consultas a APIs
- Caché de datos externos

**Optimizaciones:**
- Índices en campos frecuentemente consultados
- Particionamiento por fechas
- Vistas materializadas para queries complejas

## 🔄 Flujo de Datos

### Flujo de Consulta Típico

```
1. Usuario solicita datos en Dashboard
   ↓
2. Frontend hace request a API: GET /api/v1/indicators?region=latam
   ↓
3. Backend recibe request
   ↓
4. Controller valida parámetros
   ↓
5. Service verifica caché en BD
   ↓
6. Si no hay caché → llama a API externa
   ↓
7. Transforma y normaliza datos
   ↓
8. Guarda en BD para caché
   ↓
9. Devuelve respuesta JSON al Frontend
   ↓
10. Frontend renderiza gráficos y tablas
```

## 🔐 Seguridad

### Medidas Implementadas

1. **Autenticación (Opcional Fase 2):**
   - JWT tokens
   - Refresh tokens

2. **Validación:**
   - Zod schemas en todas las entradas
   - Sanitización de datos

3. **Rate Limiting:**
   - Límite de requests por IP
   - Límite de consultas a APIs externas

4. **CORS:**
   - Configuración restrictiva
   - Solo dominios autorizados

5. **Variables de Entorno:**
   - API keys nunca en código
   - Uso de .env

## 📊 Estrategia de Caché

### Niveles de Caché

1. **Frontend (SWR):**
   - Caché en cliente
   - Revalidación automática
   - TTL: 5 minutos

2. **Backend (Redis - Fase 2):**
   - Caché de respuestas API
   - TTL: 1 hora

3. **Base de Datos:**
   - Tabla de caché de APIs externas
   - TTL: 24 horas

## 🚀 Escalabilidad

### Estrategias

1. **Horizontal:**
   - Múltiples instancias de backend
   - Load balancer

2. **Vertical:**
   - Incremento de recursos por instancia

3. **Base de Datos:**
   - Read replicas
   - Connection pooling

## 📈 Monitoreo

### Herramientas (Fase 2)

- Logs estructurados (Winston)
- Error tracking (Sentry)
- Métricas de performance
- Uptime monitoring

## 🧪 Testing

### Estrategia

1. **Unit Tests:**
   - Services
   - Utilities
   - Cobertura mínima: 70%

2. **Integration Tests:**
   - Endpoints API
   - Conexión con BD

3. **E2E Tests:**
   - Flows críticos del Dashboard
   - Playwright

## 🔧 DevOps

### CI/CD Pipeline

```
Push a GitHub
  ↓
GitHub Actions
  ↓
1. Linting (ESLint)
2. Type checking (TypeScript)
3. Tests (Jest)
4. Build
  ↓
Deploy
  ↓
- Frontend → Vercel
- Backend → Railway/Render
- DB → Railway/Supabase
```

## 📦 Docker

### Servicios

```yaml
services:
  frontend:  # Next.js en puerto 3000
  backend:   # Express en puerto 4000
  postgres:  # PostgreSQL en puerto 5432
  redis:     # Redis en puerto 6379 (Fase 2)
```

## 🎨 Principios de Diseño

1. **Separation of Concerns:** Frontend y Backend totalmente desacoplados
2. **DRY:** No repetir código
3. **SOLID:** Principios en clases y servicios
4. **RESTful:** APIs siguiendo convenciones REST
5. **TypeScript First:** Type safety en todo el código

## 📝 Decisiones Técnicas

### ¿Por qué Next.js?
- SSR y SSG para mejor SEO
- Optimización de imágenes
- API Routes (si se necesitan)
- Excelente DX

### ¿Por qué Express?
- Ligero y flexible
- Gran ecosistema
- Fácil de testear

### ¿Por qué PostgreSQL?
- Relacional (datos estructurados)
- Excelente para reportes
- JSON support para datos flexibles
- Open source

### ¿Por qué TypeScript?
- Type safety
- Mejor autocompletado
- Menos bugs en producción
- Mejor mantenibilidad

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025