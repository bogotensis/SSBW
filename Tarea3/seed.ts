/// IMPORTACIÓN DEL CLIENTE PRISMA
/// Importamos la instancia de prisma que configuramos en prisma.client.ts
/// Esta instancia ya tiene toda la configuración de conexión a la BD
import prisma from "./prisma/prisma.client.ts";

/// DEFINICIÓN DE TIPOS TYPESCRIPT
/// Estos tipos definen la estructura de los datos que esperamos

/// Tipo Producto: define cómo es un producto en el JSON
/// - título: nombre del producto (string)
/// - descripción: descripción del producto (string)
/// - texto_precio: precio como texto, ej: "12,99 €" (string)
/// - imagen: nombre del archivo de imagen (string)
type Producto = {
  título: string
  descripción: string
  texto_precio: string
  imagen: string
}

/// Tipo Productos: un array (lista) de productos
/// Es simplemente Producto[] que significa "array de Producto"
type Productos = Producto[]

/// IMPORTACIÓN DE LOS DATOS
/// Importamos el archivo productos.json
/// 'with {type: 'json'}' es la sintaxis moderna de ES modules para importar JSON
/// Esto carga todos los productos del archivo en la variable 'productos'
import productos from "./productos.json" with {type: 'json'}

/// LLAMADA A LA FUNCIÓN PRINCIPAL
/// Ejecutamos la función que guardará los productos en la BD
/// await: esperamos a que termine antes de continuar
/// (necesario porque las operaciones de BD son asíncronas)
await Guardar_en_DB(productos)

/// CONSULTAS DE EJEMPLO PARA COMPROBAR QUE FUNCIONA

/// Ejemplo 1: Buscar productos cuya descripción empiece por 'Lámina'
/// y ordenarlos por precio de menor a mayor
console.log('\n=== Productos cuya descripción empieza por "Lámina" ordenados por precio ===')
const productosLamina = await prisma.producto.findMany({
  /// where: condiciones de búsqueda (como WHERE en SQL)
  where: {
    /// startsWith: busca textos que empiecen con el valor dado
    /// mode: 'insensitive' hace que no distinga mayúsculas/minúsculas
    descripción: {
      startsWith: 'Lámina',
      mode: 'insensitive'
    }
  },
  /// orderBy: cómo ordenar los resultados (como ORDER BY en SQL)
  /// precio: 'asc' ordena de menor a mayor precio
  orderBy: {
    precio: 'asc'
  }
})
console.log(`Encontrados ${productosLamina.length} productos:`)
productosLamina.forEach(p => {
  console.log(`- ${p.título}: ${p.precio}€`)
})

/// Ejemplo 2: Contar cuántos productos hay en total
console.log('\n=== Total de productos en la BD ===')
const totalProductos = await prisma.producto.count()
console.log(`Total: ${totalProductos} productos`)

/// Ejemplo 3: Obtener el producto más caro
console.log('\n=== Producto más caro ===')
const productoMasCaro = await prisma.producto.findFirst({
  /// orderBy con 'desc' ordena de mayor a menor
  /// findFirst toma solo el primero, que será el más caro
  orderBy: {
    precio: 'desc'
  }
})
if (productoMasCaro) {
  console.log(`${productoMasCaro.título}: ${productoMasCaro.precio}€`)
}

/// DESCONEXIÓN DE LA BASE DE DATOS
/// Es importante cerrar la conexión cuando terminamos
/// Libera recursos y evita conexiones colgadas
await prisma.$disconnect()

/// FUNCIÓN PARA GUARDAR PRODUCTOS EN LA BASE DE DATOS
/// Esta función es async porque usa await dentro
/// Recibe un array de productos y no devuelve nada (Promise<void>)
async function Guardar_en_DB(productos: Productos): Promise<void> {

  /// Recorremos cada producto del array
  /// for...of es la forma moderna de iterar arrays en JavaScript
  for (const producto of productos) {
    
    /// Extraemos los datos del producto
    /// Tomamos cada campo del objeto producto
    const título = producto.título
    const descripción = producto.descripción
    const imagen = producto.imagen
    
    /// Procesamos el precio
    /// El precio viene como texto "12,99 €", necesitamos convertirlo a número
    /// Pasos:
    /// 1. slice(0, -2): quita los últimos 2 caracteres (" €")
    ///    "12,99 €" -> "12,99"
    /// 2. replace(/,/, '.'): cambia la coma por punto
    ///    "12,99" -> "12.99"
    /// 3. Number(): convierte el texto a número
    ///    "12.99" -> 12.99
    const precio = Number(producto.texto_precio.slice(0, -2).replace(/,/, '.'))
    
    /// Bloque try-catch para manejar errores
    /// Si algo falla al crear el producto, capturamos el error
    try {
      /// Creamos un nuevo producto en la base de datos
      /// prisma.producto.create() inserta un registro en la tabla Producto
      /// await: esperamos a que la operación termine
      const prod = await prisma.producto.create({
        /// data: objeto con los datos del nuevo producto
        /// Los nombres deben coincidir con los campos del modelo en schema.prisma
        data:{
          título,
          descripción,
          imagen,
          precio
        }
      })
      /// Si todo va bien, mostramos un mensaje de éxito
      console.log('Creado:', prod.título)
      
    } catch(error:any) {
      /// Si hay un error (ej: producto duplicado, datos inválidos)
      /// mostramos el mensaje de error
      console.error('Error al crear producto:', error.message)
    }
    
  }

}
