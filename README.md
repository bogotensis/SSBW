# SSBW — Sistemas de Software Basado en Web

Repositorio de tareas de la asignatura SSBW. El proyecto consiste en construir una versión de la sección [Impresiones](https://tiendaprado.com/es/385-impresiones) de la Tienda del Museo del Prado, evolucionando desde un scraper básico hasta una aplicación web completa con autenticación, API REST y frontend en React.

Seguimos los roadmaps [Full Stack](https://roadmap.sh/full-stack) y [Frontend](https://roadmap.sh/frontend).

---

## 📚 Índice de Tareas

| # | Fecha | Teoría | Tarea | Estado |
|---|-------|--------|-------|--------|
| 1 | 20 Feb | JavaScript ES6, TypeScript | [Tarea 1 — Empezando con Express y Node.js](./Tarea1/) | ✅ |
| 2 | 27 Feb | Web scraping | [Tarea 2 — Web scraping con Playwright](./Tarea2/) | ✅ |
| 3 | 6 Mar | Bases de Datos, ORMs | [Tarea 3 — Base de Datos con Prisma y PostgreSQL](./Tarea3/) | ✅ |
| 4 | 13 Mar | Arquitectura MVC | [Tarea 4 — Portada, búsqueda y páginas de detalle](./Tarea4/) | ✅ |
| 5 | 20 Mar | Logging, Testing, Protocolos | [Tarea 5 — Carrito e incorporación de logger](./Tarea5/) | ✅ |
| 6 | 27 Mar | Autenticación | [Tarea 6 — Autenticación con JWT](./Tarea6/) | ✅ 🏁 Entrega Marzo |
| 7 | 10 Abr | API RESTful | Tarea 7 — API RESTful | 🔜 |
| 8 | 17 Abr | DOM | Tarea 8 — Mejorando UX con DOM | ⏳ |
| 9 | 24 Abr | React | Tarea 9 — SPA con Vite, React, Tailwind y shadcn/ui | ⏳ |
| 10 | 8 May | Más React | Tarea 10 — Controlled Components, useState | ⏳ |
| 11 | 15 May | Renderizado HTML | Tarea 11 — Front con Astro | ⏳ |
| 12 | 22 May | Despliegue | Tarea 12 — Despliegue | ⏳ |

---

## 🗂 Descripción de las Tareas completadas

### [Tarea 1 — Empezando con Express y Node.js](./Tarea1/)
Configuración del stack base: Node.js >= 23 con TypeScript nativo, Express, Nunjucks y módulos ES6. Base conceptual para el resto del proyecto.

### [Tarea 2 — Web Scraping con Playwright](./Tarea2/)
Scraping de la sección Impresiones de la Tienda Prado usando Playwright. Genera `productos.json` con 114 productos y descarga sus imágenes en local.

### [Tarea 3 — Base de Datos con Prisma y PostgreSQL](./Tarea3/)
PostgreSQL en Docker con ORM Prisma 7. Define el esquema de la BD, aplica migraciones y puebla la tabla de productos con los datos del scraping.

### [Tarea 4 — Portada, búsqueda y páginas de detalle](./Tarea4/)
MPA con patrón MVC. Portada con grid de productos, búsqueda por título/descripción y página de detalle. Diseño con Bootstrap 5 y tipografía serif estilo museo.

### [Tarea 5 — Carrito e incorporación de logger](./Tarea5/)
Logger con Winston (consola + archivos). Carrito de compras con `express-session`: añadir productos desde el detalle y badge con el total en el navbar.

### [Tarea 6 — Autenticación con JWT](./Tarea6/)
Autenticación completa: modelo `Usuario` con bcrypt, pantalla de login, JWT en cookie `httpOnly` y middleware que propaga el estado de sesión a todas las vistas.

---

## 🛠 Stack tecnológico

- **Runtime:** Node.js 23 (TypeScript nativo)
- **Framework:** Express 5
- **Plantillas:** Nunjucks
- **ORM:** Prisma 7
- **BD:** PostgreSQL (Docker alpine)
- **CSS:** Bootstrap 5
- **Scraping/Testing:** Playwright
- **Logger:** Winston
- **Auth:** JWT + bcrypt
