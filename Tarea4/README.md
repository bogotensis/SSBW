# Tarea 4: Portada, búsquedas y páginas de detalle

MPA (Multiple Page Application) con patrón MVC usando Express, Nunjucks y Prisma. Incluye portada con grid de productos, búsqueda full-text y página de detalle por producto.

## ✅ Checklist

- [x] Estructura MVC: `prisma/` (Model), `routes/` (Controller), `views/` (View)
- [x] `GET /` → portada con grid de cards (sin descripción)
- [x] `GET /producto/:id` → página de detalle completa
- [x] `GET /buscar?busqueda=...` → búsqueda por título y descripción (insensitive)
- [x] Imágenes servidas estáticamente en `/public/imagenes` (symlink a `Tarea2/imagenes/`)
- [x] Herencia de plantillas Nunjucks con `base.njk`
- [x] Diseño con Bootstrap 5 y tipografía serif estilo museo
- [x] Navbar con logo, buscador e icono de bolsa
- [x] Menú secundario de categorías
- [x] `node --watch --env-file=.env` para desarrollo

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
Tarea4/
├── prisma/
│   ├── schema.prisma         # Modelo de datos
│   └── prisma.client.ts      # Configuración del cliente
├── generated/prisma/         # Cliente generado (no editar)
├── routes/
│   └── productos.ts          # Controladores de rutas
├── views/
│   ├── base.njk              # Plantilla base (navbar, footer)
│   ├── portada.njk           # Grid de productos
│   └── detalle.njk           # Detalle de producto
├── imagenes -> ../Tarea2/imagenes   # Symlink
├── docker-compose.yml        # PostgreSQL (compartido con Tarea3)
├── .env                      # Variables de entorno
├── index.ts                  # Servidor Express
└── package.json
```

## 🔗 Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `GET /` | Portada con todos los productos |
| `GET /producto/:id` | Detalle de un producto |
| `GET /buscar?busqueda=lámina` | Búsqueda por título o descripción |

## 📝 Observaciones

- Las imágenes se sirven desde un symlink a `Tarea2/imagenes/`; asegurarse de que existe antes de arrancar.
- La BD es la misma instancia Docker de Tarea3; debe estar corriendo antes de `npm run dev`.
- El botón "AÑADIR A LA CESTA" está presente en el detalle pero sin funcionalidad — el carrito se implementa en Tarea 5.
- La búsqueda usa `contains` con `mode: 'insensitive'` de Prisma; para búsqueda full-text indexada activar `fullTextSearchPostgres` en el schema.
- `generated/` y `.env` están en `.gitignore` y no se suben al repositorio.
