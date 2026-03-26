import { writeFileSync } from 'node:fs'
import productos from '../productos.json' with { type: 'json' }

type ProductoEntrada = {
  título: string
  descripción: string
  texto_precio: string
  imagen: string
}

const BASE_IRI = 'http://example.org/ssbw#'
const IMAGEN_BASE = 'https://tienda.museodelprado.es/imagenes/'

const prefijos = `@prefix ex: <${BASE_IRI}> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix schema: <https://schema.org/> .
\n`

function normalizarPrecio(textoPrecio: string): string {
  const limpio = textoPrecio.replace(/[^\d,.-]/g, '').replace(',', '.')
  const numero = Number(limpio)

  if (Number.isNaN(numero)) {
    throw new Error(`No se pudo parsear el precio: ${textoPrecio}`)
  }

  return numero.toFixed(2)
}

function escaparLiteral(valor: string): string {
  return valor
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
}

function slugCategoria(titulo: string): { slug: string; etiqueta: string } {
  const primerToken = titulo.trim().split(/\s+/)[0] ?? 'General'
  const etiqueta = primerToken.replace(/^"+|"+$/g, '')
  const slug = etiqueta
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase() || 'general'

  return { slug, etiqueta }
}

const lineas: string[] = []
const categorias = new Map<string, string>()

for (const [index, producto] of (productos as ProductoEntrada[]).entries()) {
  const id = String(index + 1).padStart(3, '0')
  const sujeto = `ex:producto-${id}`
  const precio = normalizarPrecio(producto.texto_precio)
  const titulo = escaparLiteral(producto.título)
  const descripcion = escaparLiteral(producto.descripción)
  const imagen = escaparLiteral(IMAGEN_BASE + producto.imagen)
  const { slug, etiqueta } = slugCategoria(producto.título)

  categorias.set(slug, etiqueta)

  lineas.push(`${sujeto} a ex:Producto ;`)
  lineas.push(`  schema:name "${titulo}"@es ;`)
  lineas.push(`  ex:descripcion "${descripcion}"@es ;`)
  lineas.push(`  ex:precio "${precio}"^^xsd:decimal ;`)
  lineas.push(`  schema:priceCurrency "EUR" ;`)
  lineas.push(`  schema:image "${imagen}"^^xsd:anyURI ;`)
  lineas.push(`  ex:tieneCategoria ex:categoria-${slug} .`)
  lineas.push('')
}

const categoriasTTL: string[] = []
for (const [slug, etiqueta] of categorias.entries()) {
  categoriasTTL.push(`ex:categoria-${slug} a ex:Categoria ;`)
  categoriasTTL.push(`  rdfs:label "${escaparLiteral(etiqueta)}"@es .`)
  categoriasTTL.push('')
}

const contenido = [
  prefijos,
  '# Instancias de categorias',
  ...categoriasTTL,
  '# Instancias de productos',
  ...lineas
].join('\n')

writeFileSync(new URL('./data.ttl', import.meta.url), contenido, 'utf8')
console.log(`Ontologia generada: ${lineas.length / 8} productos y ${categorias.size} categorias -> ontologia/data.ttl`)
