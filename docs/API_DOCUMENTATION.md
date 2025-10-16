# Documentación de la API

## 📋 Información General

**Base URL:** `https://api.datosprovidadashboard.com/api/v1`  
**Versión:** 1.0.0  
**Formato:** JSON  
**Autenticación:** No requerida (endpoints públicos) / JWT Bearer Token (endpoints admin)

---

## 🔗 Endpoints Disponibles

### Tabla de Contenidos

1. [Health Check](#health-check)
2. [Indicators](#indicators)
3. [Regions](#regions)
4. [Data Points](#data-points)
5. [Data Sources](#data-sources)
6. [Statistics](#statistics)
7. [Export](#export)

---

## 🏥 Health Check

### GET /health

Verifica el estado del servicio y la conexión a la base de datos.

**Response 200 OK:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-16T10:00:00.000Z",
  "database": "connected",
  "version": "1.0.0"
}
```

**Response 503 Service Unavailable:**
```json
{
  "status": "error",
  "timestamp": "2025-10-16T10:00:00.000Z",
  "database": "disconnected",
  "error": "Connection timeout"
}
```

---

## 📊 Indicators

### GET /indicators

Obtiene la lista de todos los indicadores disponibles.

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| category | string | No | Filtrar por categoría | `abortion` |
| search | string | No | Buscar en nombre/descripción | `tasa` |
| page | number | No | Número de página (default: 1) | `2` |
| limit | number | No | Resultados por página (default: 20, max: 100) | `50` |
| sort | string | No | Campo de ordenamiento | `name`, `-createdAt` |

**Request:**
```bash
GET /api/v1/indicators?category=abortion&limit=10
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-123",
      "category": "abortion",
      "name": "Tasa de aborto por 1000 mujeres",
      "description": "Número de abortos por cada 1000 mujeres en edad reproductiva (15-49 años)",
      "unit": "ratio",
      "dataPointsCount": 1250,
      "latestDate": "2023-12-31",
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-10-01T15:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

### GET /indicators/:id

Obtiene un indicador específico por ID.

**Path Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| id | UUID | Sí | ID del indicador |

**Request:**
```bash
GET /api/v1/indicators/uuid-123
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-123",
    "category": "abortion",
    "name": "Tasa de aborto por 1000 mujeres",
    "description": "Número de abortos por cada 1000 mujeres en edad reproductiva (15-49 años)",
    "unit": "ratio",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-10-01T15:30:00.000Z",
    "stats": {
      "totalDataPoints": 1250,
      "regionsWithData": 85,
      "earliestDate": "2000-01-01",
      "latestDate": "2023-12-31"
    }
  }
}
```

**Response 404 Not Found:**
```json
{
  "success": false,
  "error": {
    "message": "Indicador no encontrado",
    "code": "INDICATOR_NOT_FOUND"
  }
}
```

---

### GET /indicators/category/:category

Obtiene todos los indicadores de una categoría específica.

**Path Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| category | string | Sí | Categoría del indicador |

**Categorías válidas:**
- `abortion`
- `euthanasia`
- `gender_ideology`
- `drugs`
- `stem_cells`
- `human_trafficking`

**Request:**
```bash
GET /api/v1/indicators/category/abortion
```

**Response:** Similar a GET /indicators

---

## 🌍 Regions

### GET /regions

Obtiene la lista de regiones geográficas.

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
|-----------|------|-----------|-------------|---------|
| type | string | No | Tipo de región | `country`, `continent` |
| parentId | UUID | No | ID de región padre | `uuid-456` |
| search | string | No | Buscar por nombre o código | `Colombia` |

**Request:**
```bash
GET /api/v1/regions?type=country&search=Colombia
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-456",
      "name": "Colombia",
      "code": "CO",
      "type": "country",
      "parentId": "uuid-latam",
      "coordinates": {
        "type": "Polygon",
        "coordinates": [[[-77, 4], [-77, 5], ...]]
      },
      "dataPointsCount": 523
    }
  ]
}
```

---

### GET /regions/:id

Obtiene una región específica con detalles.

**Request:**
```bash
GET /api/v1/regions/uuid-456
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-456",
    "name": "Colombia",
    "code": "CO",
    "type": "country",
    "parent": {
      "id": "uuid-latam",
      "name": "América Latina",
      "code": "LATAM"
    },
    "children": [
      {
        "id": "uuid-789",
        "name": "Bogotá D.C.",
        "code": "CO-DC",
        "type": "state"
      }
    ],
    "stats": {
      "totalIndicators": 42,
      "totalDataPoints": 523,
      "latestUpdate": "2023-12-31"
    }
  }
}
```

---

## 📈 Data Points

### GET /data/points

Obtiene datos de indicadores con filtros.

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| indicatorId | UUID | Sí | ID del indicador |
| regionId | UUID | No | ID de la región |
| startDate | date | No | Fecha inicial (YYYY-MM-DD) |
| endDate | date | No | Fecha final (YYYY-MM-DD) |
| page | number | No | Número de página |
| limit | number | No | Resultados por página |

**Request:**
```bash
GET /api/v1/data/points?indicatorId=uuid-123&regionId=uuid-456&startDate=2020-01-01&endDate=2023-12-31
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-data-1",
      "value": 12.5,
      "date": "2023-12-31",
      "indicator": {
        "id": "uuid-123",
        "name": "Tasa de aborto por 1000 mujeres",
        "unit": "ratio"
      },
      "region": {
        "id": "uuid-456",
        "name": "Colombia",
        "code": "CO"
      },
      "source": {
        "id": "uuid-source-1",
        "name": "WHO",
        "reliability": 10
      },
      "metadata": {
        "confidence_level": "high",
        "estimation_method": "survey"
      }
    }
  ],
  "pagination": {
    "total": 4,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

---

### GET /data/latest

Obtiene los datos más recientes disponibles.

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| category | string | No | Filtrar por categoría |
| regionId | UUID | No | Filtrar por región |
| limit | number | No | Número de resultados |

**Request:**
```bash
GET /api/v1/data/latest?category=abortion&limit=10
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "indicator": {
        "id": "uuid-123",
        "name": "Tasa de aborto por 1000 mujeres",
        "category": "abortion"
      },
      "region": {
        "id": "uuid-456",
        "name": "Colombia"
      },
      "value": 12.5,
      "date": "2023-12-31",
      "source": {
        "name": "WHO"
      }
    }
  ]
}
```

---

### GET /data/compare

Compara un indicador entre múltiples regiones.

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| indicatorId | UUID | Sí | ID del indicador |
| regionIds | UUID[] | Sí | IDs de regiones (separados por coma) |
| date | date | No | Fecha específica (default: latest) |
| startDate | date | No | Rango de fechas inicio |
| endDate | date | No | Rango de fechas fin |

**Request:**
```bash
GET /api/v1/data/compare?indicatorId=uuid-123&regionIds=uuid-456,uuid-789,uuid-012
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "indicator": {
      "id": "uuid-123",
      "name": "Tasa de aborto por 1000 mujeres",
      "unit": "ratio"
    },
    "comparison": [
      {
        "region": {
          "id": "uuid-456",
          "name": "Colombia",
          "code": "CO"
        },
        "value": 12.5,
        "date": "2023-12-31",
        "rank": 1
      },
      {
        "region": {
          "id": "uuid-789",
          "name": "Argentina",
          "code": "AR"
        },
        "value": 15.3,
        "date": "2023-12-31",
        "rank": 2
      }
    ]
  }
}
```

---

### GET /data/trends/:indicatorId/:regionId

Obtiene tendencias históricas de un indicador en una región.

**Path Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| indicatorId | UUID | Sí | ID del indicador |
| regionId | UUID | Sí | ID de la región |

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| startDate | date | No | Fecha inicial |
| endDate | date | No | Fecha final |
| interval | string | No | Agrupación: `year`, `month` (default: year) |

**Request:**
```bash
GET /api/v1/data/trends/uuid-123/uuid-456?startDate=2010-01-01&interval=year
```

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "indicator": {
      "id": "uuid-123",
      "name": "Tasa de aborto por 1000 mujeres"
    },
    "region": {
      "id": "uuid-456",
      "name": "Colombia"
    },
    "timeSeries": [
      {
        "date": "2010-01-01",
        "value": 10.2
      },
      {
        "date": "2011-01-01",
        "value": 10.8
      },
      {
        "date": "2012-01-01",
        "value": 11.5
      }
    ],
    "statistics": {
      "min": 10.2,
      "max": 15.8,
      "avg": 12.7,
      "trend": "increasing",
      "percentChange": 23.5
    }
  }
}
```

---

## 📚 Data Sources

### GET /sources

Obtiene la lista de fuentes de datos.

**Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-source-1",
      "name": "WHO",
      "organization": "World Health Organization",
      "url": "https://www.who.int",
      "apiEndpoint": "https://api.who.int/data",
      "reliability": 10,
      "lastUpdated": "2023-12-31T00:00:00.000Z",
      "dataPointsCount": 5420
    }
  ]
}
```

---

### GET /sources/:id

Obtiene detalles de una fuente específica.

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-source-1",
    "name": "WHO",
    "organization": "World Health Organization",
    "url": "https://www.who.int",
    "apiEndpoint": "https://api.who.int/data",
    "reliability": 10,
    "lastUpdated": "2023-12-31T00:00:00.000Z",
    "stats": {
      "totalDataPoints": 5420,
      "indicators": 25,
      "regions": 195,
      "successRate": 98.5
    },
    "recentLogs": [
      {
        "endpoint": "/data/abortion",
        "statusCode": 200,
        "responseTime": 450,
        "timestamp": "2025-10-16T09:00:00.000Z"
      }
    ]
  }
}
```

---

## 📊 Statistics

### GET /statistics/kpis

Obtiene los KPIs principales del dashboard.

**Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "totalCountries": 195,
    "totalIndicators": 85,
    "totalDataPoints": 125000,
    "totalCategories": 6,
    "lastDataUpdate": "2023-12-31T00:00:00.000Z",
    "coveragePercentage": 78.5
  }
}
```

---

### GET /statistics/summary

Obtiene resumen estadístico por categoría.

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| category | string | No | Filtrar por categoría |

**Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "category": "abortion",
      "indicators": 15,
      "dataPoints": 25000,
      "regionsWithData": 180,
      "latestUpdate": "2023-12-31",
      "coverage": 92.3
    }
  ]
}
```

---

## 📥 Export

### GET /export/csv

Exporta datos a formato CSV.

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| indicatorId | UUID | No | Filtrar por indicador |
| regionId | UUID | No | Filtrar por región |
| category | string | No | Filtrar por categoría |
| startDate | date | No | Fecha inicial |
| endDate | date | No | Fecha final |

**Request:**
```bash
GET /api/v1/export/csv?category=abortion&startDate=2020-01-01
```

**Response 200 OK:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="datos-provida-export-2025-10-16.csv"

Region,Indicator,Date,Value,Unit,Source
Colombia,Tasa de aborto por 1000 mujeres,2023-12-31,12.5,ratio,WHO
Argentina,Tasa de aborto por 1000 mujeres,2023-12-31,15.3,ratio,WHO
```

---

## ⚠️ Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Parámetros inválidos |
| 401 | Unauthorized - Autenticación requerida |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Error del servidor |
| 503 | Service Unavailable - Servicio no disponible |

**Formato de Error:**
```json
{
  "success": false,
  "error": {
    "message": "Descripción del error",
    "code": "ERROR_CODE",
    "details": {
      "field": "Detalles adicionales"
    }
  }
}
```

---

## 🔒 Rate Limiting

| Endpoint | Límite |
|----------|--------|
| General | 100 requests / 15 minutos |
| /export/* | 10 requests / hora |
| /data/* | 50 requests / minuto |

**Headers de respuesta:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1634567890
```

---

## 📖 Versionado

La API sigue versionado semántico (semver). La versión actual es especificada en la URL:

- **v1**: `/api/v1/*` - Versión actual estable
- Breaking changes resultarán en nueva versión mayor (v2, v3, etc.)
- Features nuevas sin breaking changes se agregan a la versión actual

---

## 🔗 Enlaces Útiles

- **Swagger UI**: https://api.datosprovidadashboard.com/api/v1/docs
- **OpenAPI Spec**: https://api.datosprovidadashboard.com/api/v1/docs.json
- **Postman Collection**: [Descargar](https://api.datosprovidadashboard.com/postman-collection.json)
- **Status Page**: https://status.datosprovidadashboard.com

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025