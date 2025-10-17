# Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto Datos Pro-Vida Dashboard! 🎉

Esta guía te ayudará a entender cómo puedes contribuir efectivamente.

---

## 📋 Tabla de Contenidos

1. [Código de Conducta](#código-de-conducta)
2. [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
3. [Configuración del Entorno](#configuración-del-entorno)
4. [Flujo de Trabajo Git](#flujo-de-trabajo-git)
5. [Estándares de Código](#estándares-de-código)
6. [Proceso de Pull Request](#proceso-de-pull-request)
7. [Reportar Bugs](#reportar-bugs)
8. [Sugerir Features](#sugerir-features)
9. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 📜 Código de Conducta

### Nuestro Compromiso

Este proyecto está comprometido con proveer un ambiente acogedor y libre de acoso para todos, independientemente de:

- Edad
- Tamaño corporal
- Discapacidad
- Etnia
- Identidad y expresión de género
- Nivel de experiencia
- Nacionalidad
- Apariencia personal
- Raza
- Religión
- Identidad y orientación sexual

### Comportamiento Esperado

- Usar lenguaje acogedor e inclusivo
- Ser respetuoso de diferentes puntos de vista
- Aceptar críticas constructivas con gracia
- Enfocarse en lo mejor para la comunidad
- Mostrar empatía hacia otros miembros

### Comportamiento Inaceptable

- Uso de lenguaje o imágenes sexualizadas
- Trolling, comentarios insultantes/despectivos
- Acoso público o privado
- Publicar información privada de otros
- Conducta no profesional

### Aplicación

Instancias de comportamiento abusivo pueden ser reportadas a [email del proyecto]. Todas las quejas serán revisadas e investigadas.

---

## 🤝 ¿Cómo Puedo Contribuir?

### 1. Reportar Bugs

¿Encontraste un bug? Ayúdanos creando un issue detallado:

- Usa el template de bug report
- Incluye pasos para reproducir
- Describe el comportamiento esperado vs actual
- Agrega screenshots si es posible
- Especifica tu entorno (OS, navegador, versión)

### 2. Sugerir Features

¿Tienes una idea para mejorar el proyecto?

- Revisa primero si ya existe un issue similar
- Usa el template de feature request
- Describe claramente el problema que resuelve
- Explica la solución propuesta
- Considera alternativas

### 3. Contribuir Código

- Arreglar bugs reportados
- Implementar features aprobados
- Mejorar documentación
- Agregar tests
- Optimizar performance
- Refactorizar código

### 4. Mejorar Documentación

- Corregir typos
- Aclarar instrucciones confusas
- Agregar ejemplos
- Traducir a otros idiomas
- Actualizar docs desactualizados

### 5. Integrar Nuevas Fuentes de Datos

- Investigar APIs públicas confiables
- Proponer nuevas fuentes
- Implementar integraciones
- Documentar fuentes agregadas

---

## 💻 Configuración del Entorno

### Prerrequisitos

```bash
# Versiones requeridas
node --version  # v18.0.0 o superior
npm --version   # v9.0.0 o superior
docker --version # v20.0.0 o superior
git --version   # v2.30.0 o superior
```

### Fork y Clone

```bash
# 1. Hacer fork del repositorio en GitHub
# (Click en el botón "Fork")

# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/datos-provida-dashboard.git
cd datos-provida-dashboard

# 3. Agregar upstream remote
git remote add upstream https://github.com/PROYECTO-ORIGINAL/datos-provida-dashboard.git

# 4. Verificar remotes
git remote -v
```

### Instalación

```bash
# Instalar dependencias del frontend
cd frontend
npm install

# Instalar dependencias del backend
cd ../backend
npm install

# Levantar servicios con Docker
cd ..
docker-compose up -d

# Ejecutar migraciones
cd backend
npm run migrate:dev

# Ejecutar seeds (opcional)
npm run seed
```

### Verificar Instalación

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Abrir en navegador: http://localhost:3000
```

---

## 🔄 Flujo de Trabajo Git

### Branches

Usamos el modelo Git Flow simplificado:

- **main**: Código en producción
- **develop**: Desarrollo activo
- **feature/nombre-feature**: Nuevas funcionalidades
- **fix/nombre-bug**: Corrección de bugs
- **docs/nombre-doc**: Cambios en documentación
- **refactor/nombre**: Refactorización de código
- **test/nombre**: Agregar o mejorar tests

### Crear una Branch

```bash
# Asegurarte de estar actualizado
git checkout develop
git pull upstream develop

# Crear nueva branch
git checkout -b feature/nueva-funcionalidad

# O para un fix
git checkout -b fix/corregir-bug
```

### Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

**Formato:**
```
<tipo>(<scope>): <descripción corta>

[cuerpo opcional]

[footer opcional]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, punto y coma faltantes, etc.
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de performance

**Ejemplos:**

```bash
# Feature
git commit -m "feat(indicators): agregar endpoint de búsqueda"

# Fix
git commit -m "fix(dashboard): corregir error en gráfico de líneas"

# Docs
git commit -m "docs(readme): actualizar instrucciones de instalación"

# Breaking change
git commit -m "feat(api)!: cambiar formato de respuesta de /indicators

BREAKING CHANGE: El campo 'data' ahora retorna un array en lugar de objeto"
```

### Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Ir a GitHub y crear Pull Request desde tu branch hacia develop
```

---

## 📏 Estándares de Código

### TypeScript

```typescript
// ✅ Bien
interface User {
  id: string
  name: string
  email: string
}

const getUser = async (id: string): Promise<User> => {
  // implementación
}

// ❌ Mal
const getUser = async (id) => {
  // sin types
}
```

### Naming Conventions

```typescript
// Variables y funciones: camelCase
const userName = 'John'
const fetchUserData = () => {}

// Clases e Interfaces: PascalCase
class UserService {}
interface UserProfile {}

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3
const API_BASE_URL = 'https://api.example.com'

// Archivos: kebab-case
// user-service.ts
// fetch-data-points.ts
```

### Estructura de Archivos

```typescript
// 1. Imports externos
import { useState, useEffect } from 'react'
import axios from 'axios'

// 2. Imports internos
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/utils/date'

// 3. Types e Interfaces
interface Props {
  title: string
}

// 4. Constantes
const DEFAULT_LIMIT = 20

// 5. Componente/Función principal
export const MyComponent = ({ title }: Props) => {
  // implementación
}

// 6. Helpers (si son pequeños)
const helperFunction = () => {}
```

### Comentarios

```typescript
// ✅ Buenos comentarios
/**
 * Calcula la tasa de cambio anual entre dos valores
 * @param current - Valor actual
 * @param previous - Valor anterior
 * @returns Porcentaje de cambio
 */
const calculateYearlyChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100
}

// ❌ Malos comentarios
// incrementa i
i++

// obtiene usuarios
const getUsers = () => {}
```

### Error Handling

```typescript
// ✅ Bien - Manejo específico de errores
try {
  const data = await fetchData()
  return data
} catch (error) {
  if (error instanceof ValidationError) {
    logger.warn('Validation failed', { error })
    throw new BadRequestError(error.message)
  }
  
  if (error instanceof NetworkError) {
    logger.error('Network error', { error })
    throw new ServiceUnavailableError('External API unavailable')
  }
  
  logger.error('Unexpected error', { error })
  throw new InternalServerError('An unexpected error occurred')
}

// ❌ Mal - Catch genérico sin manejo
try {
  const data = await fetchData()
} catch (error) {
  console.log(error)
}
```

---

## 📝 Proceso de Pull Request

### Checklist Pre-PR

Antes de crear un PR, verifica:

- [ ] El código sigue los estándares del proyecto
- [ ] Todos los tests pasan (`npm test`)
- [ ] Linter pasa sin errores (`npm run lint`)
- [ ] Type check pasa (`npm run type-check`)
- [ ] Build funciona (`npm run build`)
- [ ] Commits siguen Conventional Commits
- [ ] Branch está actualizada con develop
- [ ] Documentación actualizada si es necesario
- [ ] Tests agregados para nueva funcionalidad

### Crear Pull Request

1. **Título descriptivo siguiendo Conventional Commits:**
   ```
   feat(dashboard): agregar filtro de fecha en gráficos
   fix(api): corregir error 500 en endpoint de comparación
   docs(readme): actualizar instrucciones de deployment
   ```

2. **Descripción completa usando el template:**

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de cambio
- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causa que funcionalidad existente cambie)
- [ ] Documentación

## ¿Cómo ha sido probado?
Describe las pruebas realizadas:
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Tests manuales

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado áreas complejas
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado tests que prueban mi fix/feature
- [ ] Todos los tests pasan localmente
- [ ] He actualizado CHANGELOG.md

## Screenshots (si aplica)
Agregar capturas de pantalla de cambios visuales.

## Issues relacionados
Fixes #123
Related to #456
```

### Proceso de Review

1. **Asignación automática**: GitHub asignará reviewers automáticamente
2. **Review de código**: Al menos 1 aprobación requerida
3. **CI/CD checks**: Todos los checks deben pasar
4. **Discusión**: Responder a comentarios y hacer cambios solicitados
5. **Merge**: Después de aprobación, un maintainer hará merge

### Responder a Comentarios

```markdown
# ✅ Buena respuesta
Gracias por el feedback. Tienes razón, refactoricé esa función para mejorar la legibilidad.
Commit: abc123

# ❌ Mala respuesta
No, está bien así.
```

---

## 🐛 Reportar Bugs

### Template de Bug Report

```markdown
**Describe el bug**
Descripción clara y concisa del bug.

**Para Reproducir**
Pasos para reproducir el comportamiento:
1. Ve a '...'
2. Click en '....'
3. Scroll down a '....'
4. Ver error

**Comportamiento Esperado**
Descripción clara de lo que esperabas que sucediera.

**Screenshots**
Si aplica, agrega screenshots para explicar el problema.

**Entorno:**
- OS: [e.g. Windows 11, macOS 14]
- Navegador: [e.g. Chrome 118, Firefox 119]
- Versión del proyecto: [e.g. 1.0.0]
- Node version: [e.g. 18.17.0]

**Contexto Adicional**
Cualquier otra información relevante sobre el problema.

**Logs**
```
Pegar logs relevantes aquí
```
```

### Prioridad de Bugs

Los maintainers etiquetarán los bugs según prioridad:

- 🔴 **Critical**: Bloquea funcionalidad principal, afecta a todos los usuarios
- 🟠 **High**: Funcionalidad importante afectada, workaround difícil
- 🟡 **Medium**: Funcionalidad afectada, existe workaround razonable
- 🟢 **Low**: Problema menor, no afecta funcionalidad principal

---

## 💡 Sugerir Features

### Template de Feature Request

```markdown
**¿Tu feature request está relacionado a un problema?**
Descripción clara del problema. Ej: Siempre me frustra cuando [...]

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que suceda.

**Describe alternativas que has considerado**
Descripción de soluciones o features alternativas.

**Contexto Adicional**
Cualquier otro contexto, screenshots o ejemplos.

**Mockups/Diseños (opcional)**
Si tienes diseños o mockups, compártelos aquí.
```

### Proceso de Aprobación de Features

1. **Propuesta**: Crear issue con template de feature request
2. **Discusión**: La comunidad discute viabilidad y detalles
3. **Aprobación**: Maintainers aprueban o rechazan con justificación
4. **Asignación**: Se etiqueta como "good first issue" si es apropiado
5. **Implementación**: Alguien puede tomar la tarea

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con coverage
npm test -- --coverage

# Test específico
npm test -- user.service.test.ts
```

### Escribir Tests

```typescript
// ✅ Buen test
describe('IndicatorsService', () => {
  describe('getAll', () => {
    it('should return all indicators when no filter provided', async () => {
      // Arrange
      const mockIndicators = [
        { id: '1', name: 'Indicator 1' },
        { id: '2', name: 'Indicator 2' }
      ]
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockIndicators)
      
      // Act
      const result = await service.getAll()
      
      // Assert
      expect(result).toEqual(mockIndicators)
      expect(repository.findAll).toHaveBeenCalledTimes(1)
    })
    
    it('should throw NotFoundError when no indicators exist', async () => {
      // Arrange
      jest.spyOn(repository, 'findAll').mockResolvedValue([])
      
      // Act & Assert
      await expect(service.getAll()).rejects.toThrow(NotFoundError)
    })
  })
})

// ❌ Mal test
it('works', () => {
  const result = doSomething()
  expect(result).toBeTruthy()
})
```

### Coverage Mínimo

- **Statements**: 70%
- **Branches**: 65%
- **Functions**: 70%
- **Lines**: 70%

---

## 📚 Documentación

### Actualizar Docs

Si tu cambio afecta:

- **API**: Actualizar `API_DOCUMENTATION.md`
- **Configuración**: Actualizar `README.md`
- **Deployment**: Actualizar `DEPLOYMENT.md`
- **Base de datos**: Actualizar `DATA_MODEL.md`
- **Prompts**: Actualizar `CURSOR_PROMPTS.md`

### JSDoc en Funciones Públicas

```typescript
/**
 * Calcula estadísticas descriptivas de un conjunto de datos
 * @param data - Array de números a analizar
 * @param options - Opciones de cálculo
 * @param options.includeOutliers - Si incluir outliers en el cálculo
 * @returns Objeto con estadísticas calculadas
 * @throws {ValidationError} Si el array está vacío
 * @example
 * const stats = calculateStats([1, 2, 3, 4, 5])
 * // { mean: 3, median: 3, mode: null, stdDev: 1.41 }
 */
export function calculateStats(
  data: number[],
  options?: { includeOutliers?: boolean }
): Statistics {
  // implementación
}
```

---

## 🎨 Estilo de Código

### Linter

Usamos ESLint con configuración estricta:

```bash
# Ejecutar linter
npm run lint

# Fix automático
npm run lint:fix
```

### Prettier

Formateador de código configurado:

```bash
# Formatear código
npm run format

# Check formato
npm run format:check
```

### Configuración de Editor

**VS Code** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 🔍 Code Review Guidelines

### Para Reviewers

**DO:**
- ✅ Ser constructivo y educado
- ✅ Explicar el "por qué" de tus sugerencias
- ✅ Distinguir entre "debe cambiar" y "sugerencia"
- ✅ Aprobar cuando esté listo
- ✅ Hacer preguntas si algo no está claro

**DON'T:**
- ❌ Ser condescendiente
- ❌ Nitpicking excesivo
- ❌ Bloquear sin razón válida
- ❌ Pedir cambios sin explicación

**Ejemplo de buen comentario:**
```
Sugiero extraer esta lógica a una función separada para mejorar 
la testabilidad y reutilización. Algo como:

```typescript
const validateUserInput = (input: UserInput): ValidationResult => {
  // lógica aquí
}
```

¿Qué opinas?
```

### Para Autores

- Responde a todos los comentarios
- No tomes críticas personalmente
- Agradece el tiempo del reviewer
- Haz los cambios solicitados o discute alternativas
- Re-solicita review después de cambios

---

## 🏷️ Labels del Proyecto

| Label | Descripción |
|-------|-------------|
| `bug` | Algo no funciona correctamente |
| `enhancement` | Nueva feature o request |
| `documentation` | Mejoras en documentación |
| `good first issue` | Bueno para newcomers |
| `help wanted` | Se necesita ayuda extra |
| `question` | Pregunta o necesita información |
| `wontfix` | No se trabajará en esto |
| `duplicate` | Issue o PR duplicado |
| `priority: high` | Alta prioridad |
| `priority: medium` | Prioridad media |
| `priority: low` | Baja prioridad |
| `frontend` | Relacionado al frontend |
| `backend` | Relacionado al backend |
| `database` | Relacionado a la BD |
| `api` | Relacionado a la API |

---

## 🎯 Good First Issues

¿Primera vez contribuyendo? Busca issues con el label `good first issue`:

**Ejemplos típicos:**
- Corregir typos en documentación
- Agregar tests faltantes
- Mejorar mensajes de error
- Agregar validaciones simples
- Actualizar dependencias
- Traducir docs

**Cómo empezar:**
1. Comenta en el issue que quieres trabajar en él
2. Un maintainer te lo asignará
3. Pregunta si tienes dudas
4. Trabaja en tu solución
5. Crea el PR

---

## ❓ Preguntas Frecuentes

### ¿Cuánto tiempo tarda en revisarse un PR?

Típicamente 2-5 días hábiles. PRs pequeños se revisan más rápido.

### ¿Puedo trabajar en múltiples issues a la vez?

Sí, pero recomendamos enfocarse en uno o dos para no dispersarse.

### Mi PR fue rechazado, ¿qué hago?

Lee los comentarios cuidadosamente, pregunta si algo no está claro, y considera hacer los cambios sugeridos.

### ¿Necesito ser experto para contribuir?

¡No! Todos empezamos en algún lugar. Los `good first issues` son perfectos para comenzar.

### ¿Puedo contribuir sin saber programar?

¡Sí! Puedes ayudar con:
- Documentación
- Diseño
- Reportar bugs
- Sugerir features
- Traducciones
- Pruebas de usuario

### ¿Hay reuniones del proyecto?

Actualmente no hay reuniones regulares, pero se anunciarán en los issues si se programan.

### ¿Cómo me convierto en maintainer?

Los maintainers son seleccionados basándose en:
- Contribuciones consistentes
- Conocimiento del proyecto
- Habilidades de code review
- Participación en la comunidad

---

## 📞 Contacto

- **Issues de GitHub**: Para bugs y features
- **Discussions**: Para preguntas generales
- **Email**: contacto@datosprovidadashboard.com
- **Twitter**: @DatosProVida (si aplica)

---

## 🙏 Agradecimientos

Gracias a todos los que han contribuido al proyecto:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Se actualizará automáticamente con all-contributors -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📖 Recursos Adicionales

- [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Best Practices](https://react.dev/learn)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**¡Esperamos tus contribuciones! 🚀**

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025