/// IMPORTACIÓN DEL CLIENTE PRISMA
/// Importamos la instancia de prisma que configuramos en prisma.client.ts
import prisma from "./prisma/prisma.client.ts";

/// CONSULTA: Buscar productos que contengan la palabra "lámina" en la descripción
/// Usando búsqueda de texto (no solo al inicio, sino en cualquier parte)
console.log('=== Productos que contienen "lámina" en la descripción ===')
const productosConLamina = await prisma.producto.findMany({
  /// where con contains busca la palabra en cualquier parte del texto
  where: {
    descripción: {
      contains: 'lámina',
      mode: 'insensitive'
    }
  },
  /// Ordenamos por precio ascendente
  orderBy: {
    precio: 'asc'
  }
})

console.log(`\nEncontrados ${productosConLamina.length} productos con "lámina":\n`)  
productosConLamina.forEach(p => {
  console.log(`- ${p.título}: ${p.precio}€`)
})

/// DESCONEXIÓN DE LA BASE DE DATOS
await prisma.$disconnect()
