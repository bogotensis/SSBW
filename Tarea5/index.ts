import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'
import ProductosRouter from './routes/productos.ts'
import logger from './logger.ts'

const app = express()
const PORT = process.env.PORT ?? 3000

nunjucks.configure('views', { autoescape: true, express: app, watch: true })

app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET ?? 'ssbw-secret',
  resave: false,
  saveUninitialized: false
}))

// middleware global: propaga total_carrito a todas las vistas
app.use((req, res, next) => {
  res.locals.total_carrito = req.session.total_carrito ?? 0
  next()
})

app.use('/public/imagenes', express.static('imagenes'))
app.use('/', ProductosRouter)

app.listen(PORT, () => logger.info(`Servidor en http://localhost:${PORT}`))
