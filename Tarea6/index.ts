import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import ProductosRouter from './routes/productos.ts'
import UsuariosRouter from './routes/usuarios.ts'
import logger from './logger.ts'

const app = express()
const PORT = process.env.PORT ?? 3000

nunjucks.configure('views', { autoescape: true, express: app, watch: true })

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET ?? 'ssbw-secret',
  resave: false,
  saveUninitialized: false
}))

// middleware carrito
app.use((req, res, next) => {
  res.locals.total_carrito = req.session.total_carrito ?? 0
  next()
})

// middleware autenticación JWT
app.use((req, res, next) => {
  const token = req.cookies.access_token
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY ?? 'ssbw-jwt-secret') as any
      app.locals.usuario = data.usuario
      app.locals.admin = data.admin
    } catch {
      app.locals.usuario = undefined
      app.locals.admin = undefined
    }
  } else {
    app.locals.usuario = undefined
    app.locals.admin = undefined
  }
  next()
})

app.use('/public/imagenes', express.static('imagenes'))
app.use('/', ProductosRouter)
app.use('/', UsuariosRouter)

app.listen(PORT, () => logger.info(`Servidor en http://localhost:${PORT}`))
