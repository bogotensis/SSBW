# Tarea 3: Base de Datos con ORM Prisma y PostgreSQL

Este proyecto configura una base de datos PostgreSQL usando Docker y el ORM Prisma para gestionar productos.

## 📋 Requisitos Previos

- Node.js instalado (versión 18 o superior)
- Docker y Docker Compose instalados
- Terminal/línea de comandos

## 🚀 Pasos para Ejecutar el Proyecto

### 1. Instalar las dependencias de Node.js

```bash
npm install
```

Este comando instala todas las librerías necesarias definidas en `package.json`:
- `prisma`: herramienta ORM para gestionar la base de datos
- `@prisma/client`: cliente para interactuar con la BD desde código
- `@prisma/adapter-pg`: adaptador para PostgreSQL
- `dotenv`: para cargar variables de entorno
- `tsx`: para ejecutar archivos TypeScript

### 2. Iniciar la base de datos PostgreSQL con Docker

```bash
docker compose up -d
```

Este comando:
- Lee el archivo `docker-compose.yml`
- Descarga la imagen de PostgreSQL (si no la tienes)
- Crea y arranca el contenedor con PostgreSQL
- La opción `-d` lo ejecuta en segundo plano (detached)

Para verificar que está corriendo:
```bash
docker ps
```

Deberías ver un contenedor llamado `postgres_ssbw` en estado "Up".

### 3. Crear las tablas en la base de datos (migración)

```bash
npx prisma migrate dev --name esquema_inicial
```

Este comando:
- Lee el archivo `prisma/schema.prisma`
- Crea las tablas en PostgreSQL según el modelo definido
- Guarda la migración en `prisma/migrations/`
- El nombre "esquema_inicial" identifica esta migración

### 4. Generar el cliente Prisma

```bash
npx prisma generate
```

Este comando:
- Genera código TypeScript en `generated/prisma/`
- Este código nos permite interactuar con la BD de forma tipada
- Se basa en el modelo definido en `schema.prisma`

### 5. Poblar la base de datos con productos

```bash
npm run seed
```

Este comando:
- Ejecuta el archivo `seed.ts`
- Lee los productos de `productos.json`
- Los inserta en la tabla Producto de la BD
- Muestra ejemplos de consultas

### 6. (Opcional) Ver los datos con Prisma Studio

```bash
npx prisma studio
```

Este comando:
- Abre una interfaz web en http://localhost:5555
- Permite ver y editar los datos de la BD visualmente
- Muy útil para desarrollo y debugging

## 🛑 Detener el Proyecto

Para detener la base de datos:

```bash
docker compose down
```

Para detener Y eliminar los datos:

```bash
docker compose down -v
```

⚠️ La opción `-v` elimina el volumen con todos los datos. Úsala solo si quieres empezar desde cero.

## 📁 Estructura del Proyecto

```
Tarea3/
├── .env                      # Variables de entorno (contraseñas, URLs)
├── .gitignore               # Archivos que Git debe ignorar
├── docker-compose.yml       # Configuración de Docker para PostgreSQL
├── package.json             # Dependencias del proyecto
├── productos.json           # Datos de productos a cargar
├── seed.ts                  # Script para poblar la BD
├── prisma/
│   ├── schema.prisma        # Modelo de datos (estructura de tablas)
│   ├── prisma.client.ts     # Configuración del cliente Prisma
│   └── migrations/          # Historial de cambios en la BD
└── generated/               # Código generado por Prisma (no editar)
```

## 🔍 Comandos Útiles

### Ver logs de PostgreSQL
```bash
docker compose logs -f db
```

### Conectarse a PostgreSQL directamente
```bash
docker exec -it postgres_ssbw psql -U yo -d ssbw
```

### Resetear la base de datos
```bash
npx prisma migrate reset
```

### Ver el estado de las migraciones
```bash
npx prisma migrate status
```

## ❓ Solución de Problemas

### Error: "Can't reach database server"
- Verifica que Docker esté corriendo: `docker ps`
- Verifica que el puerto 5432 no esté ocupado: `lsof -i :5432`

### Error: "Environment variable not found: DATABASE_URL"
- Verifica que el archivo `.env` existe
- Verifica que contiene la línea `DATABASE_URL=...`

### Error al ejecutar seed.ts
- Asegúrate de haber ejecutado `npx prisma migrate dev` primero
- Asegúrate de haber ejecutado `npx prisma generate`

## 📚 Referencias

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
