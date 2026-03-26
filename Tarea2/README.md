# Tarea 2: Web Scraping - Tienda Prado

Web scraping de la Tienda del Museo del Prado para obtener información de productos.

## Instalación

```bash
npm install
npx playwright install chromium
```

## Uso

```bash
npm run scrap
```

## Resultado

- **productos.json**: Archivo JSON con 114 productos (título, descripción, precio, imagen)
- **imagenes/**: Carpeta con 112 imágenes descargadas

## Estructura del JSON

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

## Tecnologías

- **Playwright**: Automatización del navegador
- **Node.js**: Entorno de ejecución
- **Fetch API**: Descarga de imágenes
