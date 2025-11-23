FROM node:18-alpine AS base

# Crear directorio de trabajo
WORKDIR /app

# ========================================
# Dependencies stage
# ========================================
FROM base AS dependencies

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# ========================================
# Development stage
# ========================================
FROM base AS development

# Copiar dependencias instaladas
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package*.json ./

# Copiar archivos de configuración
COPY tsconfig.json ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto (se sobrescribe en docker-compose)
CMD ["npm", "run", "dev"]

