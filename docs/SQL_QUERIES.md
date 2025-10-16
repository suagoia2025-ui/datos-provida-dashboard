# Consultas SQL Optimizadas

## 📊 Queries Frecuentes

### 1. Obtener todos los indicadores de una categoría

```sql
-- Obtener todos los indicadores de aborto
SELECT 
  id,
  name,
  description,
  unit
FROM indicators
WHERE category = 'abortion'
ORDER BY name;
```

---

### 2. Obtener datos de un indicador para una región específica

```sql
-- Datos de abortos en Colombia en los últimos 5 años
SELECT 
  dp.date,
  dp.value,
  i.name AS indicator_name,
  i.unit,
  r.name AS region_name,
  ds.name AS source_name
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
INNER JOIN data_sources ds ON dp.source_id = ds.id
WHERE 
  r.code = 'CO'
  AND i.category = 'abortion'
  AND dp.date >= CURRENT_DATE - INTERVAL '5 years'
ORDER BY dp.date DESC;
```

---

### 3. Comparar un indicador entre múltiples regiones

```sql
-- Comparar tasas de aborto entre países de Latinoamérica (último año disponible)
SELECT 
  r.name AS country,
  i.name AS indicator,
  dp.value,
  dp.date,
  ds.name AS source
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
INNER JOIN data_sources ds ON dp.source_id = ds.id
WHERE 
  i.name = 'Tasa de aborto por 1000 mujeres'
  AND r.parent_id = (SELECT id FROM regions WHERE code = 'LATAM')
  AND dp.date = (
    SELECT MAX(date) 
    FROM data_points dp2 
    WHERE dp2.indicator_id = dp.indicator_id 
    AND dp2.region_id = dp.region_id
  )
ORDER BY dp.value DESC;
```

---

### 4. Tendencia histórica de un indicador

```sql
-- Tendencia de abortos en Europa desde 2000
SELECT 
  EXTRACT(YEAR FROM dp.date) AS year,
  AVG(dp.value) AS average_value,
  COUNT(DISTINCT dp.region_id) AS countries_reporting
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
WHERE 
  i.name = 'Número de abortos anuales'
  AND r.parent_id = (SELECT id FROM regions WHERE code = 'EU')
  AND EXTRACT(YEAR FROM dp.date) >= 2000
GROUP BY EXTRACT(YEAR FROM dp.date)
ORDER BY year;
```

---

### 5. Top 10 países con mayor valor en un indicador

```sql
-- Top 10 países con más casos de trata de personas (último año)
WITH latest_data AS (
  SELECT 
    dp.region_id,
    dp.indicator_id,
    MAX(dp.date) AS latest_date
  FROM data_points dp
  INNER JOIN indicators i ON dp.indicator_id = i.id
  WHERE i.category = 'human_trafficking'
  GROUP BY dp.region_id, dp.indicator_id
)
SELECT 
  r.name AS country,
  i.name AS indicator,
  dp.value,
  dp.date,
  ds.name AS source
FROM data_points dp
INNER JOIN latest_data ld ON 
  dp.region_id = ld.region_id 
  AND dp.indicator_id = ld.indicator_id 
  AND dp.date = ld.latest_date
INNER JOIN regions r ON dp.region_id = r.id
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN data_sources ds ON dp.source_id = ds.id
WHERE r.type = 'country'
ORDER BY dp.value DESC
LIMIT 10;
```

---

### 6. Obtener todas las categorías con su último dato

```sql
-- Resumen de todas las categorías con fecha de última actualización
SELECT 
  i.category,
  COUNT(DISTINCT i.id) AS total_indicators,
  COUNT(DISTINCT dp.region_id) AS regions_covered,
  MAX(dp.date) AS last_update
FROM indicators i
LEFT JOIN data_points dp ON i.id = dp.indicator_id
GROUP BY i.category
ORDER BY i.category;
```

---

### 7. Buscar datos faltantes

```sql
-- Encontrar regiones sin datos para un indicador específico
SELECT 
  r.name AS region_name,
  r.code,
  r.type
FROM regions r
WHERE 
  r.type = 'country'
  AND NOT EXISTS (
    SELECT 1 
    FROM data_points dp
    INNER JOIN indicators i ON dp.indicator_id = i.id
    WHERE dp.region_id = r.id
    AND i.name = 'Número de abortos anuales'
  )
ORDER BY r.name;
```

---

### 8. Estadísticas de una categoría completa

```sql
-- Estadísticas globales de drogadicción
SELECT 
  i.name AS indicator,
  COUNT(DISTINCT dp.region_id) AS countries_with_data,
  MIN(dp.value) AS min_value,
  AVG(dp.value) AS avg_value,
  MAX(dp.value) AS max_value,
  MAX(dp.date) AS latest_data_date
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
WHERE i.category = 'drugs'
GROUP BY i.id, i.name
ORDER BY i.name;
```

---

### 9. Crecimiento porcentual año a año

```sql
-- Crecimiento anual de abortos en un país
WITH yearly_data AS (
  SELECT 
    EXTRACT(YEAR FROM dp.date) AS year,
    SUM(dp.value) AS total_value
  FROM data_points dp
  INNER JOIN indicators i ON dp.indicator_id = i.id
  INNER JOIN regions r ON dp.region_id = r.id
  WHERE 
    r.code = 'CO'
    AND i.name = 'Número de abortos anuales'
  GROUP BY EXTRACT(YEAR FROM dp.date)
)
SELECT 
  year,
  total_value,
  LAG(total_value) OVER (ORDER BY year) AS previous_year_value,
  ROUND(
    ((total_value - LAG(total_value) OVER (ORDER BY year)) / 
    LAG(total_value) OVER (ORDER BY year)) * 100, 
    2
  ) AS percent_change
FROM yearly_data
ORDER BY year;
```

---

### 10. Datos con múltiples fuentes para el mismo período

```sql
-- Comparar datos del mismo indicador de diferentes fuentes
SELECT 
  r.name AS region,
  i.name AS indicator,
  dp.date,
  ds.name AS source,
  dp.value,
  ds.reliability AS source_reliability
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
INNER JOIN data_sources ds ON dp.source_id = ds.id
WHERE 
  r.code = 'US'
  AND i.name = 'Número de abortos anuales'
  AND dp.date = '2023-01-01'
ORDER BY ds.reliability DESC;
```

---

## 🔧 Queries de Mantenimiento

### 1. Verificar integridad de datos

```sql
-- Verificar que no hay data_points huérfanos
SELECT COUNT(*) 
FROM data_points dp
WHERE NOT EXISTS (
  SELECT 1 FROM indicators i WHERE i.id = dp.indicator_id
)
OR NOT EXISTS (
  SELECT 1 FROM regions r WHERE r.id = dp.region_id
)
OR NOT EXISTS (
  SELECT 1 FROM data_sources ds WHERE ds.id = dp.source_id
);
```

---

### 2. Limpiar logs antiguos

```sql
-- Eliminar logs de API mayores a 90 días
DELETE FROM api_logs
WHERE created_at < CURRENT_DATE - INTERVAL '90 days';
```

---

### 3. Actualizar timestamp de fuente

```sql
-- Actualizar última fecha de actualización de una fuente
UPDATE data_sources
SET last_updated = CURRENT_TIMESTAMP
WHERE name = 'WHO';
```

---

### 4. Duplicados potenciales

```sql
-- Encontrar posibles duplicados en data_points
SELECT 
  indicator_id,
  region_id,
  date,
  COUNT(*) as duplicate_count
FROM data_points
GROUP BY indicator_id, region_id, date
HAVING COUNT(*) > 1;
```

---

## 📊 Queries para Dashboard

### 1. KPIs principales para el dashboard

```sql
-- KPIs globales del dashboard
SELECT 
  (SELECT COUNT(*) FROM regions WHERE type = 'country') AS total_countries,
  (SELECT COUNT(*) FROM indicators) AS total_indicators,
  (SELECT COUNT(*) FROM data_points) AS total_data_points,
  (SELECT COUNT(DISTINCT category) FROM indicators) AS total_categories,
  (SELECT MAX(date) FROM data_points) AS last_data_update;
```

---

### 2. Datos para gráfico de líneas (tiempo)

```sql
-- Datos para gráfico de tendencia temporal
SELECT 
  dp.date,
  dp.value
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
WHERE 
  i.id = :indicator_id
  AND r.id = :region_id
  AND dp.date BETWEEN :start_date AND :end_date
ORDER BY dp.date;
```

---

### 3. Datos para gráfico de barras (comparación)

```sql
-- Comparación entre países (gráfico de barras)
SELECT 
  r.name AS label,
  dp.value AS value
FROM data_points dp
INNER JOIN regions r ON dp.region_id = r.id
WHERE 
  dp.indicator_id = :indicator_id
  AND dp.date = :specific_date
  AND r.id IN (:region_ids)
ORDER BY dp.value DESC;
```

---

### 4. Datos para mapa mundial

```sql
-- Datos para colorear mapa mundial
SELECT 
  r.code,
  r.name,
  r.coordinates,
  dp.value,
  i.unit
FROM data_points dp
INNER JOIN regions r ON dp.region_id = r.id
INNER JOIN indicators i ON dp.indicator_id = i.id
WHERE 
  i.id = :indicator_id
  AND r.type = 'country'
  AND dp.date = (
    SELECT MAX(date) 
    FROM data_points dp2 
    WHERE dp2.indicator_id = dp.indicator_id 
    AND dp2.region_id = dp.region_id
  );
```

---

## 🚀 Optimizaciones

### 1. Índices recomendados

```sql
-- Índice compuesto para queries frecuentes
CREATE INDEX idx_datapoints_lookup 
ON data_points (indicator_id, region_id, date DESC);

-- Índice para búsquedas por categoría
CREATE INDEX idx_indicators_category 
ON indicators (category);

-- Índice para jerarquía de regiones
CREATE INDEX idx_regions_parent 
ON regions (parent_id) WHERE parent_id IS NOT NULL;
```

---

### 2. Vista materializada para dashboard

```sql
-- Vista materializada con datos más recientes por indicador/región
CREATE MATERIALIZED VIEW mv_latest_data AS
SELECT 
  i.category,
  i.name AS indicator_name,
  i.unit,
  r.code AS region_code,
  r.name AS region_name,
  dp.value,
  dp.date,
  ds.name AS source_name
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
INNER JOIN data_sources ds ON dp.source_id = ds.id
WHERE dp.date = (
  SELECT MAX(date)
  FROM data_points dp2
  WHERE dp2.indicator_id = dp.indicator_id
  AND dp2.region_id = dp.region_id
);

-- Índice en la vista materializada
CREATE INDEX idx_mv_latest_category ON mv_latest_data (category);
CREATE INDEX idx_mv_latest_region ON mv_latest_data (region_code);

-- Refrescar vista (ejecutar periódicamente)
REFRESH MATERIALIZED VIEW mv_latest_data;
```

---

### 3. Función para obtener datos con fallback

```sql
-- Función que busca datos, si no encuentra usa región padre
CREATE OR REPLACE FUNCTION get_data_with_fallback(
  p_indicator_id UUID,
  p_region_id UUID,
  p_date DATE
) RETURNS TABLE (
  value DECIMAL,
  region_id UUID,
  region_name VARCHAR,
  is_fallback BOOLEAN
) AS $$
BEGIN
  -- Intentar obtener dato exacto
  RETURN QUERY
  SELECT 
    dp.value,
    dp.region_id,
    r.name,
    FALSE
  FROM data_points dp
  INNER JOIN regions r ON dp.region_id = r.id
  WHERE 
    dp.indicator_id = p_indicator_id
    AND dp.region_id = p_region_id
    AND dp.date = p_date
  LIMIT 1;
  
  -- Si no hay resultados, buscar en región padre
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      dp.value,
      dp.region_id,
      r.name,
      TRUE
    FROM data_points dp
    INNER JOIN regions r ON dp.region_id = r.id
    INNER JOIN regions child ON r.id = child.parent_id
    WHERE 
      dp.indicator_id = p_indicator_id
      AND child.id = p_region_id
      AND dp.date = p_date
    LIMIT 1;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

---

## 📈 Queries de Análisis

### 1. Correlación entre dos indicadores

```sql
-- Correlación entre abortos y legislación de eutanasia
SELECT 
  r.name,
  dp1.value AS abortion_rate,
  dp2.value AS euthanasia_legal
FROM data_points dp1
INNER JOIN data_points dp2 ON 
  dp1.region_id = dp2.region_id 
  AND dp1.date = dp2.date
INNER JOIN regions r ON dp1.region_id = r.id
INNER JOIN indicators i1 ON dp1.indicator_id = i1.id
INNER JOIN indicators i2 ON dp2.indicator_id = i2.id
WHERE 
  i1.name = 'Tasa de aborto por 1000 mujeres'
  AND i2.name = 'Legislación de eutanasia'
  AND r.type = 'country'
  AND EXTRACT(YEAR FROM dp1.date) = 2023;
```

---

## 🛡️ Queries de Seguridad

### 1. Auditoría de cambios

```sql
-- Ver últimos cambios en data_points
SELECT 
  dp.id,
  i.name AS indicator,
  r.name AS region,
  dp.value,
  dp.created_at,
  dp.updated_at
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
WHERE dp.updated_at > dp.created_at
ORDER BY dp.updated_at DESC
LIMIT 50;
```

---

### 2. Validar calidad de datos

```sql
-- Encontrar valores atípicos (outliers)
WITH stats AS (
  SELECT 
    indicator_id,
    AVG(value) AS mean_value,
    STDDEV(value) AS stddev_value
  FROM data_points
  GROUP BY indicator_id
)
SELECT 
  i.name AS indicator,
  r.name AS region,
  dp.value,
  s.mean_value,
  s.stddev_value,
  ABS(dp.value - s.mean_value) / NULLIF(s.stddev_value, 0) AS z_score
FROM data_points dp
INNER JOIN stats s ON dp.indicator_id = s.indicator_id
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN regions r ON dp.region_id = r.id
WHERE ABS(dp.value - s.mean_value) / NULLIF(s.stddev_value, 0) > 3
ORDER BY z_score DESC;
```

---

## 💾 Queries de Backup y Restauración

### 1. Exportar datos de una categoría

```sql
-- Exportar todos los datos de aborto a CSV
COPY (
  SELECT 
    r.name AS region,
    i.name AS indicator,
    dp.date,
    dp.value,
    i.unit,
    ds.name AS source
  FROM data_points dp
  INNER JOIN indicators i ON dp.indicator_id = i.id
  INNER JOIN regions r ON dp.region_id = r.id
  INNER JOIN data_sources ds ON dp.source_id = ds.id
  WHERE i.category = 'abortion'
  ORDER BY r.name, i.name, dp.date
) TO '/tmp/abortion_data.csv' WITH CSV HEADER;
```

---

### 2. Backup incremental

```sql
-- Backup de datos modificados en las últimas 24 horas
SELECT 
  'data_points' AS table_name,
  COUNT(*) AS records_changed
FROM data_points
WHERE updated_at > CURRENT_TIMESTAMP - INTERVAL '24 hours'
UNION ALL
SELECT 
  'indicators' AS table_name,
  COUNT(*) AS records_changed
FROM indicators
WHERE updated_at > CURRENT_TIMESTAMP - INTERVAL '24 hours'
UNION ALL
SELECT 
  'regions' AS table_name,
  COUNT(*) AS records_changed
FROM regions
WHERE updated_at > CURRENT_TIMESTAMP - INTERVAL '24 hours';
```

---

## 📊 Queries para Reportes

### 1. Reporte mensual ejecutivo

```sql
-- Reporte ejecutivo del mes
WITH monthly_stats AS (
  SELECT 
    i.category,
    COUNT(DISTINCT dp.region_id) AS countries_updated,
    COUNT(*) AS data_points_added,
    MIN(dp.date) AS earliest_data,
    MAX(dp.date) AS latest_data
  FROM data_points dp
  INNER JOIN indicators i ON dp.indicator_id = i.id
  WHERE 
    dp.created_at >= DATE_TRUNC('month', CURRENT_DATE)
    AND dp.created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
  GROUP BY i.category
)
SELECT 
  category,
  countries_updated,
  data_points_added,
  earliest_data,
  latest_data,
  ROUND(
    data_points_added::NUMERIC / countries_updated, 
    2
  ) AS avg_points_per_country
FROM monthly_stats
ORDER BY data_points_added DESC;
```

---

### 2. Cobertura de datos por región

```sql
-- Porcentaje de cobertura de indicadores por región
SELECT 
  r.name AS region,
  COUNT(DISTINCT dp.indicator_id) AS indicators_with_data,
  (SELECT COUNT(*) FROM indicators) AS total_indicators,
  ROUND(
    (COUNT(DISTINCT dp.indicator_id)::NUMERIC / 
    (SELECT COUNT(*) FROM indicators)::NUMERIC) * 100,
    2
  ) AS coverage_percentage
FROM regions r
LEFT JOIN data_points dp ON r.id = dp.region_id
WHERE r.type = 'country'
GROUP BY r.id, r.name
ORDER BY coverage_percentage DESC;
```

---

## 🔍 Queries Avanzados

### 1. Ranking dinámico con ventanas

```sql
-- Ranking de países por indicador con cambio de posición
WITH current_year AS (
  SELECT 
    r.name,
    dp.value,
    RANK() OVER (ORDER BY dp.value DESC) AS rank_2023
  FROM data_points dp
  INNER JOIN regions r ON dp.region_id = r.id
  INNER JOIN indicators i ON dp.indicator_id = i.id
  WHERE 
    i.name = 'Número de abortos anuales'
    AND r.type = 'country'
    AND EXTRACT(YEAR FROM dp.date) = 2023
),
previous_year AS (
  SELECT 
    r.name,
    dp.value,
    RANK() OVER (ORDER BY dp.value DESC) AS rank_2022
  FROM data_points dp
  INNER JOIN regions r ON dp.region_id = r.id
  INNER JOIN indicators i ON dp.indicator_id = i.id
  WHERE 
    i.name = 'Número de abortos anuales'
    AND r.type = 'country'
    AND EXTRACT(YEAR FROM dp.date) = 2022
)
SELECT 
  c.name,
  c.value AS value_2023,
  c.rank_2023,
  p.rank_2022,
  (p.rank_2022 - c.rank_2023) AS rank_change
FROM current_year c
LEFT JOIN previous_year p ON c.name = p.name
ORDER BY c.rank_2023;
```

---

### 2. Análisis de gaps temporales

```sql
-- Identificar gaps en series temporales
WITH date_series AS (
  SELECT 
    dp.indicator_id,
    dp.region_id,
    dp.date,
    LEAD(dp.date) OVER (
      PARTITION BY dp.indicator_id, dp.region_id 
      ORDER BY dp.date
    ) AS next_date
  FROM data_points dp
)
SELECT 
  i.name AS indicator,
  r.name AS region,
  ds.date AS gap_start,
  ds.next_date AS gap_end,
  (ds.next_date - ds.date) AS days_gap
FROM date_series ds
INNER JOIN indicators i ON ds.indicator_id = i.id
INNER JOIN regions r ON ds.region_id = r.id
WHERE (ds.next_date - ds.date) > 365
ORDER BY days_gap DESC;
```

---

## 🎯 Queries para API Endpoints

### 1. GET /api/v1/indicators

```sql
-- Listar todos los indicadores con metadata
SELECT 
  i.id,
  i.category,
  i.name,
  i.description,
  i.unit,
  COUNT(DISTINCT dp.region_id) AS regions_count,
  MIN(dp.date) AS earliest_data,
  MAX(dp.date) AS latest_data
FROM indicators i
LEFT JOIN data_points dp ON i.id = dp.indicator_id
GROUP BY i.id, i.category, i.name, i.description, i.unit
ORDER BY i.category, i.name;
```

---

### 2. GET /api/v1/regions/:id/data

```sql
-- Obtener todos los datos de una región específica
SELECT 
  i.category,
  i.name AS indicator,
  dp.date,
  dp.value,
  i.unit,
  ds.name AS source,
  ds.reliability
FROM data_points dp
INNER JOIN indicators i ON dp.indicator_id = i.id
INNER JOIN data_sources ds ON dp.source_id = ds.id
WHERE dp.region_id = :region_id
ORDER BY i.category, i.name, dp.date DESC;
```

---

### 3. GET /api/v1/compare

```sql
-- Comparar múltiples regiones en un indicador
SELECT 
  r.name AS region,
  r.code,
  dp.value,
  dp.date,
  i.unit
FROM data_points dp
INNER JOIN regions r ON dp.region_id = r.id
INNER JOIN indicators i ON dp.indicator_id = i.id
WHERE 
  dp.indicator_id = :indicator_id
  AND r.id = ANY(:region_ids)
  AND dp.date BETWEEN :start_date AND :end_date
ORDER BY r.name, dp.date;
```

---

## 🧹 Queries de Limpieza

### 1. Eliminar datos obsoletos

```sql
-- Eliminar data_points con más de 10 años sin actualización
DELETE FROM data_points
WHERE 
  updated_at < CURRENT_DATE - INTERVAL '10 years'
  AND id NOT IN (
    SELECT DISTINCT dp.id
    FROM data_points dp
    INNER JOIN indicators i ON dp.indicator_id = i.id
    WHERE i.category IN ('abortion', 'euthanasia') -- Mantener categorías críticas
  );
```

---

### 2. Consolidar datos duplicados

```sql
-- Consolidar duplicados manteniendo el más reciente
WITH duplicates AS (
  SELECT 
    indicator_id,
    region_id,
    date,
    MAX(updated_at) AS latest_update
  FROM data_points
  GROUP BY indicator_id, region_id, date
  HAVING COUNT(*) > 1
)
DELETE FROM data_points dp
WHERE EXISTS (
  SELECT 1
  FROM duplicates d
  WHERE 
    dp.indicator_id = d.indicator_id
    AND dp.region_id = d.region_id
    AND dp.date = d.date
    AND dp.updated_at < d.latest_update
);
```

---

## 📝 Notas de Performance

### Mejores Prácticas:

1. **Usar EXPLAIN ANALYZE** antes de queries complejos
2. **Limitar resultados** con LIMIT en desarrollo
3. **Índices compuestos** para queries frecuentes
4. **Vistas materializadas** para dashboards
5. **Particionamiento** si data_points supera 10M registros
6. **Connection pooling** en producción (PgBouncer)

### Ejemplo de EXPLAIN:

```sql
EXPLAIN ANALYZE
SELECT r.name, dp.value
FROM data_points dp
INNER JOIN regions r ON dp.region_id = r.id
WHERE dp.indicator_id = 'some-uuid'
ORDER BY dp.value DESC
LIMIT 10;
```

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025