#!/bin/bash

# Script para configurar la base de datos PostgreSQL
# Uso: ./scripts/setup-db.sh

echo "🔧 Configurando base de datos PostgreSQL..."

# Leer credenciales
read -p "Usuario de PostgreSQL (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "Contraseña de PostgreSQL: " DB_PASSWORD
echo ""

read -p "Host (default: localhost): " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "Puerto (default: 5432): " DB_PORT
DB_PORT=${DB_PORT:-5432}

read -p "Nombre de la base de datos (default: provida_db): " DB_NAME
DB_NAME=${DB_NAME:-provida_db}

# Crear base de datos
echo "📦 Creando base de datos '$DB_NAME'..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || echo "Base de datos ya existe o error al crear"

# Actualizar .env
echo "📝 Actualizando .env..."
cat > .env << EOF
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
EOF

echo "✅ Configuración completada!"
echo ""
echo "Ahora puedes ejecutar:"
echo "  1. npx prisma migrate dev --name init"
echo "  2. npm run seed"

