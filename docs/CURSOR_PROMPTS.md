# Prompts para Cursor AI

## 📋 Guía de Uso

Este documento contiene prompts optimizados para usar en Cursor AI durante el desarrollo del proyecto. Copia y pega estos prompts según la tarea que necesites realizar.

---

## 🎯 FASE 1: Setup Inicial del Proyecto

### Prompt 1.1: Crear estructura del Frontend

```
Necesito configurar un proyecto Next.js 14 completo para el frontend de mi aplicación.

UBICACIÓN: Crea todo dentro de la carpeta frontend/ en la raíz del proyecto.

TECNOLOGÍAS:
- Next.js 14 con App Router
- TypeScript en strict mode
- Tailwind CSS
- ESLint con reglas estrictas
- Prettier

ESTRUCTURA DE CARPETAS dentro de frontend/:
frontend/
├── app/
│   ├── layout.tsx (con metadata SEO)
│   └── page.tsx (dashboard principal vacío)
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── services/
│   └── api.ts (cliente Axios configurado)
├── hooks/
│   └── .gitkeep
├── types/
│   └── index.ts (tipos básicos)
├── utils/
│   └── .gitkeep
├── constants/
│   └── .gitkeep
├── public/
└── styles/

ARCHIVOS DE CONFIGURACIÓN:
- next.config.js (optimizado)
- tsconfig.json (strict mode)
- tailwind.config.js (con tema personalizado)
- .eslintrc.json (reglas estrictas)
- prettier.config.js
- .env.example
- package.json con scripts: dev, build, start, lint, type-check

REQUISITOS ESPECÍFICOS:
1. App Router (NO Pages Router)
2. TypeScript strict mode obligatorio
3. Componentes UI base funcionales y tipados
4. Servicio API apuntando a http://localhost:4000/api/v1
5. Metadata SEO en layout.tsx
6. README.md en frontend/ con instrucciones

IMPORTANTE:
- NO uses 'src/' folder, usa app/ directamente
- Usa convenciones modernas de Next.js 14
- Todos los componentes deben ser "use client" donde sea necesario
- Crea archivos .gitkeep para carpetas vacías

Crea toda esta estructura completa ahora.

---

### Prompt 1.2: Crear estructura del Backend

```
Crea una API REST profesional con Node.js, Express y TypeScript siguiendo arquitectura limpia y principios SOLID.

UBICACIÓN: Crea todo dentro de la carpeta backend/ en la raíz del proyecto.

STACK TECNOLÓGICO:
- Node.js 18+ con TypeScript en strict mode
- Express.js como framework web
- Prisma ORM para acceso a datos
- Zod para validación y type-safety de env vars
- ESLint + Prettier para calidad de código

ARQUITECTURA (Layered Architecture + Repository Pattern):
backend/
├── src/
│   ├── index.ts                    # Entry point - Express app setup
│   ├── server.ts                   # Server initialization
│   ├── app.ts                      # Express app configuration
│   ├── controllers/                # HTTP request handlers
│   │   ├── health.controller.ts
│   │   └── .gitkeep
│   ├── services/                   # Business logic layer
│   │   └── .gitkeep
│   ├── repositories/               # Data access layer (Prisma)
│   │   └── .gitkeep
│   ├── middlewares/                # Express middlewares
│   │   ├── errorHandler.ts        # Global error handling
│   │   ├── requestLogger.ts       # Request logging
│   │   ├── validateRequest.ts     # Zod validation middleware
│   │   └── notFound.ts            # 404 handler
│   ├── routes/                     # Route definitions
│   │   ├── index.ts               # Main router
│   │   └── health.routes.ts       # Health check routes
│   ├── validators/                 # Zod schemas
│   │   └── .gitkeep
│   ├── integrations/              # External API connectors
│   │   └── .gitkeep               # (WHO, World Bank - Issue #3)
│   ├── config/                     # Configuration
│   │   ├── env.ts                 # Environment validation (Zod)
│   │   ├── database.ts            # Prisma client singleton
│   │   └── cors.ts                # CORS configuration
│   ├── types/                      # TypeScript type definitions
│   │   ├── index.ts               # Common types
│   │   ├── express.d.ts           # Express type extensions
│   │   └── api.types.ts           # API response types
│   └── utils/                      # Utility functions
│       ├── logger.ts              # Winston logger setup
│       ├── asyncHandler.ts        # Async error wrapper
│       └── AppError.ts            # Custom error class
├── prisma/
│   └── schema.prisma              # Prisma schema (sin modelos aún)
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── prettier.config.js
├── nodemon.json
├── .env.example
├── .gitignore
└── README.md

CONFIGURACIÓN DE ARCHIVOS CLAVE:

1. package.json debe incluir scripts:
   - "dev": nodemon con ts-node
   - "build": compilación TypeScript
   - "start": ejecutar build
   - "lint": ESLint
   - "type-check": tsc --noEmit
   - "format": Prettier

2. tsconfig.json (strict mode):
   - strict: true
   - esModuleInterop: true
   - skipLibCheck: true
   - target: ES2022
   - module: commonjs
   - outDir: dist

3. Prisma schema básico:
   - datasource: postgresql
   - generator: prisma-client-js
   - SIN modelos todavía (Issue #4)

SERVIDOR EXPRESS:

1. Configuración:
   - Puerto: 4000
   - CORS habilitado para http://localhost:3000
   - JSON body parser
   - Helmet para seguridad
   - Morgan para logging HTTP

2. Middleware Stack (en orden):
   - CORS
   - Helmet
   - Body parser
   - Request logger
   - Routes
   - 404 handler
   - Error handler global

3. Endpoint Health Check (GET /health):
   Response format:
   {
     "success": true,
     "data": {
       "status": "ok",
       "timestamp": "ISO8601",
       "uptime": seconds,
       "environment": "development|production"
     }
   }

PATRONES Y PRINCIPIOS:

1. Dependency Injection:
   - Inyectar dependencias en constructores
   - Facilitar testing y mantenibilidad

2. Repository Pattern:
   - Abstraer acceso a datos
   - Repositorios usan Prisma Client

3. Service Layer Pattern:
   - Lógica de negocio en services
   - Controllers delgados (solo HTTP)

4. Error Handling:
   - Custom AppError class con statusCode
   - asyncHandler wrapper para async routes
   - errorHandler middleware catch-all

5. Response Format Consistency:
   Success: { success: true, data: {...} }
   Error: { success: false, error: { message, code, details? } }

VARIABLES DE ENTORNO (.env.example):

NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/provida_db
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug

VALIDACIÓN CON ZOD:
- Validar todas las env vars en config/env.ts
- Tipar process.env correctamente
- Fallar rápido si config es inválida

CALIDAD DE CÓDIGO:
- ESLint con reglas estrictas
- Prettier configurado
- TypeScript strict mode
- No any types
- Imports organizados

README.md debe incluir:
- Descripción del backend
- Requisitos previos
- Instalación
- Variables de entorno
- Scripts disponibles
- Estructura del proyecto
- Arquitectura
- Cómo correr localmente

IMPORTANTE:
- NO crear modelos en Prisma todavía (Issue #4)
- NO implementar lógica de negocio todavía
- SOLO estructura y configuración base
- Código production-ready desde el inicio
- Todos los archivos con comentarios JSDoc

Genera toda esta estructura completa ahora.
```

---

### Prompt 1.3: Configurar Docker Compose

```
Crea un archivo docker-compose.yml para desarrollo local con:

SERVICIOS:
1. frontend (Next.js)
   - Puerto 3000
   - Hot reload
   - Variables de entorno

2. backend (Node.js + Express)
   - Puerto 4000
   - Nodemon para hot reload
   - Variables de entorno

3. postgres
   - Puerto 5432
   - Volumen persistente
   - Usuario y contraseña configurables
   - Base de datos: provida_db

CARACTERÍSTICAS:
- Networks compartidas
- Health checks
- Restart policies
- Volumes para persistencia
- .dockerignore optimizado

También crea:
- Dockerfile para frontend
- Dockerfile para backend
- .env.example con todas las variables necesarias

Usa mejores prácticas de Docker y optimiza para desarrollo.
```

---

## 🗄️ FASE 2: Base de Datos

### Prompt 2.1: Crear Schema Prisma Completo

```
Crea el schema de Prisma (prisma/schema.prisma) basado en el siguiente modelo de datos:

TABLAS:
1. regions - Regiones geográficas jerárquicas
2. indicators - Indicadores a medir
3. data_points - Valores de indicadores por región/fecha
4. data_sources - Fuentes de datos externas
5. api_logs - Logs de llamadas a APIs

REQUISITOS:
- UUIDs como IDs
- Enums para RegionType y Category
- Relaciones correctas con onDelete cascade donde aplica
- Índices en campos frecuentemente consultados
- Timestamps (createdAt, updatedAt) en todas las tablas
- JSONB para metadata flexible
- Comentarios explicativos en cada modelo

ENUMS:
- RegionType: global, continent, country, state
- Category: abortion, euthanasia, gender_ideology, drugs, stem_cells, human_trafficking

Incluye configuración de datasource y generator.
Sigue el documento DATA_MODEL.md del proyecto.
```

---

### Prompt 2.2: Crear Migrations y Seeds

```
Crea las migraciones iniciales y seeds para la base de datos:

MIGRATION INICIAL:
- Ejecuta: npx prisma migrate dev --name init
- Genera todas las tablas del schema

SEEDS (prisma/seed.ts):
1. Regiones base:
   - Global
   - Continentes (África, América, Asia, Europa, Oceanía)
   - 50 países principales con códigos ISO

2. Data Sources:
   - WHO (World Health Organization)
   - World Bank
   - UN Data
   - PubMed
   - Data.gov

3. Indicadores por categoría:
   - Al menos 3 indicadores por cada categoría
   - Con descripciones y unidades apropiadas

4. Data points de ejemplo:
   - 100 registros de prueba distribuidos en diferentes regiones y fechas

SCRIPTS:
- Agregar script "seed" en package.json
- Función seed principal con manejo de errores
- Logging detallado del proceso

Usa TypeScript y Prisma Client. Datos realistas y consistentes.
```

---

## 🔌 FASE 3: Integración de APIs Externas

### Prompt 3.1: Crear Servicio para WHO API

```
Crea un servicio para integrar la API de WHO (World Health Organization):

ARCHIVO: src/integrations/who.service.ts

FUNCIONALIDADES:
1. fetchAbortionData(countryCode, year)
   - Obtiene estadísticas de aborto
   - Transforma datos al formato interno
   - Manejo de errores con reintentos

2. fetchHealthIndicators(countryCode, indicatorCode)
   - Obtiene indicadores de salud generales
   - Cache en base de datos

3. getAvailableCountries()
   - Lista países disponibles en WHO

CARACTERÍSTICAS:
- Cliente HTTP con Axios
- Rate limiting (max 10 requests/min)
- Retry logic con backoff exponencial
- Logging de todas las llamadas (api_logs table)
- Transformación de datos WHO → nuestro modelo
- TypeScript types para respuestas
- Error handling robusto
- Tests unitarios

CONFIGURACIÓN:
- WHO_API_BASE_URL en .env
- Timeout de 30 segundos
- Headers apropiados

Investiga la documentación real de WHO API y usa endpoints reales.
```

---

### Prompt 3.2: Crear Servicio para World Bank API

```
Crea un servicio para integrar World Bank Open Data API:

ARCHIVO: src/integrations/worldbank.service.ts

MÉTODOS:
1. fetchCountryData(countryCode, indicatorCode, startYear, endYear)
2. searchIndicators(keyword)
3. getCountryMetadata(countryCode)

FEATURES:
- Axios con interceptors
- Paginación automática
- Cache de 24 horas en BD
- Rate limiting
- Transformación de datos
- TypeScript types
- Error handling
- api_logs tracking

WORLD BANK INDICATORS RELEVANTES:
- SP.DYN.ABRT.ZS (Abortion rate)
- SH.HIV.INCD (HIV incidence)
- SH.DYN.AIDS (AIDS deaths)
- Y otros relacionados al proyecto

URL base: https://api.worldbank.org/v2/

Sigue documentación oficial de World Bank API.
```

---

## 🎨 FASE 4: Componentes del Frontend

### Prompt 4.1: Crear Dashboard Principal

```
Crea el dashboard principal del proyecto:

ARCHIVO: src/app/page.tsx

LAYOUT:
- Header con título y filtros globales
- Grid de 4 KPI cards en la parte superior
- Sección de gráficos principales (2x2)
- Footer con fuentes de datos

KPI CARDS:
1. Total de países con datos
2. Última actualización
3. Total de indicadores
4. Categorías disponibles

GRÁFICOS:
1. Línea de tiempo - Tendencia global
2. Barras - Top 10 países
3. Mapa mundial - Distribución geográfica
4. Dona - Distribución por categoría

COMPONENTES:
- <KPICard /> - Card con métrica
- <LineChart /> - Gráfico de líneas
- <BarChart /> - Gráfico de barras
- <WorldMap /> - Mapa interactivo
- <DonutChart /> - Gráfico circular
- <FilterPanel /> - Filtros de región y categoría
- <LoadingState /> - Skeleton mientras carga

FEATURES:
- Responsive (móvil, tablet, desktop)
- Loading states
- Error boundaries
- Datos en tiempo real desde API
- Filtros interactivos
- Tooltips informativos

STACK:
- Next.js 14 App Router
- Tailwind CSS
- Recharts para gráficos
- SWR para data fetching

Diseño moderno, limpio y profesional. Código TypeScript bien tipado.
```

---

### Prompt 4.2: Crear Componente de Gráfico de Líneas

```
Crea un componente reutilizable de gráfico de líneas:

ARCHIVO: src/components/charts/LineChart.tsx

PROPS:
- data: array de {date, value}
- title: string
- color: string (hex)
- unit: string
- loading: boolean
- onPointClick?: (point) => void

FEATURES:
- Responsive (ajusta al contenedor)
- Tooltips personalizados
- Zoom y pan
- Exportar a PNG
- Leyenda configurable
- Grid personalizable
- Animaciones suaves

INTERACTIVIDAD:
- Hover muestra valor exacto
- Click en punto emite evento
- Botón de reset zoom
- Botón de exportar imagen

ESTADOS:
- Loading skeleton
- Empty state (sin datos)
- Error state

STACK:
- Recharts
- Tailwind CSS
- TypeScript
- Lucide icons

Usa mejores prácticas de React, memoization y performance optimization.
```

---

### Prompt 4.3: Crear Servicio de API del Frontend

```
Crea el servicio para consumir el backend API:

ARCHIVO: src/services/api.ts

FUNCIONES:
1. getIndicators(category?)
2. getRegions(type?)
3. getDataPoints(indicatorId, regionId, startDate?, endDate?)
4. getComparison(indicatorId, regionIds, date)
5. getKPIs()
6. getLatestData(category?, region?)

CARACTERÍSTICAS:
- Cliente Axios configurado
- Base URL desde env
- Interceptors para:
  - Auth headers (futura fase)
  - Error handling global
  - Request/response logging
  - Loading states

TYPES:
- Interfaces TypeScript para todas las respuestas
- Types para request params
- Error types

ERROR HANDLING:
- Retry automático (3 intentos)
- Timeout de 10 segundos
- Mensajes de error amigables
- Logging en consola (solo dev)

CACHE:
- Integración con SWR
- TTL configurable
- Revalidación en focus

También crea: src/types/api.ts con todos los types necesarios.
```

---

## 🔐 FASE 5: Validación y Seguridad

### Prompt 5.1: Crear Validadores con Zod

```
Crea schemas de validación con Zod para el backend:

ARCHIVO: src/validators/index.ts

SCHEMAS:
1. indicatorSchema - Validar creación de indicador
2. dataPointSchema - Validar data point
3. regionSchema - Validar región
4. queryParamsSchema - Validar query parameters de API
5. dateRangeSchema - Validar rangos de fechas

CARACTERÍSTICAS:
- Validación estricta de tipos
- Mensajes de error en español
- Transformaciones (trim, lowercase donde aplique)
- Validaciones custom (ej: fecha no en futuro)
- Coercion de tipos donde sea seguro

MIDDLEWARE:
- validate(schema) middleware que:
  - Valida req.body, req.query o req.params
  - Retorna 400 con errores descriptivos
  - Transforma datos validados

EJEMPLO DE USO:
router.post('/indicators', validate(indicatorSchema), controller.create)

También crea: src/middlewares/validate.ts con el middleware.
```

---

### Prompt 5.2: Crear Middleware de Error Handling

```
Crea un sistema robusto de manejo de errores:

ARCHIVOS:
1. src/middlewares/errorHandler.ts
2. src/utils/AppError.ts
3. src/utils/asyncHandler.ts

AppError CLASS:
- Custom error class
- statusCode, message, isOperational
- Tipos: ValidationError, NotFoundError, DatabaseError, ExternalAPIError

errorHandler MIDDLEWARE:
- Captura todos los errores
- Diferencia errores operacionales vs programáticos
- Logging apropiado según ambiente
- Respuestas JSON consistentes
- Stack trace solo en desarrollo

asyncHandler UTILITY:
- Wrapper para async route handlers
- Catch automático y pass a next()

RESPONSE FORMAT:
{
  success: false,
  error: {
    message: string,
    code: string,
    details?: any
  }
}

También integra con logger (Winston) para producción.
```

---

## 📊 FASE 6: Endpoints de la API

### Prompt 6.1: Crear Endpoints de Indicators

```
Crea los endpoints REST para indicadores:

ARCHIVO: src/routes/indicators.routes.ts

ENDPOINTS:
GET    /api/v1/indicators
GET    /api/v1/indicators/:id
GET    /api/v1/indicators/category/:category
POST   /api/v1/indicators (admin - fase 2)
PUT    /api/v1/indicators/:id (admin - fase 2)
DELETE /api/v1/indicators/:id (admin - fase 2)

CONTROLLER: src/controllers/indicators.controller.ts
SERVICE: src/services/indicators.service.ts
REPOSITORY: src/repositories/indicators.repository.ts

FEATURES:
- Validación con Zod
- Paginación (limit, offset)
- Filtros (category, search)
- Sort (name, createdAt)
- Include data points count
- Error handling
- OpenAPI documentation comments

RESPONSE FORMAT:
{
  success: true,
  data: [...],
  pagination: {
    total, page, limit, pages
  }
}

Usa architecture: Route → Controller → Service → Repository → Prisma
```

---

### Prompt 6.2: Crear Endpoints de Data Points

```
Crea los endpoints para data points:

ARCHIVO: src/routes/data.routes.ts

ENDPOINTS:
GET /api/v1/data/points
  Query params:
  - indicatorId (required)
  - regionId (optional)
  - startDate, endDate (optional)
  - limit, offset (pagination)

GET /api/v1/data/latest
  Query params:
  - category (optional)
  - regionId (optional)

GET /api/v1/data/compare
  Query params:
  - indicatorId (required)
  - regionIds (array, required)
  - date (optional, default latest)

GET /api/v1/data/trends/:indicatorId/:regionId
  - Returns time series data

POST /api/v1/data/points (admin - fase 2)

FEATURES:
- Validación robusta
- Queries optimizados
- Cache headers (Cache-Control)
- Rate limiting
- CSV export option (?format=csv)
- Aggregations (sum, avg, min, max)

Implementa controller, service y repository.
```

---

## 🧪 FASE 7: Testing

### Prompt 7.1: Crear Tests Unitarios para Services

```
Crea tests unitarios para los services del backend:

ARCHIVO: src/services/__tests__/indicators.service.test.ts

FRAMEWORK: Jest + ts-jest

TESTS:
describe('IndicatorsService', () => {
  - getAll() debe retornar todos los indicadores
  - getAll() con category debe filtrar correctamente
  - getById() debe retornar indicador específico
  - getById() con ID inválido debe lanzar NotFoundError
  - create() debe crear indicador válido
  - create() con datos inválidos debe lanzar ValidationError
  - update() debe actualizar correctamente
  - delete() debe eliminar y retornar success
})

MOCKS:
- Mock de Prisma Client
- Mock de repositories
- Datos de prueba realistas

SETUP:
- beforeEach para resetear mocks
- afterAll para cleanup

COVERAGE:
- Apuntar a >80% coverage
- Test casos edge y errores

También crea jest.config.js y setup files necesarios.
```

---

### Prompt 7.2: Crear Tests E2E con Playwright

```
Crea tests End-to-End para el dashboard:

ARCHIVO: tests/e2e/dashboard.spec.ts

FRAMEWORK: Playwright

TESTS:
1. "Debe cargar el dashboard correctamente"
   - Verifica que se muestran los KPIs
   - Verifica que se cargan los gráficos
   - Verifica que no hay errores

2. "Debe filtrar por región"
   - Selecciona región en dropdown
   - Verifica que datos se actualizan
   - Verifica que URL cambia

3. "Debe filtrar por categoría"
   - Selecciona categoría
   - Verifica gráficos filtrados

4. "Debe exportar datos a CSV"
   - Click en botón exportar
   - Verifica descarga de archivo

5. "Debe ser responsive"
   - Test en móvil, tablet, desktop

CONFIGURACIÓN:
- playwright.config.ts
- Base URL configurable
- Screenshots en fallos
- Video de pruebas
- Parallel execution

Usa mejores prácticas de Playwright y Page Object Model.
```

---

## 🚀 FASE 8: Deployment

### Prompt 8.1: Configurar GitHub Actions CI/CD

```
Crea workflow de GitHub Actions para CI/CD:

ARCHIVO: .github/workflows/ci-cd.yml

JOBS:
1. test-frontend
   - Checkout code
   - Setup Node.js
   - Install dependencies
   - Run linter
   - Run type check
   - Run tests
   - Build

2. test-backend
   - Checkout code
   - Setup Node.js
   - Setup PostgreSQL service
   - Install dependencies
   - Run migrations
   - Run linter
   - Run type check
   - Run tests

3. deploy-frontend (only on main branch)
   - Deploy to Vercel
   - Comment PR with preview URL

4. deploy-backend (only on main branch)
   - Deploy to Railway/Render
   - Run migrations
   - Health check

TRIGGERS:
- Push to main/develop
- Pull requests
- Manual workflow dispatch

SECRETS:
- VERCEL_TOKEN
- RAILWAY_TOKEN (o RENDER_TOKEN)
- DATABASE_URL

CACHE:
- Node modules
- Next.js build
- Playwright browsers

También crea: .github/pull_request_template.md
```

---

### Prompt 8.2: Configurar Vercel para Frontend

```
Crea la configuración para deploy en Vercel:

ARCHIVO: vercel.json

CONFIGURACIÓN:
- Build command optimizado
- Output directory
- Environment variables
- Redirects y rewrites
- Headers de seguridad:
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Content-Security-Policy
- Cache headers para assets
- Custom 404 page

ENVIRONMENT VARIABLES:
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_ENVIRONMENT

DOMAINS:
- Production domain
- Preview deployments

También crea:
- .vercelignore
- Documentación en DEPLOYMENT.md sobre proceso
```

---

### Prompt 8.3: Configurar Railway para Backend

```
Crea la configuración para deploy del backend en Railway:

ARCHIVO: railway.json (o railway.toml)

SERVICIOS:
1. Backend API
   - Build command
   - Start command
   - Health check endpoint
   - Auto-scaling rules

2. PostgreSQL
   - Versión 15
   - Storage persistente
   - Backups automáticos

ENVIRONMENT VARIABLES:
- NODE_ENV=production
- DATABASE_URL (auto-provisioned)
- PORT
- API keys de servicios externos

CONFIGURACIÓN:
- Region (us-west o más cercano)
- Resources (CPU, RAM)
- Networking (internal/external)

SCRIPTS:
- npm run railway:deploy
- npm run railway:migrate

También documenta en DEPLOYMENT.md:
- Pasos de deploy manual
- Rollback procedures
- Monitoring y logs
```

---

## 📚 FASE 9: Documentación

### Prompt 9.1: Crear README Completo

```
Actualiza el README.md principal con documentación completa:

SECCIONES:
1. Banner/Logo del proyecto
2. Badges (build status, coverage, license)
3. Descripción breve y objetivo
4. Screenshots del dashboard
5. Demo en vivo (link)
6. Features principales (lista con ✅)
7. Stack tecnológico detallado
8. Requisitos previos
9. Instalación paso a paso
10. Uso y ejemplos
11. Variables de entorno
12. Scripts disponibles
13. Estructura del proyecto
14. API Documentation (link a Swagger)
15. Testing
16. Deployment
17. Contributing guidelines
18. Roadmap
19. Licencia
20. Autores y agradecimientos
21. FAQ

ESTILO:
- Markdown bien formateado
- Emojis para claridad
- Code blocks con syntax highlighting
- Tablas donde sea apropiado
- Links a documentación adicional

Hazlo profesional, claro y completo. Inspirado en proyectos open source populares.
```

---

### Prompt 9.2: Generar Documentación de API con Swagger

```
Configura Swagger/OpenAPI para documentar la API:

INSTALACIÓN:
- swagger-ui-express
- swagger-jsdoc

ARCHIVO: src/config/swagger.ts

CONFIGURACIÓN:
- API Info (título, descripción, versión)
- Servers (dev, staging, production)
- Security schemes (futura auth)
- Tags por recurso

DOCUMENTACIÓN:
Agregar JSDoc comments en cada endpoint con:
- @swagger
- description
- tags
- parameters
- requestBody
- responses (200, 400, 404, 500)
- examples

ENDPOINT:
GET /api/v1/docs - Swagger UI
GET /api/v1/docs.json - OpenAPI spec

EJEMPLO:
/**
 * @swagger
 * /api/v1/indicators:
 *   get:
 *     summary: Obtener todos los indicadores
 *     tags: [Indicators]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de indicadores
 */

Documenta TODOS los endpoints del API.
```

---

## 🎨 FASE 10: UI/UX Avanzado

### Prompt 10.1: Crear Componente de Mapa Mundial Interactivo

```
Crea un componente de mapa mundial interactivo:

ARCHIVO: src/components/charts/WorldMap.tsx

LIBRERÍA: react-simple-maps + topojson

FEATURES:
- Mapa mundial con todos los países
- Colores según valores del indicador
- Escala de colores configurable
- Tooltip al hover mostrando:
  - Nombre del país
  - Valor del indicador
  - Fecha del dato
  - Fuente
- Click en país para ver detalles
- Zoom y pan
- Leyenda de colores
- Loading skeleton

PROPS:
- data: array de {countryCode, value}
- indicator: string
- colorScale: 'sequential' | 'diverging' | 'categorical'
- onCountryClick: (country) => void

RESPONSIVE:
- Ajusta tamaño al contenedor
- Funciona en móvil (touch)

ESTADOS:
- Loading
- Empty (sin datos)
- Error

PERFORMANCE:
- Memoización de cálculos
- Virtualización si es necesario

Usa TypeScript, optimiza para performance.
```

---

### Prompt 10.2: Crear Sistema de Tema Claro/Oscuro

```
Implementa tema claro/oscuro en toda la aplicación:

ARCHIVOS:
- src/contexts/ThemeContext.tsx
- src/hooks/useTheme.ts
- tailwind.config.js (actualizar)

FEATURES:
- Toggle entre claro/oscuro
- Persistencia en localStorage
- Detectar preferencia del sistema
- Transiciones suaves
- Actualizar todos los componentes

TAILWIND:
- Configurar clase 'dark'
- Variables CSS para colores
- dark: variants en componentes

COMPONENTES A ACTUALIZAR:
- Layout principal
- Cards
- Charts (colores adaptativos)
- Buttons
- Inputs
- Modals

THEME CONTEXT:
- theme: 'light' | 'dark' | 'system'
- toggleTheme()
- setTheme()

ICON:
- Sun icon para modo claro
- Moon icon para modo oscuro

Asegura que TODO se vea bien en ambos temas.
```

---

### Prompt 10.3: Crear Sistema de Notificaciones Toast

```
Implementa un sistema de notificaciones toast:

ARCHIVO: src/components/ui/Toast.tsx

LIBRERÍA: sonner (recomendado) o custom

TIPOS:
- Success ✅
- Error ❌
- Warning ⚠️
- Info ℹ️
- Loading ⏳

FEATURES:
- Auto-dismiss configurable
- Posición configurable (top-right, bottom-center, etc)
- Stack de múltiples toasts
- Animaciones suaves
- Close button
- Progress bar
- Icons según tipo
- Dark mode compatible

USO:
```typescript
import { toast } from './Toast'

toast.success('Datos cargados correctamente')
toast.error('Error al cargar datos')
toast.loading('Cargando...')
```

CONFIGURACIÓN GLOBAL:
- Duración default: 4000ms
- Max toasts visibles: 3
- Position: 'top-right'

Integra en toda la app para feedback de acciones.
```

---

## 🔍 FASE 11: Optimización

### Prompt 11.1: Optimizar Performance del Frontend

```
Optimiza el performance de la aplicación Next.js:

TAREAS:
1. Image Optimization
   - Usa next/image en todas las imágenes
   - Lazy loading
   - Placeholder blur

2. Code Splitting
   - Dynamic imports para componentes pesados
   - Lazy load de charts
   - Route-based splitting

3. Memoization
   - React.memo en componentes puros
   - useMemo para cálculos costosos
   - useCallback para funciones

4. Bundle Analysis
   - Instala @next/bundle-analyzer
   - Identifica paquetes pesados
   - Reemplaza librerías grandes

5. Fonts Optimization
   - next/font para cargar fonts
   - Subset de caracteres
   - Preload de fonts críticos

6. Lighthouse Audit
   - Alcanzar score >90 en todas las métricas
   - Fix accessibility issues
   - Optimize LCP, FID, CLS

ARCHIVOS A MODIFICAR:
- next.config.js (experimental features)
- Componentes con memoization
- Dynamic imports

Mide antes y después con Lighthouse.
```

---

### Prompt 11.2: Implementar Caché en Backend

```
Implementa estrategia de caché en el backend:

NIVELES DE CACHÉ:
1. In-Memory Cache (node-cache)
   - TTL: 5 minutos
   - Para queries frecuentes

2. Database Cache (tabla en Postgres)
   - TTL: 24 horas
   - Para datos de APIs externas

3. HTTP Cache Headers
   - Cache-Control
   - ETag

ARCHIVO: src/services/cache.service.ts

MÉTODOS:
- get(key)
- set(key, value, ttl)
- delete(key)
- clear()
- has(key)

ESTRATEGIAS:
- Cache-Aside pattern
- Write-Through para writes
- Invalidación inteligente

IMPLEMENTAR EN:
- Indicators list (cache 10 min)
- Data points (cache 5 min)
- Latest data (cache 1 min)
- External API responses (cache 24h)

MÉTRICAS:
- Hit rate
- Miss rate
- Cache size

Logging de cache hits/misses en desarrollo.
```

---

## 📊 FASE 12: Analytics y Monitoreo

### Prompt 12.1: Integrar Google Analytics

```
Integra Google Analytics 4 en el frontend:

INSTALACIÓN:
- next-google-analytics o gtag.js

ARCHIVO: src/lib/analytics.ts

EVENTS A TRACKEAR:
1. Page views
2. Filter usage (region, category)
3. Chart interactions
4. Export actions (CSV, PDF)
5. Share actions
6. Errors del usuario
7. Time on page
8. Bounce rate

CONFIGURACIÓN:
- GA4 Measurement ID en .env
- GDPR compliant (cookie consent)
- Opt-out mechanism

CUSTOM EVENTS:
```typescript
trackEvent({
  action: 'filter_change',
  category: 'Dashboard',
  label: 'Region',
  value: 'Colombia'
})
```

DASHBOARD:
- Setup de conversions
- Custom reports

También integra en desarrollo modo debug.
```

---

### Prompt 12.2: Configurar Logging con Winston

```
Implementa logging profesional en backend:

ARCHIVO: src/config/logger.ts

LIBRERÍA: Winston

NIVELES:
- error (errores críticos)
- warn (advertencias)
- info (información general)
- http (requests HTTP)
- debug (debugging)

TRANSPORTS:
1. Console (desarrollo)
   - Formato colorizado
   - Pretty print

2. File (producción)
   - error.log (solo errores)
   - combined.log (todo)
   - Rotación diaria

3. Cloud (opcional - fase 2)
   - Datadog / Loggly / CloudWatch

FORMATO:
- Timestamp
- Level
- Message
- Metadata (userId, requestId, etc)
- Stack trace para errores

INTEGRACIÓN:
- Middleware de logging requests
- Error handler con logger
- Service layer logging

EJEMPLO:
```typescript
logger.info('Data fetched', { 
  indicatorId, 
  regionId, 
  count: data.length 
})
```
```

---

## 🔐 FASE 13: Seguridad (Fase 2)

### Prompt 13.1: Implementar Autenticación JWT

```
Implementa autenticación con JWT para admin:

ARCHIVOS:
- src/middlewares/auth.middleware.ts
- src/services/auth.service.ts
- src/routes/auth.routes.ts

ENDPOINTS:
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout

FEATURES:
- JWT access tokens (15 min expiry)
- Refresh tokens (7 days expiry)
- Password hashing con bcrypt
- Rate limiting en login
- Account lockout después de 5 intentos fallidos

MODELO:
- users table con Prisma
- roles: admin, viewer

MIDDLEWARE:
```typescript
router.post(
  '/indicators',
  authenticate,
  authorize(['admin']),
  controller.create
)
```

SECURITY:
- Secrets en variables de entorno
- httpOnly cookies para tokens
- CSRF protection

Frontend: Login form y manejo de tokens.
```

---

### Prompt 13.2: Implementar Rate Limiting

```
Implementa rate limiting en la API:

LIBRERÍA: express-rate-limit

CONFIGURACIÓN:
1. General API
   - 100 requests por 15 minutos por IP

2. External API endpoints
   - 20 requests por minuto

3. Auth endpoints
   - 5 requests por 15 minutos

4. Export endpoints
   - 10 requests por hora

ARCHIVO: src/middlewares/rateLimiter.ts

STORES:
- Memory (desarrollo)
- Redis (producción - fase 2)

RESPONSES:
- 429 Too Many Requests
- Headers: X-RateLimit-*
- Retry-After header

CUSTOM LIMITS:
```typescript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos de login'
})
```

WHITELIST:
- IPs internas
- Health check endpoints

Logging de rate limit hits.
```

---

## 📱 FASE 14: Features Adicionales

### Prompt 14.1: Implementar Exportación a PDF

```
Crea funcionalidad para exportar reportes a PDF:

LIBRERÍA: jsPDF + html2canvas

ARCHIVO: src/utils/pdfExport.ts

FEATURES:
- Capturar dashboard completo
- O componentes individuales
- Incluir gráficos
- Header con logo y título
- Footer con fecha y fuente
- Metadata del documento
- Tamaño A4

FUNCIÓN:
```typescript
exportToPDF({
  filename: string,
  title: string,
  elements: HTMLElement[],
  includeCharts: boolean,
  orientation: 'portrait' | 'landscape'
})
```

UI:
- Botón "Exportar PDF" en dashboard
- Modal de opciones antes de exportar
- Loading state durante generación
- Toast de success/error

OPTIMIZACIONES:
- Resolver promesas de charts
- Alta calidad de imágenes
- Compresión de PDF

Test con diferentes tamaños de dashboard.
```

---

### Prompt 14.2: Crear Página de Comparación Avanzada

```
Crea una página dedicada para comparar múltiples regiones:

ARCHIVO: src/app/compare/page.tsx

FEATURES:
1. Selector de hasta 5 regiones
2. Selector de indicador
3. Selector de rango de fechas
4. Visualizaciones:
   - Gráfico de líneas superpuestas
   - Tabla comparativa
   - Gráfico de barras side-by-side
   - Heatmap de correlación

INTERACTIVIDAD:
- Agregar/quitar regiones dinámicamente
- Filtros de fecha
- Highlight de región al hover
- Toggle visibility de regiones

INSIGHTS:
- Región con mayor/menor valor
- Tendencias (creciente/decreciente)
- % de cambio año a año
- Estadísticas descriptivas

EXPORTACIÓN:
- CSV con datos completos
- PDF con gráficos
- Compartir URL con filtros

RESPONSIVE:
- Grid adaptativo
- Collapsar tabla en móvil

Diseño limpio enfocado en claridad de comparación.
```

---

### Prompt 14.3: Crear Sistema de Búsqueda Global

```
Implementa búsqueda global en el dashboard:

COMPONENTE: src/components/GlobalSearch.tsx

FEATURES:
- Input con keyboard shortcut (Cmd+K / Ctrl+K)
- Búsqueda en:
  - Indicadores
  - Regiones
  - Categorías
  - Data points

RESULTADOS:
- Categorizado por tipo
- Highlight de términos coincidentes
- Shortcuts de teclado para navegar
- Preview de datos

UI:
- Modal flotante
- Fuzzy search (fuse.js)
- Autocomplete
- Recent searches
- Popular searches

PERFORMANCE:
- Debounce de 300ms
- Max 20 resultados
- Lazy loading de más resultados

NAVEGACIÓN:
- Enter para ir al resultado
- Escape para cerrar
- Arrows para navegar

Inspirado en: Algolia, Spotlight, Command Palette.
```

---

## 🎯 PROMPTS RÁPIDOS (Copy-Paste)

### Fix Bugs

```
Analiza este error y proporciona una solución:

ERROR:
[pegar error aquí]

CONTEXTO:
- Archivo donde ocurre
- Qué estabas intentando hacer
- Código relevante

Dame:
1. Causa raíz del problema
2. Solución paso a paso
3. Código corregido
4. Cómo prevenir en el futuro
```

---

### Code Review

```
Revisa este código y sugiere mejoras:

```typescript
[pegar código aquí]
```

CRITERIOS:
- Best practices
- Performance
- Seguridad
- Legibilidad
- Type safety
- Error handling

Dame sugerencias específicas con código mejorado.
```

---

### Refactoring

```
Refactoriza este código para que sea más:
- Mantenible
- Escalable
- Testeable
- Performante

CÓDIGO ACTUAL:
```typescript
[pegar código aquí]
```

Explica cada cambio y por qué es mejor.
```

---

### Generar Tests

```
Genera tests completos para este código:

```typescript
[pegar código aquí]
```

FRAMEWORK: Jest

INCLUYE:
- Tests de casos felices
- Tests de edge cases
- Tests de errores
- Mocks necesarios
- Setup y teardown

Coverage objetivo: >80%
```

---

### Documentar Función

```
Documenta esta función con JSDoc completo:

```typescript
[pegar función aquí]
```

INCLUYE:
- Descripción clara
- @param con types y descripción
- @returns con type y descripción
- @throws si aplica
- @example con uso real
```

---

### Optimizar Query

```
Optimiza esta query de Prisma/SQL:

```typescript
[pegar query aquí]
```

CONTEXTO:
- Tamaño de tabla
- Índices existentes
- Performance actual

Dame:
1. Query optimizada
2. Índices recomendados
3. Explain plan si es SQL
4. Mejora estimada
```

---

## 📋 Checklist de Desarrollo

```
Usa este checklist antes de cada Pull Request:

CÓDIGO:
[ ] Linter pasa sin errores
[ ] Type check pasa
[ ] Todos los tests pasan
[ ] Coverage >70%
[ ] No hay console.logs
[ ] No hay TODOs sin issue

FUNCIONALIDAD:
[ ] Feature funciona en dev
[ ] Feature funciona en diferentes navegadores
[ ] Feature es responsive
[ ] Manejo de errores implementado
[ ] Loading states implementados

DOCUMENTACIÓN:
[ ] README actualizado si es necesario
[ ] Comentarios en código complejo
[ ] CHANGELOG actualizado
[ ] API docs actualizados

SEGURIDAD:
[ ] Validación de inputs
[ ] No hay secrets en código
[ ] Rate limiting si aplica
[ ] SQL injection prevention

GIT:
[ ] Commit messages descriptivos
[ ] Branch actualizada con develop
[ ] Sin conflictos
[ ] PR description completa
```

---

**Fin de CURSOR_PROMPTS.md**

¡Estos prompts están listos para copiar y pegar en Cursor! 🚀

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025