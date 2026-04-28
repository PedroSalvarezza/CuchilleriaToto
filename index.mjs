import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { obtenerCatalogo } from './modulos/obtenerCatalogo.mjs'
import { obtenerGaleria } from './modulos/obtenerGaleria.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'frontend')))

app.get('/api/catalogo', async (peticion, respuesta) => {
  try {
    const catalogo = await obtenerCatalogo()

    respuesta.statusCode = 200
    return respuesta.json(catalogo)

  } catch (e) {
    console.log(e.message)
    respuesta.statusCode = 500
    return respuesta.json({ error: e.message })
  }
})

app.get('/api/galeria', async (peticion, respuesta) => {
  try {
    const galeria = await obtenerGaleria()

    respuesta.statusCode = 200
    return respuesta.json(galeria)

  } catch (e) {
    console.log(e.message)
    respuesta.statusCode = 500
    return respuesta.json({ error: e.message })
  }
})

app.listen(3000, () => {
  console.log('servidor escuchando en http://localhost:3000')
})
