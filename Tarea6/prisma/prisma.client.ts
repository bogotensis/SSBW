import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter }).$extends({
  model: {
    usuario: {
      async registrar(email: string, nombre: string, password: string, admin = false) {
        const hash = await bcrypt.hash(password, 10)
        return prisma.usuario.create({ data: { email, nombre, password: hash, admin } })
      },
      async autentifica(email: string, password: string) {
        const usuario = await prisma.usuario.findUnique({ where: { email } })
        if (!usuario) throw new Error('Usuario no encontrado')
        const ok = await bcrypt.compare(password, usuario.password)
        if (!ok) throw new Error('Contraseña incorrecta')
        return usuario
      }
    }
  }
})

export default prisma
