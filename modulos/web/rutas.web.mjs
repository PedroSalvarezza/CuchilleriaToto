import { Router } from 'express'
import * as modeloProductos from '../productos/modelo.productos.mjs'

const rutasWeb = new Router()

// Catálogo: todos los productos
rutasWeb.get('/api/catalogo', async (req, res) => {
    try {
        const respuesta = await modeloProductos.obtenerCatalogo()
        res.json(respuesta.rows)
    } catch (e) {
        res.statusCode = 500
        res.json({ error: e.message })
    }
})

// Galería: solo los marcados con en_galeria = true
rutasWeb.get('/api/galeria', async (req, res) => {
    try {
        const respuesta = await modeloProductos.obtenerGaleria()
        res.json(respuesta.rows)
    } catch (e) {
        res.statusCode = 500
        res.json({ error: e.message })
    }
})

export default rutasWeb