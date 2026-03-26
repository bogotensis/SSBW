import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter }).$extends({
  model: {
    usuario: {
      async registrar(email: string, nombre: string, contraseña: string, admin = false) {
        const hash = await bcrypt.hash(contraseña, 10)
        return prisma.usuario.create({ data: { email, nombre, contraseña: hash, admin } })
      },
      async autentifica(email: string, contraseña: string) {
        const usuario = await prisma.usuario.findUnique({ where: { email } })
        if (!usuario) throw new Error('Usuario no encontrado')
        const ok = await bcrypt.compare(contraseña, usuario.contraseña)
        if (!ok) throw new Error('Contraseña incorrecta')
        return usuario
      }
    }
  }
})

export default prisma
