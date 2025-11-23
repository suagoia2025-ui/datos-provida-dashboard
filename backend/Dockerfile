FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache openssl

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias y configuración
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Generar Prisma Client
RUN npx prisma generate

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 4000

# Comando por defecto (se sobrescribe en docker-compose)
CMD ["npm", "run", "dev"]

