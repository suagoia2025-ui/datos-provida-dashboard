# Modelo de Datos

## 📊 Diagrama Entidad-Relación

```
┌─────────────────┐
│    regions      │
├─────────────────┤
│ id (PK)         │
│ name            │
│ code            │
│ type            │◄─────┐
│ parent_id (FK)  │      │
│ coordinates     │      │
│ created_at      │      │
│ updated_at      │      │
└─────────────────┘      │
                         │
                         │
┌─────────────────┐      │
│   indicators    │      │
├─────────────────┤      │
│ id (PK)         │      │
│ category        │      │
│ name            │      │
│ description     │      │
│ unit            │      │
│ created_at      │      │
│ updated_at      │      │
└────────┬────────┘      │
         │               │
         │               │
         ▼               │
┌─────────────────┐      │
│  data_points    │      │
├─────────────────┤      │
│ id (PK)         │      │
│ indicator_id(FK)├──────┘
│ region_id (FK)  ├──────┘
│ date            │
│ value           │
│ source_id (FK)  ├───────┐
│ metadata        │        │
│ created_at      │        │
│ updated_at      │        │
└─────────────────┘        │
                           │
                           │
┌─────────────────┐        │
│  data_sources   │        │
├─────────────────┤        │
│ id (PK)         │◄───────┘
│ name            │
│ organization    │
│ url             │
│ api_endpoint    │
│ reliability     │
│ last_updated    │
│ created_at      │
└─────────────────┘
         │
         │
         ▼
┌─────────────────┐
│   api_logs      │
├─────────────────┤
│ id (PK)         │
│ source_id (FK)  │
│ endpoint        │
│ status_code     │
│ response_time   │
│ error_message   │
│ created_at      │
└─────────────────┘
```

---

## 📋 Descripción de Tablas

### 1. regions

Almacena todas las regiones geográficas (continentes, países, estados).

| Campo        | Tipo         | Descripción                                    |
|-------------|--------------|------------------------------------------------|
| id          | UUID         | Identificador único                            |
| name        | VARCHAR(200) | Nombre de la región (ej: "Colombia")           |
| code        | VARCHAR(10)  | Código ISO (ej: "CO", "US", "EU")              |
| type        | ENUM         | global, continent, country, state              |
| parent_id   | UUID         | Referencia a región padre (null si es raíz)    |
| coordinates | JSONB        | GeoJSON con coordenadas para mapas             |
| created_at  | TIMESTAMP    | Fecha de creación                              |
| updated_at  | TIMESTAMP    | Fecha de última actualización                  |

**Índices:**
- PRIMARY KEY (id)
- INDEX (code)
- INDEX (type)
- INDEX (parent_id)

**Ejemplo de datos:**
```sql
INSERT INTO regions VALUES
('uuid-1', 'Global', 'GLOBAL', 'global', NULL, NULL, NOW(), NOW()),
('uuid-2', 'América Latina', 'LATAM', 'continent', 'uuid-1', {...}, NOW(), NOW()),
('uuid-3', 'Colombia', 'CO', 'country', 'uuid-2', {...}, NOW(), NOW());
```

---

### 2. indicators

Define todos los indicadores que se miden en el sistema.

| Campo       | Tipo          | Descripción                                   |
|------------|---------------|-----------------------------------------------|
| id         | UUID          | Identificador único                           |
| category   | VARCHAR(100)  | abortion, euthanasia, gender_ideology, drugs  |
| name       | VARCHAR(200)  | Nombre del indicador                          |
| description| TEXT          | Descripción detallada                         |
| unit       | VARCHAR(50)   | Unidad de medida (%, número, ratio)           |
| created_at | TIMESTAMP     | Fecha de creación                             |
| updated_at | TIMESTAMP     | Fecha de última actualización                 |

**Índices:**
- PRIMARY KEY (id)
- INDEX (category)
- UNIQUE (category, name)

**Categorías principales:**
- `abortion` - Aborto
- `euthanasia` - Eutanasia
- `gender_ideology` - Ideología de género
- `drugs` - Drogadicción
- `stem_cells` - Células madre
- `human_trafficking` - Trata de personas

**Ejemplo de datos:**
```sql
INSERT INTO indicators VALUES
('uuid-1', 'abortion', 'Número de abortos anuales', 'Total de procedimientos...', 'número', NOW(), NOW()),
('uuid-2', 'abortion', 'Tasa de aborto por 1000 mujeres', 'Ratio calculado...', 'ratio', NOW(), NOW()),
('uuid-3', 'euthanasia', 'Legislación de eutanasia', 'Estado legal en el país', 'categoría', NOW(), NOW());
```

---

### 3. data_points

Almacena los valores reales de cada indicador por región y fecha.

| Campo        | Tipo       | Descripción                                    |
|-------------|------------|------------------------------------------------|
| id          | UUID       | Identificador único                            |
| indicator_id| UUID       | FK a indicators                                |
| region_id   | UUID       | FK a regions                                   |
| date        | DATE       | Fecha del dato (año/mes/día)                   |
| value       | DECIMAL    | Valor numérico del indicador                   |
| source_id   | UUID       | FK a data_sources                              |
| metadata    | JSONB      | Datos adicionales contextuales                 |
| created_at  | TIMESTAMP  | Fecha de creación                              |
| updated_at  | TIMESTAMP  | Fecha de última actualización                  |

**Índices:**
- PRIMARY KEY (id)
- INDEX (indicator_id, region_id, date)
- INDEX (date)
- INDEX (source_id)
- UNIQUE (indicator_id, region_id, date, source_id)

**Ejemplo de datos:**
```sql
INSERT INTO data_points VALUES
('uuid-1', 'indicator-uuid-1', 'region-uuid-3', '2023-01-01', 125000, 'source-uuid-1', '{"notes": "Estimado"}', NOW(), NOW());
```

**Metadata (JSONB) puede contener:**
```json
{
  "confidence_level": "high",
  "estimation_method": "survey",
  "notes": "Preliminary data",
  "age_range": "15-49",
  "gender": "female"
}
```

---

### 4. data_sources

Registra todas las fuentes de datos externas.

| Campo        | Tipo         | Descripción                                   |
|-------------|--------------|-----------------------------------------------|
| id          | UUID         | Identificador único                           |
| name        | VARCHAR(200) | Nombre de la fuente (ej: "WHO")               |
| organization| VARCHAR(200) | Organización (ej: "World Health Org")         |
| url         | TEXT         | URL del sitio web                             |
| api_endpoint| TEXT         | Endpoint de la API si existe                  |
| reliability | INTEGER      | Score de confiabilidad (1-10)                 |
| last_updated| TIMESTAMP    | Última vez que se obtuvo datos                |
| created_at  | TIMESTAMP    | Fecha de creación                             |

**Índices:**
- PRIMARY KEY (id)
- UNIQUE (name)

**Ejemplo de datos:**
```sql
INSERT INTO data_sources VALUES
('uuid-1', 'WHO', 'World Health Organization', 'https://www.who.int', 'https://api.who.int/data', 10, NOW(), NOW()),
('uuid-2', 'World Bank', 'World Bank Group', 'https://worldbank.org', 'https://api.worldbank.org', 9, NOW(), NOW());
```

---

### 5. api_logs

Registra todas las llamadas a APIs externas para debugging y monitoreo.

| Campo         | Tipo         | Descripción                                   |
|--------------|--------------|-----------------------------------------------|
| id           | UUID         | Identificador único                           |
| source_id    | UUID         | FK a data_sources                             |
| endpoint     | TEXT         | URL completa llamada                          |
| status_code  | INTEGER      | Código HTTP de respuesta                      |
| response_time| INTEGER      | Tiempo de respuesta en ms                     |
| error_message| TEXT         | Mensaje de error si hubo fallo                |
| created_at   | TIMESTAMP    | Fecha de la llamada                           |

**Índices:**
- PRIMARY KEY (id)
- INDEX (source_id, created_at)
- INDEX (status_code)

**Ejemplo de datos:**
```sql
INSERT INTO api_logs VALUES
('uuid-1', 'source-uuid-1', 'https://api.who.int/data/abortion?year=2023', 200, 1250, NULL, NOW());
```

---

## 🔧 Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Region {
  id          String      @id @default(uuid())
  name        String      @db.VarChar(200)
  code        String      @db.VarChar(10)
  type        RegionType
  parentId    String?     @map("parent_id")
  coordinates Json?
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")
  
  parent      Region?     @relation("RegionHierarchy", fields: [parentId], references: [id])
  children    Region[]    @relation("RegionHierarchy")
  dataPoints  DataPoint[]
  
  @@index([code])
  @@index([type])
  @@index([parentId])
  @@map("regions")
}

enum RegionType {
  global
  continent
  country
  state
}

model Indicator {
  id          String      @id @default(uuid())
  category    Category
  name        String      @db.VarChar(200)
  description String      @db.Text
  unit        String      @db.VarChar(50)
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")
  
  dataPoints  DataPoint[]
  
  @@unique([category, name])
  @@index([category])
  @@map("indicators")
}

enum Category {
  abortion
  euthanasia
  gender_ideology
  drugs
  stem_cells
  human_trafficking
}

model DataPoint {
  id          String      @id @default(uuid())
  indicatorId String      @map("indicator_id")
  regionId    String      @map("region_id")
  date        DateTime    @db.Date
  value       Decimal     @db.Decimal(18, 4)
  sourceId    String      @map("source_id")
  metadata    Json?
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")
  
  indicator   Indicator   @relation(fields: [indicatorId], references: [id])
  region      Region      @relation(fields: [regionId], references: [id])
  source      DataSource  @relation(fields: [sourceId], references: [id])
  
  @@unique([indicatorId, regionId, date, sourceId])
  @@index([indicatorId, regionId, date])
  @@index([date])
  @@index([sourceId])
  @@map("data_points")
}

model DataSource {
  id           String      @id @default(uuid())
  name         String      @unique @db.VarChar(200)
  organization String      @db.VarChar(200)
  url          String      @db.Text
  apiEndpoint  String?     @map("api_endpoint") @db.Text
  reliability  Int         @default(5)
  lastUpdated  DateTime?   @map("last_updated")
  createdAt    DateTime    @default(now()) @map("created_at")
  
  dataPoints   DataPoint[]
  apiLogs      ApiLog[]
  
  @@map("data_sources")
}

model ApiLog {
  id            String      @id @default(uuid())
  sourceId      String      @map("source_id")
  endpoint      String      @db.Text
  statusCode    Int         @map("status_code")
  responseTime  Int         @map("response_time")
  errorMessage  String?     @map("error_message") @db.Text
  createdAt     DateTime    @default(now()) @map("created_at")
  
  source        DataSource  @relation(fields: [sourceId], references: [id])
  
  @@index([sourceId, createdAt])
  @@index([statusCode])
  @@map("api_logs")
}
```

---

## 🎨 Consideraciones de Diseño

### 1. Normalización
- 3ra Forma Normal para evitar redundancia
- Uso de UUIDs para IDs (mejor para distribución)

### 2. Escalabilidad
- Índices en campos frecuentemente consultados
- JSONB para datos flexibles (metadata)
- Particionamiento futuro en data_points por fecha

### 3. Integridad Referencial
- Foreign Keys con ON DELETE CASCADE donde aplica
- Constraints únicos para prevenir duplicados

### 4. Auditoría
- created_at y updated_at en todas las tablas
- api_logs para tracking de integraciones

### 5. Flexibilidad
- metadata (JSONB) permite agregar campos sin migración
- enum extensibles para categorías

---

## 📈 Estimación de Volumen

### Proyección 5 años

| Tabla        | Filas Estimadas | Tamaño Aprox |
|-------------|-----------------|--------------|
| regions     | 500             | 50 KB        |
| indicators  | 100             | 20 KB        |
| data_points | 5,000,000       | 500 MB       |
| data_sources| 50              | 10 KB        |
| api_logs    | 1,000,000       | 100 MB       |

**Total estimado:** ~600 MB

---

## 🔍 Queries Comunes

Ver documento [SQL_QUERIES.md](./SQL_QUERIES.md) para queries optimizadas.

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025