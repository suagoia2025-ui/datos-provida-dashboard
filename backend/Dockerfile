FROM node:18-alpine AS base

# Instalar dependencias del sistema
RUN apk add --no-cache openssl

# Crear directorio de trabajo
WORKDIR /app

# ========================================
# Dependencies stage
# ========================================
FROM base AS dependencies

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Generar Prisma Client
RUN npx prisma generate

# ========================================
# Development stage
# ========================================
FROM base AS development

# Copiar dependencias instaladas
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package*.json ./
COPY --from=dependencies /app/prisma ./prisma

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 4000

# Comando por defecto (se sobrescribe en docker-compose)
CMD ["npm", "run", "dev"]
