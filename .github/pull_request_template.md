## Descripción

<!-- Descripción clara de los cambios realizados -->

## Tipo de Cambio

<!-- Marca las opciones relevantes -->

- [ ] 🐛 Bug fix (cambio que corrige un issue)
- [ ] ✨ Nueva feature (cambio que agrega funcionalidad)
- [ ] 💥 Breaking change (fix o feature que causa que funcionalidad existente cambie)
- [ ] 📝 Documentación
- [ ] 🎨 Cambios de estilo (formato, nombres de variables, etc.)
- [ ] ♻️ Refactorización
- [ ] ⚡ Mejora de performance
- [ ] ✅ Tests

## Issues Relacionados

<!-- Enlaza los issues que este PR resuelve -->

Fixes #(issue)
Relates to #(issue)

## ¿Cómo ha sido probado?

<!-- Describe las pruebas que has realizado -->

- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Tests E2E
- [ ] Tests manuales

**Descripción de tests:**


## Screenshots (si aplica)

<!-- Agrega capturas de pantalla de cambios visuales -->

### Antes


### Después


## Checklist

### General

- [ ] Mi código sigue los estándares de estilo del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado mi código, especialmente en áreas complejas
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevos warnings
- [ ] He actualizado CHANGELOG.md

### Testing

- [ ] He agregado tests que prueban mi fix/feature
- [ ] Todos los tests nuevos y existentes pasan localmente
- [ ] Linter pasa sin errores (`npm run lint`)
- [ ] Type check pasa (`npm run type-check`)
- [ ] Build funciona (`npm run build`)

### Documentación

- [ ] He actualizado README.md (si es necesario)
- [ ] He actualizado API_DOCUMENTATION.md (si cambié endpoints)
- [ ] He actualizado DATA_MODEL.md (si cambié el schema)
- [ ] He agregado JSDoc comments en funciones públicas

### Base de Datos (si aplica)

- [ ] He creado migraciones para cambios de schema
- [ ] He probado las migraciones (up y down)
- [ ] He actualizado seeds si es necesario

### Seguridad

- [ ] No hay secrets hardcodeados
- [ ] He validado inputs del usuario
- [ ] He considerado implicaciones de seguridad

## Notas Adicionales

<!-- Cualquier información adicional que los reviewers deban saber -->


## Deployment Notes

<!-- ¿Hay algo especial que deba hacerse al deployar? -->

- [ ] Requiere ejecutar migraciones
- [ ] Requiere actualizar variables de entorno
- [ ] Requiere rebuild del frontend
- [ ] Requiere limpiar caché
- [ ] Ninguna acción especial requerida

---

**Reviewer Notes:**
<!-- Para uso de los reviewers -->

- Complejidad: <!-- Baja | Media | Alta -->
- Área crítica: <!-- Sí | No -->
- Requiere pruebas adicionales: <!-- Sí | No -->