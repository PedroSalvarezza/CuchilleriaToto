import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import rutasModuloProducto from './modulos/productos/rutas.productos.mjs'
import { obtenerGaleria } from './modulos/obtenerGaleria.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
//app.use(express.static(path.join(__dirname, 'frontend')))

app.use(rutasModuloProducto)

app.get('/api/galeria', async (req, res) => {
  try {
    const galeria = await obtenerGaleria()

    res.statusCode = 200
    return res.json(galeria)

  } catch (e) {
    console.log(e.message)
    res.statusCode = 500
    return res.json({ error: e.message })
  }
})

app.listen(3000, () => {
  console.log('servidor escuchando en http://localhost:3000')
})
