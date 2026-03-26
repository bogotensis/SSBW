import express from 'express'
import prisma from '../prisma/prisma.client.ts'
import logger from '../logger.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cards = await prisma.producto.findMany({ omit: { descripción: true } })
    res.render('portada.njk', { cards })
  } catch (error: any) {
    logger.error(error.message)
    res.status(500).send(`Error: ${error.message}`)
  }
})

router.get('/producto/:id', async (req, res) => {
  try {
    const producto = await prisma.producto.findUnique({ where: { id: Number(req.params.id) } })
    if (!producto) return res.status(404).send('Producto no encontrado')
    res.render('detalle.njk', { producto })
  } catch (error: any) {
    logger.error(error.message)
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
    logger.error(error.message)
    res.status(500).send(`Error: ${error.message}`)
  }
})

router.post('/al-carrito/:id', async (req, res) => {
  const id = Number(req.params.id)
  const cantidad = Number(req.body.cantidad)
  logger.debug(`Al carrito: producto ${id}, ${cantidad} unidad(es)`)

  if (cantidad > 0) {
    if (req.session.carrito !== undefined) {
      const existente = req.session.carrito.find(i => i.id === id)
      if (existente) {
        existente.cantidad += cantidad
      } else {
        req.session.carrito.push({ id, cantidad })
      }
    } else {
      req.session.carrito = [{ id, cantidad }]
    }

    const total_carrito = req.session.carrito.reduce((sum, i) => sum + i.cantidad, 0)
    req.session.total_carrito = total_carrito
    logger.debug(`Total carrito: ${total_carrito}`)
  }

  req.session.save(() => res.redirect(`/producto/${id}`))
})

export default router
