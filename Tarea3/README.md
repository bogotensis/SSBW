# Tarea 3: Base de Datos con ORM Prisma y PostgreSQL

Configuración de una base de datos PostgreSQL en Docker y uso del ORM Prisma 7 para definir el esquema, migraciones y poblar la BD con los datos obtenidos en Tarea 2.

## ✅ Checklist

- [x] PostgreSQL corriendo en Docker con imagen alpine
- [x] Credenciales gestionadas con variables de entorno en `.env`
- [x] Prisma 7 instalado con adaptador `@prisma/adapter-pg`
- [x] Modelo `Producto` definido en `prisma/schema.prisma`
- [x] `fullTextSearchPostgres` activado como preview feature
- [x] Migración `esquema_inicial` generada y aplicada
- [x] Cliente Prisma generado en `generated/prisma/`
- [x] `prisma/prisma.client.ts` configurado con `PrismaPg` adapter
- [x] Script `seed.ts` que lee `productos.json` e inserta en la BD

## 🚀 Instalación y ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar `.env`

```bash
POSTGRES_USER=yo
POSTGRES_PASSWORD=una_clave_muy_segura_123
POSTGRES_DB=ssbw
DATABASE_URL="postgresql://yo:una_clave_muy_segura_123@localhost:5432/ssbw?schema=public"
```

### 3. Iniciar PostgreSQL

```bash
docker compose up -d
```

### 4. Aplicar migración y generar cliente

```bash
npx prisma migrate dev --name esquema_inicial
npx prisma generate
```

### 5. Poblar la BD

```bash
npm run seed
```

### 6. (Opcional) Inspeccionar datos

```bash
npx prisma studio   # abre http://localhost:5555
```

## 📁 Estructura

```
Tarea3/
├── prisma/
│   ├── schema.prisma         # Modelo de datos
│   ├── prisma.client.ts      # Configuración del cliente
│   └── migrations/           # Historial de migraciones
├── generated/prisma/         # Cliente generado (no editar)
├── docker-compose.yml        # PostgreSQL en Docker
├── .env                      # Variables de entorno
├── productos.json            # Datos fuente (de Tarea 2)
├── seed.ts                   # Script de carga inicial
└── package.json
```

## 🛑 Detener la BD

```bash
docker compose down       # detiene el contenedor
docker compose down -v    # detiene y elimina los datos
```

## 📝 Observaciones

- Prisma 7 introduce cambios respecto a v6; seguir la guía [Getting Started with Prisma 7](https://medium.com/@faresahmednabih/getting-started-with-prisma-7-with-nodejs-postgresql-1bb4de3c8336).
- El campo `precio` se extrae de `texto_precio` con: `Number(texto_precio.slice(0, -2).replace(/,/, '.'))`
- La carpeta `generated/` y el archivo `.env` están en `.gitignore` y no se suben al repositorio.
- El volumen Docker persiste los datos entre reinicios; usar `-v` solo para empezar desde cero.
- La BD de esta tarea es compartida y reutilizada por Tarea 4 en adelante.
