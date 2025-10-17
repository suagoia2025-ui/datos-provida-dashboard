# Datos Provida Frontend

Frontend del dashboard construido con Next.js 14 (App Router), TypeScript y Tailwind CSS.

## Requisitos
- Node.js >= 18.18

## Configuración
1. Copia `.env.example` a `.env.local` y ajusta variables:
   - `NEXT_PUBLIC_API_BASE_URL`
2. Instala dependencias:



3. Ejecuta en desarrollo:



4. Compila y ejecuta producción:



## Scripts
- dev: desarrollo
- build: construir
- start: iniciar producción
- lint: linting con ESLint
- type-check: verificación de tipos

## Estructura
- app/: App Router (layout.tsx, page.tsx)
- components/ui/: componentes base (Button, Card, Input)
- services/: cliente Axios
- styles/: Tailwind y estilos globales
- types/: tipos compartidos
