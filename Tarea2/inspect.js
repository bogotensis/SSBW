import { chromium } from "playwright";

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
});

const page = await context.newPage();

try {
  await page.goto('https://tiendaprado.com/es/385-impresiones?resultsPerPage=999', { timeout: 30000 });
  await page.waitForTimeout(5000);
  
  // Inspeccionar estructura
  const html = await page.content();
  console.log('Buscando selectores...\n');
  
  // Probar diferentes selectores
  const selectors = [
    'article',
    '.product-miniature',
    '.product',
    '.js-product-miniature',
    '[data-id-product]'
  ];
  
  for (const sel of selectors) {
    const count = await page.locator(sel).count();
    console.log(`${sel}: ${count} elementos`);
  }
  
  // Ver el primer producto
  const primer = page.locator('article').first();
  if (await primer.count() > 0) {
    console.log('\nPrimer artículo HTML:');
    console.log(await primer.innerHTML());
  }
  
} catch (error) {
  console.error(error);
}

await page.waitForTimeout(10000);
await browser.close();
