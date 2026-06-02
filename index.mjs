import express from 'express'
import path from 'node:path'
import './iniciar.env.mjs'
import rutasModuloProducto from './modulos/productos/rutas.productos.mjs'
import rutasModuloGaleria from './modulos/galeria/rutas.galeria.mjs'
import rutasWeb from './modulos/web/rutas.web.mjs'

const PUERTO = process.env.PUERTO || 3000

const app = express()
app.use(express.json())

// APIs del CRUD
app.use(rutasModuloProducto)
app.use(rutasModuloGaleria)
// API de solo lectura para la web pública
app.use(rutasWeb)

// Front web público
app.use(express.static(path.resolve('./frontend')))
// Carpeta donde Multer guarda las imágenes subidas
app.use('/archivos', express.static(path.resolve('./archivos')))

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`)
})