# Historias de Usuario

## 📖 Formato

Cada historia sigue el formato:

**Como** [tipo de usuario]  
**Quiero** [acción/funcionalidad]  
**Para** [beneficio/objetivo]

**Criterios de Aceptación:**
- Lista de condiciones que deben cumplirse

---

## 🎯 Épica 1: Visualización de Datos

### US-001: Ver Dashboard Principal

**Como** visitante del sitio  
**Quiero** ver un dashboard con indicadores clave sobre temas pro-vida  
**Para** tener una visión general de la situación global

**Prioridad:** Alta  
**Estimación:** 8 puntos

**Criterios de Aceptación:**
- El dashboard muestra al menos 5 indicadores principales
- Los datos se cargan en menos de 3 segundos
- La interfaz es responsive (móvil, tablet, desktop)
- Los gráficos son interactivos (hover, zoom)
- Hay un indicador de carga mientras se obtienen datos

**Tareas Técnicas:**
- Diseñar layout del dashboard
- Crear componentes de gráficos
- Integrar API de datos
- Implementar estados de carga
- Testing responsive

---

### US-002: Filtrar por Región Geográfica

**Como** usuario del dashboard  
**Quiero** filtrar los datos por región o país  
**Para** comparar indicadores entre diferentes zonas geográficas

**Prioridad:** Alta  
**Estimación:** 5 puntos

**Criterios de Aceptación:**
- Dropdown o selector de regiones visible
- Opciones: Global, Continentes, Países individuales
- Los gráficos se actualizan al cambiar la región
- Se muestra un mensaje si no hay datos para la región seleccionada
- El filtro persiste al navegar entre secciones

**Tareas Técnicas:**
- Crear componente de selector de regiones
- Implementar lógica de filtrado
- Conectar con API de regiones
- Manejar estados vacíos
- Persistir selección (localStorage)

---

### US-003: Ver Tendencias Temporales

**Como** usuario interesado en estadísticas  
**Quiero** ver cómo han evolucionado los indicadores en el tiempo  
**Para** identificar tendencias y cambios históricos

**Prioridad:** Media  
**Estimación:** 8 puntos

**Criterios de Aceptación:**
- Gráficos de líneas muestran datos históricos
- Rango de fechas seleccionable (últimos 5, 10, 20 años)
- Zoom y pan en los gráficos
- Tooltip muestra valores exactos al hacer hover
- Opción de exportar datos como CSV

**Tareas Técnicas:**
- Implementar gráficos de líneas con Recharts
- Crear selector de rango de fechas
- API endpoint para datos históricos
- Función de exportación a CSV
- Testing de interactividad

---

## 🎯 Épica 2: Indicadores Específicos

### US-004: Ver Estadísticas de Aborto

**Como** investigador o activista  
**Quiero** ver estadísticas globales sobre aborto  
**Para** fundamentar mis argumentos con datos oficiales

**Prioridad:** Alta  
**Estimación:** 13 puntos

**Criterios de Aceptación:**
- Sección dedicada a estadísticas de aborto
- Datos por país y región
- Incluye: número de abortos, tasas, legislación
- Fuentes de datos claramente citadas
- Gráficos comparativos entre países

**Tareas Técnicas:**
- Integrar WHO API para datos de salud
- Modelar datos de aborto en BD
- Crear vista específica de aborto
- Implementar gráficos comparativos
- Agregar referencias a fuentes

---

### US-005: Ver Datos sobre Eutanasia

**Como** usuario del dashboard  
**Quiero** ver información sobre eutanasia por país  
**Para** conocer dónde está legalizada y sus implicaciones

**Prioridad:** Alta  
**Estimación:** 8 puntos

**Criterios de Aceptación:**
- Mapa mundial mostrando legislación por país
- Códigos de color según legalidad (prohibida, permitida, regulada)
- Tooltip con detalles al pasar sobre cada país
- Filtros por tipo de eutanasia (activa, pasiva, asistida)
- Timeline de cambios legislativos

**Tareas Técnicas:**
- Integrar librería de mapas (react-simple-maps)
- Recopilar datos legislativos
- Modelar datos de eutanasia
- Crear componente de mapa interactivo
- Timeline component

---

### US-006: Ver Indicadores de Ideología de Género

**Como** padre de familia o educador  
**Quiero** ver datos sobre políticas de ideología de género  
**Para** entender su implementación en educación y sociedad

**Prioridad:** Media  
**Estimación:** 13 puntos

**Criterios de Aceptación:**
- Indicadores por país sobre políticas educativas
- Datos sobre legislación de identidad de género
- Estadísticas sobre tratamientos en menores
- Comparativas entre países con diferentes enfoques
- Referencias a estudios y fuentes oficiales

**Tareas Técnicas:**
- Investigar fuentes de datos confiables
- Definir indicadores clave a mostrar
- Crear modelos de datos
- Integración de APIs o scraping legal
- Vista dedicada con múltiples gráficos

---

### US-007: Ver Datos de Drogadicción

**Como** trabajador social o funcionario público  
**Quiero** ver estadísticas sobre consumo y tráfico de drogas  
**Para** diseñar políticas de prevención efectivas

**Prioridad:** Media  
**Estimación:** 8 puntos

**Criterios de Aceptación:**
- Datos de consumo por tipo de droga
- Estadísticas de tratamiento y rehabilitación
- Mortalidad relacionada con drogas
- Comparativas entre políticas restrictivas vs permisivas
- Datos por grupos de edad

**Tareas Técnicas:**
- Integrar UN Office on Drugs and Crime API
- Modelar datos de sustancias
- Crear gráficos de consumo
- Implementar filtros por sustancia y edad
- Documentar fuentes

---

### US-008: Ver Datos sobre Trata de Personas

**Como** activista contra la trata  
**Quiero** ver estadísticas sobre tráfico humano  
**Para** identificar zonas de alto riesgo y tendencias

**Prioridad:** Alta  
**Estimación:** 13 puntos

**Criterios de Aceptación:**
- Mapa de flujos de trata de personas
- Datos por tipo (sexual, laboral, menores)
- Estadísticas de víctimas rescatadas
- Comparativa de legislación por país
- Recursos y organizaciones de ayuda

**Tareas Técnicas:**
- Integrar datos de UN y organizaciones
- Crear visualización de flujos (flow map)
- Modelar datos de trata
- Implementar alertas de contenido sensible
- Links a recursos de ayuda

---

### US-009: Ver Investigación con Células Madre

**Como** investigador o estudiante de bioética  
**Quiero** ver datos sobre investigación con células madre  
**Para** entender diferencias entre enfoques embrionarios y adultos

**Prioridad:** Media  
**Estimación:** 8 puntos

**Criterios de Aceptación:**
- Comparativa entre células embrionarias vs adultas
- Datos de inversión en investigación
- Resultados y aplicaciones médicas
- Legislación por país
- Referencias a papers científicos (PubMed)

**Tareas Técnicas:**
- Integrar PubMed API
- Recopilar datos de inversión
- Modelar datos de investigación
- Crear gráficos comparativos
- Links a estudios científicos

---

## 🎯 Épica 3: Experiencia de Usuario

### US-010: Compartir Datos

**Como** usuario del dashboard  
**Quiero** compartir gráficos o estadísticas específicas  
**Para** difundir información en redes sociales

**Prioridad:** Baja  
**Estimación:** 5 puntos

**Criterios de Aceptación:**
- Botón de compartir en cada gráfico
- Genera imagen PNG del gráfico
- Links para compartir en Twitter, Facebook, WhatsApp
- URL con parámetros para compartir vista específica
- Watermark con fuente de datos

**Tareas Técnicas:**
- Implementar html-to-image
- Crear modal de compartir
- Generar URLs con query params
- Botones de redes sociales
- Agregar watermarks

---

### US-011: Exportar Reportes

**Como** investigador o periodista  
**Quiero** exportar datos en formato CSV o PDF  
**Para** utilizarlos en mis propios análisis o artículos

**Prioridad:** Media  
**Estimación:** 5 puntos

**Criterios de Aceptación:**
- Opción de exportar a CSV
- Opción de exportar a PDF
- El PDF incluye gráficos y metadatos
- El CSV contiene todos los datos filtrados
- Límite razonable de filas (10,000)

**Tareas Técnicas:**
- Implementar exportación CSV
- Librería para generar PDFs (jsPDF)
- Formateo de datos
- API endpoint para exportaciones grandes
- Rate limiting

---

### US-012: Ver Fuentes de Datos

**Como** usuario crítico  
**Quiero** ver las fuentes de cada dato mostrado  
**Para** verificar la confiabilidad de la información

**Prioridad:** Alta  
**Estimación:** 3 puntos

**Criterios de Aceptación:**
- Cada gráfico tiene link a "Ver fuentes"
- Modal o sección con lista de fuentes
- Links directos a APIs o documentos originales
- Fecha de última actualización
- Nota metodológica si aplica

**Tareas Técnicas:**
- Crear componente de fuentes
- Modelar metadata de fuentes
- Links verificados
- Modal informativo
- Footer con disclaimer

---

## 🎯 Épica 4: Administración (Fase 2)

### US-013: Actualizar Datos Manualmente

**Como** administrador del sistema  
**Quiero** actualizar datos manualmente desde un panel  
**Para** corregir errores o agregar datos faltantes

**Prioridad:** Baja  
**Estimación:** 13 puntos

**Criterios de Aceptación:**
- Panel de administración protegido
- Formularios para editar indicadores
- Validación de datos
- Log de cambios realizados
- Confirmación antes de guardar

**Tareas Técnicas:**
- Crear panel de admin
- Autenticación y autorización
- CRUDs para cada entidad
- Logging de cambios
- Testing de permisos

---

### US-014: Configurar Actualizaciones Automáticas

**Como** administrador del sistema  
**Quiero** configurar actualizaciones automáticas de APIs  
**Para** mantener los datos siempre frescos sin intervención manual

**Prioridad:** Media  
**Estimación:** 8 puntos

**Criterios de Aceptación:**
- Cron jobs configurables
- Dashboard de estado de sincronizaciones
- Notificaciones si una API falla
- Logs de ejecuciones
- Posibilidad de ejecutar manualmente

**Tareas Técnicas:**
- Implementar cron con node-cron
- Crear jobs de sincronización
- Sistema de notificaciones
- Dashboard de monitoreo
- Error handling robusto

---

## 📊 Resumen de Prioridades

### Sprint 1 (MVP)
- US-001: Ver Dashboard Principal (Alta)
- US-002: Filtrar por Región (Alta)
- US-004: Estadísticas de Aborto (Alta)
- US-012: Ver Fuentes de Datos (Alta)

### Sprint 2
- US-003: Ver Tendencias Temporales (Media)
- US-005: Datos sobre Eutanasia (Alta)
- US-008: Datos sobre Trata (Alta)

### Sprint 3
- US-006: Ideología de Género (Media)
- US-007: Datos de Drogadicción (Media)
- US-009: Células Madre (Media)
- US-011: Exportar Reportes (Media)

### Sprint 4 (Mejoras UX)
- US-010: Compartir Datos (Baja)
- US-013: Admin Manual (Baja)
- US-014: Actualizaciones Auto (Media)

---

**Total de Historias:** 14  
**Puntos Totales:** 113  
**Sprints Estimados:** 4 (2 semanas cada uno)

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025