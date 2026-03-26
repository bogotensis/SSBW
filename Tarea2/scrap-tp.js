import { chromium } from "playwright";
import fs from "fs";
import https from "https";
import path from "path";

const nombre_archivo_desde = (título) => título.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';

const descargarImagen = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const urlCodificada = url.split('/').map((part, i) => i < 3 ? part : encodeURIComponent(decodeURIComponent(part))).join('/');
    https.get(urlCodificada, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
});

const page = await context.newPage();

try {
  await page.goto('https://tiendaprado.com/es/385-impresiones?resultsPerPage=999', { timeout: 30000 });
} catch (error) {
  console.error(error);
  process.exit(1);
}

page.once('load', () => console.log('Página cargada'));
await page.waitForTimeout(3000);

// Crear carpeta de imágenes
if (!fs.existsSync('./imagenes')) {
  fs.mkdirSync('./imagenes');
}

const productos = [];
const locators_productos = page.locator('article.product-miniature');
const count = await locators_productos.count();
console.log(`Encontrados ${count} productos`);

for (const loc of await locators_productos.all()) {
  try {
    const título = await loc.locator('h2.product-title a').textContent({ timeout: 5000 });
    const descripción = await loc.locator('.product-description-short').textContent({ timeout: 5000 });
    const texto_precio = await loc.locator('.product-price').textContent({ timeout: 5000 });
    const imagen_url = await loc.locator('.thumbnail img').first().getAttribute('src', { timeout: 5000 });
    
    const nombre_imagen = nombre_archivo_desde(título.trim());
    
    productos.push({
      título: título.trim(),
      descripción: descripción.trim(),
      texto_precio: texto_precio.trim(),
      imagen: nombre_imagen
    });
    
    // Descargar imagen
    try {
      await descargarImagen(imagen_url, path.join('./imagenes', nombre_imagen));
      console.log(`✓ ${nombre_imagen}`);
    } catch (error) {
      console.error(`✗ Error descargando ${nombre_imagen}:`, error.message);
    }
  } catch (error) {
    console.error('Error procesando producto:', error.message);
  }
}

// Guardar JSON
fs.writeFileSync('./productos.json', JSON.stringify(productos, null, 2));
console.log(`\n✓ Total productos: ${productos.length}`);
console.log('✓ Archivo productos.json creado');

await browser.close();
