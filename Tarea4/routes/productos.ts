import express from 'express'
import prisma from '../prisma/prisma.client.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cards = await prisma.producto.findMany({ omit: { descripción: true } })
    res.render('portada.njk', { cards })
  } catch (error: any) {
    res.status(500).send(`Error: ${error.message}`)
  }
})

router.get('/producto/:id', async (req, res) => {
  try {
    const producto = await prisma.producto.findUnique({ where: { id: Number(req.params.id) } })
    if (!producto) return res.status(404).send('Producto no encontrado')
    res.render('detalle.njk', { producto })
  } catch (error: any) {
    res.status(500).send(`Error: ${error.message}`)
  }
})

router.get('/buscar', async (req, res) => {
  const busqueda = String(req.query.busqueda ?? '')
  try {
    const cards = await prisma.producto.findMany({
      where: {
        OR: [
          { título: { contains: busqueda, mode: 'insensitive' } },
          { descripción: { contains: busqueda, mode: 'insensitive' } }
        ]
      },
      omit: { descripción: true }
    })
    res.render('portada.njk', { cards, busqueda })
  } catch (error: any) {
    res.status(500).send(`Error: ${error.message}`)
  }
})

export default router
