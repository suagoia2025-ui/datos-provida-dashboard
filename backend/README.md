# Backend API

API REST profesional para el Dashboard de Datos Pro-Vida, construido con Node.js, Express y TypeScript siguiendo arquitectura limpia y principios SOLID.

## 📋 Requisitos Previos

- Node.js 18+ instalado
- PostgreSQL 15+ (o usar Docker)
- npm o yarn

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus valores
```

3. Configurar Prisma:
```bash
npx prisma generate
# Cuando tengas modelos: npx prisma migrate dev
```

4. Iniciar en desarrollo:
```bash
npm run dev
```

## 📜 Scripts Disponibles

- `npm run dev` - Inicia servidor en modo desarrollo con hot reload
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Inicia servidor en producción (después de build)
- `npm run lint` - Ejecuta ESLint para revisar código
- `npm run type-check` - Verifica tipos sin compilar
- `npm run format` - Formatea código con Prettier

## 🔧 Variables de Entorno

Copia `.env.example` a `.env` y configura:

- `NODE_ENV` - Entorno (development/production/test)
- `PORT` - Puerto del servidor (default: 4000)
- `DATABASE_URL` - URL de conexión a PostgreSQL
- `CORS_ORIGIN` - Origen permitido para CORS (default: http://localhost:3000)
- `LOG_LEVEL` - Nivel de logging (error/warn/info/http/debug)

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # Server initialization
│   ├── app.ts                # Express app configuration
│   ├── controllers/          # HTTP request handlers
│   ├── services/             # Business logic layer
│   ├── repositories/         # Data access layer (Prisma)
│   ├── middlewares/          # Express middlewares
│   ├── routes/               # Route definitions
│   ├── validators/           # Zod validation schemas
│   ├── integrations/         # External API connectors
│   ├── config/               # Configuration files
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── prisma/
│   └── schema.prisma         # Prisma schema
└── dist/                     # Compiled JavaScript (generated)
```

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas (Layered Architecture) con el patrón Repository:

- **Routes**: Define los endpoints HTTP
- **Controllers**: Maneja las peticiones HTTP (delgados)
- **Services**: Contiene la lógica de negocio
- **Repositories**: Abstrae el acceso a datos usando Prisma
- **Middlewares**: Manejo de errores, validación, logging

### Principios Aplicados

- **SOLID**: Separación de responsabilidades
- **Dependency Injection**: Facilita testing y mantenibilidad
- **Error Handling**: Manejo centralizado de errores con AppError
- **Type Safety**: TypeScript strict mode, validación con Zod

## 🌐 Endpoints

### Health Check
- `GET /api/v1/health` - Estado del servidor

## 🔒 Seguridad

- Helmet para headers de seguridad
- CORS configurado
- Validación de inputs con Zod
- Manejo robusto de errores

## 📝 Convenciones

- TypeScript strict mode
- ESLint con reglas estrictas
- Prettier para formateo
- Conventional Commits
- JSDoc en funciones públicas

## 🧪 Testing

(Próximamente: Jest + Supertest)

## 📚 Documentación

- Ver `docs/API_DOCUMENTATION.md` para documentación completa de la API
- Ver `docs/ARCHITECTURE.md` para detalles de arquitectura

---

**Versión:** 0.1.0