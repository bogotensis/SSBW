import express from 'express'
import nunjucks from 'nunjucks'
import ProductosRouter from './routes/productos.ts'

const app = express()
const PORT = process.env.PORT ?? 3000

nunjucks.configure('views', { autoescape: true, express: app, watch: true })

app.use('/public/imagenes', express.static('imagenes'))
app.use('/', ProductosRouter)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))
