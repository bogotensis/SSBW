/// IMPORTACIÓN DE DOTENV
/// dotenv/config carga automáticamente las variables del archivo .env
/// Esto debe ir primero para que las variables estén disponibles
import 'dotenv/config';

/// IMPORTACIÓN DEL CLIENTE PRISMA
/// PrismaClient es la clase principal que usaremos para interactuar con la BD
/// La importamos desde el código generado (que crearemos con 'npx prisma generate')
import { PrismaClient } from '../generated/prisma/index.js'

/// IMPORTACIÓN DEL ADAPTADOR POSTGRESQL
/// PrismaPg es un adaptador que permite a Prisma comunicarse con PostgreSQL
/// Actúa como puente entre Prisma y la base de datos
import { PrismaPg } from '@prisma/adapter-pg'

/// PASO 1: CONFIGURAR EL ADAPTADOR
/// Creamos una instancia del adaptador PostgreSQL
/// Le pasamos la URL de conexión que está en las variables de entorno
/// Esta URL contiene: usuario, contraseña, host, puerto y nombre de la BD
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

/// PASO 2: INICIALIZAR PRISMA CON EL ADAPTADOR
/// Creamos una instancia de PrismaClient
/// Le pasamos el adaptador que configuramos en el paso anterior
/// Esta instancia será nuestra interfaz para todas las operaciones de BD
const prisma = new PrismaClient({ adapter })

/// PASO 3: EXPORTAR LA INSTANCIA DE PRISMA
/// Exportamos la instancia para poder usarla en otros archivos
/// Así podemos hacer: import prisma from './prisma/prisma.client.ts'
/// y usar prisma.producto.create(), prisma.producto.findMany(), etc.
export default prisma
