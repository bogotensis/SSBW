# Tarea 2: Web Scraping - Tienda Prado

Web scraping de la sección "Impresiones" de la Tienda del Museo del Prado usando Playwright. Genera un `productos.json` y descarga las imágenes en local.

## ✅ Checklist

- [x] Playwright instalado y configurado
- [x] Script `scrap-tp.js` con navegador headless (Chromium)
- [x] User-agent simulando Chrome de escritorio
- [x] Carga de todos los productos con `?resultsPerPage=999`
- [x] Extracción de: título, descripción, texto_precio, imagen
- [x] Nombre de archivo generado desde el título con regex
- [x] Descarga de imágenes en carpeta `imagenes/`
- [x] Resultado guardado en `productos.json` (114 productos, 112 imágenes)

## 🚀 Instalación y ejecución

```bash
npm install
npx playwright install chromium
npm run scrap
```

## 📁 Estructura

```
Tarea2/
├── scrap-tp.js       # Script de scraping
├── productos.json    # Resultado: lista de productos
├── imagenes/         # Imágenes descargadas
└── package.json
```

## 📄 Estructura del JSON generado

```json
[
  {
    "título": "Tako \"El jardín de las delicias\" (construcción rosa)",
    "descripción": "Madera de haya. 20 x 20 cm...",
    "texto_precio": "30,00 €",
    "imagen": "tako__el_jard_n_de_las_delicias___construcci_n_rosa_.jpg"
  }
]
```

## 📝 Observaciones

- Playwright instancia un navegador real, lo que permite esperar a que carguen elementos dinámicos.
- Se añade un retardo entre peticiones para simular comportamiento humano y evitar bloqueos.
- El nombre del archivo de imagen se genera con: `título.replace(/[^a-z0-9]/gi, '_').toLowerCase()`
- `productos.json` e `imagenes/` son reutilizados por las tareas siguientes.
- Playwright también se usará para testing E2E en tareas posteriores.
