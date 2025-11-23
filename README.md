# Datos Pro-Vida Dashboard

## 📊 Descripción del Proyecto

Dashboard interactivo para visualizar y analizar indicadores globales sobre temas pro-vida: aborto, eutanasia, ideología de género, drogadicción, investigación con células madre embrionarias, trata de personas y otros temas relacionados.

## 🎯 Objetivo

Proporcionar una plataforma centralizada con datos verificables y actualizados de fuentes oficiales para informar y concientizar sobre estos temas a nivel global, permitiendo comparaciones entre regiones.

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 14 (React)
- **Estilos:** Tailwind CSS
- **Gráficos:** Recharts / Chart.js
- **Estado:** React Context / Zustand
- **Deploy:** Vercel

### Backend
- **Framework:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Validación:** Zod
- **Deploy:** Railway / Render

### DevOps
- **Contenedores:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Control de versiones:** Git + GitHub

## 📁 Estructura del Proyecto

```
datos-provida-dashboard/
├── frontend/              # Aplicación Next.js
├── backend/               # API Express
├── docs/                  # Documentación completa
├── docker-compose.yml     # Orquestación de contenedores
└── .github/               # Workflows y templates
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- Git
- PostgreSQL (opcional, se puede usar con Docker)

### Instalación Local

#### Opción 1: Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/datos-provida-dashboard.git
cd datos-provida-dashboard

# Levantar todos los servicios
docker-compose up -d

# Ejecutar migraciones y seeds
docker-compose exec backend npx prisma migrate dev --name init
docker-compose exec backend npm run seed
```

#### Opción 2: Instalación Manual

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/datos-provida-dashboard.git
cd datos-provida-dashboard

# Instalar dependencias del frontend
cd frontend
npm install
npm run dev

# Instalar dependencias del backend
cd ../backend
npm install
npm run dev
```

## 🐳 Docker Setup (Recomendado)

### Prerrequisitos

- Docker Desktop instalado
- Docker Compose v2.0+

### Iniciar todo el proyecto

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Ejecutar migraciones y seeds

```bash
# Entrar al contenedor del backend
docker-compose exec backend sh

# Dentro del contenedor:
npx prisma migrate dev --name init
npm run seed
exit
```

### Verificar servicios

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:4000/api/v1/health
- **PostgreSQL:** localhost:5433 (puerto externo, 5432 dentro del contenedor)

### Comandos útiles

```bash
# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (CUIDADO: borra la BD)
docker-compose down -v

# Reconstruir imágenes
docker-compose build

# Reiniciar un servicio específico
docker-compose restart backend

# Ver estado de servicios
docker-compose ps

# Abrir shell en contenedor
docker-compose exec backend sh
docker-compose exec frontend sh

# Ver logs en tiempo real
docker-compose logs -f
```

### Troubleshooting

**Puerto ocupado:**

```bash
# Detener servicios locales que usen puertos 3000, 4000, 5432
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
lsof -ti:5432 | xargs kill -9
```

**Rebuild desde cero:**

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📚 Documentación

- [Arquitectura del Sistema](./docs/ARCHITECTURE.md)
- [Historias de Usuario](./docs/USER_STORIES.md)
- [Modelo de Datos](./docs/DATA_MODEL.md)
- [Documentación de API](./docs/API_DOCUMENTATION.md)
- [Guía de Deployment](./docs/DEPLOYMENT.md)
- [Prompts para Cursor](./docs/CURSOR_PROMPTS.md)

## 🌐 APIs de Datos Utilizadas

- World Health Organization (WHO) API
- World Bank Open Data
- UN Data API
- Data.gov
- PubMed API
- Otras fuentes oficiales gubernamentales

## 🔄 Flujo de Trabajo Git

1. Crear rama desde `develop`
2. Desarrollar feature
3. Crear Pull Request
4. Code Review
5. Merge a `develop`
6. Deploy a staging
7. Merge a `main` para producción

## 📝 Convenciones de Código

- **Commits:** Conventional Commits
- **Ramas:** `feature/nombre`, `fix/nombre`, `docs/nombre`
- **Código:** ESLint + Prettier
- **TypeScript:** Strict mode

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📦 Variables de Entorno

Crear archivos `.env` basados en `.env.example`:

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/provida_db
PORT=4000
NODE_ENV=development
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature
3. Commit de cambios
4. Push a la rama
5. Abrir Pull Request

## 📄 Licencia

MIT License

## 👥 Equipo

Desarrollado con 💙 para la defensa de la vida

## 📞 Contacto

Para preguntas o sugerencias, abrir un issue en GitHub.

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025