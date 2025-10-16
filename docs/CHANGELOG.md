# Changelog

Todos los cambios notables del proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planeado
- Sistema de autenticación para administradores
- Panel de administración
- Actualización automática de datos con cron jobs
- Integración con más fuentes de datos
- Modo offline
- Notificaciones push
- Sistema de favoritos
- Compartir gráficos en redes sociales
- Exportación avanzada (Excel, JSON)
- API GraphQL
- Tema personalizable
- Multi-idioma (i18n)

---

## [1.0.0] - 2025-11-30

### 🎉 Primera Versión Estable

Lanzamiento oficial del Dashboard de Datos Pro-Vida con funcionalidad completa.

### Agregado

#### Frontend
- Dashboard principal con KPIs
- Gráficos interactivos (líneas, barras, mapa mundial, dona)
- Filtros por región y categoría
- Búsqueda global de indicadores
- Página de comparación entre regiones
- Exportación de datos a CSV
- Sistema de tema claro/oscuro
- Notificaciones toast
- Loading states y error boundaries
- Diseño responsive (móvil, tablet, desktop)

#### Backend
- API REST completa con 30+ endpoints
- Integración con WHO API
- Integración con World Bank API
- Integración con UN Data API
- Sistema de caché multinivel
- Rate limiting
- Validación con Zod
- Error handling robusto
- Logging con Winston
- Health check endpoint
- Swagger/OpenAPI documentation

#### Base de Datos
- Schema completo con Prisma
- 5 tablas principales
- Índices optimizados
- Migraciones iniciales
- Seeds con datos de prueba

#### DevOps
- Docker Compose para desarrollo
- CI/CD con GitHub Actions
- Deploy automatizado a Vercel (frontend)
- Deploy automatizado a Railway (backend)
- Monitoreo con Sentry
- Uptime monitoring

#### Documentación
- README completo
- Guía de arquitectura
- 14 historias de usuario
- Modelo de datos detallado
- Queries SQL optimizadas
- 50+ prompts para Cursor
- Guía de deployment
- API documentation
- Guía de contribución
- Changelog

### Categorías Implementadas
- ✅ Aborto
- ✅ Eutanasia
- ✅ Ideología de género
- ✅ Drogadicción
- ✅ Células madre
- ✅ Trata de personas

---

## [0.3.0] - 2025-10-30 (Beta)

### Agregado
- Sistema de exportación a PDF
- Gráfico de mapa mundial interactivo
- Comparación avanzada de múltiples regiones
- Sistema de búsqueda global
- Tooltips informativos en todos los gráficos

### Cambiado
- Mejorada performance de carga de gráficos
- Optimizado bundle size del frontend (-30%)
- Refactorizada arquitectura de servicios del backend

### Arreglado
- Error al filtrar por múltiples categorías
- Bug en exportación CSV con datos especiales
- Problema de responsividad en tablets
- Memory leak en gráficos de líneas

### Seguridad
- Implementado helmet.js para headers de seguridad
- Agregado rate limiting más estricto
- Actualizado validación de inputs

---

## [0.2.0] - 2025-09-30 (Alpha)

### Agregado
- Integración con World Bank API
- Integración con UN Data API
- Sistema de caché en base de datos
- Gráficos de tendencias temporales
- Filtros avanzados de fecha
- Página de detalles de indicador

### Cambiado
- Migrado de JavaScript a TypeScript (100%)
- Actualizado Next.js a versión 14
- Mejorada estructura de carpetas del backend

### Arreglado
- Timeout en queries lentas
- Error 500 en endpoint de comparación
- Problemas de CORS en producción

---

## [0.1.0] - 2025-08-30 (Preview)

### Agregado
- Setup inicial del proyecto
- Estructura básica frontend con Next.js
- Estructura básica backend con Express
- Base de datos PostgreSQL con Prisma
- Docker Compose para desarrollo
- Integración básica con WHO API
- Dashboard MVP con 4 gráficos
- Primeros 10 indicadores
- CRUD básico de data points
- Documentación inicial

### Infraestructura
- Configuración de ESLint y Prettier
- Setup de Jest para testing
- GitHub Actions básico
- Deploy manual a Vercel y Railway

---

## Tipos de Cambios

- `Agregado` para funcionalidades nuevas
- `Cambiado` para cambios en funcionalidad existente
- `Deprecated` para funcionalidades que se eliminarán pronto
- `Eliminado` para funcionalidades eliminadas
- `Arreglado` para corrección de bugs
- `Seguridad` en caso de vulnerabilidades

---

## Versionado

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Cambios incompatibles en la API
- **MINOR** (0.X.0): Nueva funcionalidad compatible hacia atrás
- **PATCH** (0.0.X): Correcciones de bugs compatibles

---

## Links

- [Unreleased]: Cambios en `develop` branch
- [1.0.0]: https://github.com/usuario/datos-provida-dashboard/releases/tag/v1.0.0
- [0.3.0]: https://github.com/usuario/datos-provida-dashboard/releases/tag/v0.3.0
- [0.2.0]: https://github.com/usuario/datos-provida-dashboard/releases/tag/v0.2.0
- [0.1.0]: https://github.com/usuario/datos-provida-dashboard/releases/tag/v0.1.0

---

**Nota**: Las fechas son tentativas y pueden cambiar según el progreso del desarrollo.