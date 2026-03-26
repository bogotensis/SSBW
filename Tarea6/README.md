# Tarea 6: Autenticación

Añade autenticación con JWT en cookies a la MPA de la Tienda Prado. Incluye hashing de contraseñas, pantalla de login y middleware de autenticación.

## ✅ Checklist

- [x] Migración `con_usuario` + `rename_password` aplicadas
- [x] Campo `password` (sin ñ) en modelo `Usuario` para evitar problemas de encoding
- [x] Hashing de contraseñas con bcrypt en el model (métodos `registrar` y `autentifica`)
- [x] Script `registra_usuarios.ts` con usuarios de prueba
- [x] `GET /login` → vista de login
- [x] `POST /login` → verifica credenciales → emite JWT → guarda en cookie `httpOnly`
- [x] `GET /logout` → limpia cookie → redirige a `/`
- [x] Middleware JWT en `index.ts` propaga `usuario` y `admin` a `app.locals`
- [x] Navbar alterna icono de perfil (login) / logout según estado de autenticación
- [x] Vista `login.njk` con mensaje de error en credenciales incorrectas

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

### Aplicar migración y generar cliente

```bash
npx prisma migrate dev --name con_usuario
npx prisma generate
```

### Registrar usuarios de prueba

```bash
node --env-file=.env registra_usuarios.ts
```

Usuarios creados:
| Email | Password | Admin |
|-------|----------|-------|
| admin@prado.es | admin123 | ✅ |
| usuario@prado.es | user123 | ❌ |

### Arrancar el servidor

```bash
npm run dev
```

Abre http://localhost:3000

## 📁 Estructura

```
Tarea6/
├── prisma/
│   ├── schema.prisma         # Modelos Producto + Usuario
│   └── prisma.client.ts      # Cliente con métodos registrar/autentifica
├── generated/prisma/         # Cliente generado (no editar)
├── routes/
│   ├── productos.ts          # Rutas tienda + carrito
│   └── usuarios.ts           # Rutas login/logout
├── views/
│   ├── base.njk              # Navbar con login/logout condicional
│   ├── portada.njk
│   ├── detalle.njk
│   └── login.njk             # Formulario de autenticación
├── logs/
├── imagenes -> ../Tarea2/imagenes
├── logger.ts
├── session.d.ts
├── registra_usuarios.ts      # Script de usuarios de prueba
├── docker-compose.yml
├── .env
├── index.ts
└── package.json
```

## 🔗 Rutas disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Portada |
| GET | `/producto/:id` | Detalle |
| GET | `/buscar?busqueda=...` | Búsqueda |
| POST | `/al-carrito/:id` | Añadir al carrito |
| GET | `/login` | Pantalla de login |
| POST | `/login` | Procesar credenciales |
| GET | `/logout` | Cerrar sesión |

## 📝 Observaciones

- Las passwords se hashean con bcrypt (salt rounds: 10) antes de guardarse en la BD.
- El JWT se guarda en cookie `httpOnly` — no accesible desde JavaScript del navegador.
- `SECRET_KEY` debe configurarse en `.env` para producción.
- `app.locals.usuario` y `app.locals.admin` están disponibles en todas las plantillas Nunjucks.
- El drawer del carrito queda pendiente para una tarea posterior.
