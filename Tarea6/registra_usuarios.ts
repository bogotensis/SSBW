import prisma from './prisma/prisma.client.ts'

const usuarios = [
  { email: 'admin@prado.es', nombre: 'Administrador', contraseña: 'admin123', admin: true },
  { email: 'usuario@prado.es', nombre: 'Usuario Test', contraseña: 'user123', admin: false }
]

for (const u of usuarios) {
  try {
    const creado = await prisma.usuario.registrar(u.email, u.nombre, u.contraseña, u.admin)
    console.log('Registrado:', creado.email, '| admin:', creado.admin)
  } catch (e: any) {
    console.error('Error:', e.message)
  }
}

// Comprobar autenticación
try {
  const u = await prisma.usuario.autentifica('admin@prado.es', 'admin123')
  console.log('Autenticado OK:', u.nombre)
} catch (e: any) {
  console.error('Fallo auth:', e.message)
}

await prisma.$disconnect()
