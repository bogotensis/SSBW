# Tarea 1: Empezando con Express y Node.js

Introducción al stack del curso: Node.js >= 23, Express, Nunjucks y módulos ES6. El objetivo es entender la configuración base antes de construir la aplicación.

## ✅ Checklist

- [x] Node.js >= 23 instalado (watch mode, --env-file, TypeScript nativo)
- [x] Proyecto inicializado con `npm init` y `type: "module"`
- [x] Express y Nunjucks instalados
- [x] Tipos instalados (`@types/express`, `@types/nunjucks`, `@types/node`)
- [x] `chokidar` instalado para recarga automática de plantillas
- [x] Script `dev` configurado en `package.json`
- [x] Uso de `import` en lugar de `require()` (ES6 modules)

## 🚀 Instalación

```bash
npm init                  # poner type="module"
npm i express nunjucks
npm i -D chokidar @types/express @types/nunjucks @types/node
```

En `package.json`:
```json
"scripts": {
  "dev": "node --watch --env-file=.env index.ts"
}
```

```bash
npm run dev
```

## 📁 Estructura

```
Tarea1/
├── index.ts        # Servidor
├── .env            # Variables de entorno
├── Makefile        # Órdenes repetitivas
└── package.json
```

## 📝 Observaciones

- Node 23 permite ejecutar TypeScript nativamente sin transpiladores adicionales.
- `--watch` reinicia el servidor automáticamente al detectar cambios en `.ts`.
- `--env-file=.env` carga variables de entorno sin necesidad de `dotenv`.
- `chokidar` es necesario para que Nunjucks detecte cambios en las plantillas `.njk`.
- Esta tarea es la base conceptual; el código real se desarrolla a partir de Tarea 4.
