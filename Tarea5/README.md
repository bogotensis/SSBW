# Tarea 5: Logger y Carrito

Añade sistema de logging con Winston y funcionalidad de carrito de compras con sesiones a la MPA de la Tienda Prado.

## ✅ Checklist

- [x] Logger con Winston: consola (debug+colores), `logs/info.log` y `logs/error.log`
- [x] Nivel de log configurable via `LOG_LEVEL` en `.env`
- [x] `express-session` configurado en `index.ts`
- [x] Middleware `express.urlencoded` para leer body de formularios
- [x] Formulario `POST /al-carrito/:id` en `detalle.njk` con input `cantidad`
- [x] Ruta `POST /al-carrito/:id` acumula productos en `req.session.carrito`
- [x] Acumulación inteligente: suma cantidad si el producto ya existe en el carrito
- [x] `session.save()` garantiza persistencia antes del redirect
- [x] Middleware global propaga `total_carrito` a todas las vistas via `res.locals`
- [x] Badge rojo en icono de bolsa del navbar con el total de productos

## 🚀 Instalación y ejecución

### Requisitos previos

- Node.js >= 23
- PostgreSQL corriendo (levantar desde `Tarea3/`):

```bash
cd ../Tarea3 && docker compose up -d
```

### Instalar dependencias

```bash
npm install
```

### Arrancar el servidor

```bash
npm run dev
```

Abre http://localhost:3000

## 📁 Estructura

```
Tarea5/
├── prisma/
│   ├── schema.prisma
│   └── prisma.client.ts
├── generated/prisma/         # Cliente generado (no editar)
├── routes/
│   └── productos.ts          # Rutas + lógica del carrito
├── views/
│   ├── base.njk              # Navbar con badge del carrito
│   ├── portada.njk
│   └── detalle.njk           # Formulario añadir al carrito
├── logs/                     # Archivos de log (no se suben a git)
├── imagenes -> ../Tarea2/imagenes
├── logger.ts                 # Configuración Winston
├── session.d.ts              # Tipos TypeScript para la sesión
├── docker-compose.yml
├── .env
├── index.ts
└── package.json
```

## 🔗 Rutas disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Portada con todos los productos |
| GET | `/producto/:id` | Detalle de un producto |
| GET | `/buscar?busqueda=...` | Búsqueda por título o descripción |
| POST | `/al-carrito/:id` | Añadir producto al carrito |

## 📝 Observaciones

- El carrito persiste en sesión del servidor hasta que se cierra el navegador.
- `SESSION_SECRET` puede configurarse en `.env`; si no existe usa un valor por defecto.
- La carpeta `logs/` está en `.gitignore` y no se sube al repositorio.
- El drawer del carrito (panel lateral con los productos comprados) queda pendiente para Tarea 6.
- Winston permite añadir plugins para logs rotativos, agregadores externos, Telegram, etc.
