import multer from 'multer'
import path from 'node:path'
import * as modelo from './modelo.productos.mjs'

// ── MULTER ──────────────────────────────────────────────────────────
const almacenamiento = multer.diskStorage({
    destination: path.join('archivos'),
    filename: (req, file, cb) => {
        const nombreUnico = `${Date.now()}-${file.originalname}`
        cb(null, nombreUnico)
    }
})
const subirArchivo = multer({ storage: almacenamiento })
const manejarArchivo = subirArchivo.single('archivo') // <- name del input file
// ────────────────────────────────────────────────────────────────────

// LECTURA: todos
export async function obtenerCatalogo(req, res) {
    try {
        const respuesta = await modelo.obtenerCatalogo()
        res.json(respuesta.rows)
    } catch (e) {
        res.statusCode = 500
        res.json({ error: e.message })
    }
}

// LECTURA: uno por id
export async function obtenerProductoPorId(req, res) {
    try {
        const respuesta = await modelo.obtenerProductoPorId(req.params.id)
        const producto = respuesta.rows[0]
        if (!producto) {
            res.statusCode = 404
            return res.json({ error: 'Producto no encontrado' })
        }
        return res.json(producto)
    } catch (e) {
        res.statusCode = 500
        return res.json({ error: e.message })
    }
}

// ALTA (con subida de imagen)
export async function crearProducto(req, res) {
    manejarArchivo(req, res, async (error) => {
        if (error) return res.status(500).json({ error: 'Error al subir el archivo' })
        try {
            const datos = {
                nombre:   req.body.nombre,
                medidas:  req.body.medidas,
                material: req.body.material,
                cabo:     req.body.cabo,
                precio:   req.body.precio,
                imagen:   req.file ? req.file.filename : null
            }
            if (!datos.nombre || !datos.precio) {
                res.statusCode = 400
                return res.json({ error: 'El nombre y el precio son obligatorios' })
            }
            const respuesta = await modelo.crearProducto(datos)
            res.statusCode = 201
            return res.json(respuesta.rows[0])
        } catch (e) {
            res.statusCode = 500
            return res.json({ error: e.message })
        }
    })
}

// MODIFICACIÓN (imagen opcional: si no suben una nueva, conserva la anterior)
export async function actualizarProducto(req, res) {
    manejarArchivo(req, res, async (error) => {
        if (error) return res.status(500).json({ error: 'Error al subir el archivo' })
        try {
            const actual = await modelo.obtenerProductoPorId(req.params.id)
            if (!actual.rows[0]) {
                res.statusCode = 404
                return res.json({ error: 'Producto no encontrado' })
            }
            const datos = {
                nombre:   req.body.nombre,
                medidas:  req.body.medidas,
                material: req.body.material,
                cabo:     req.body.cabo,
                precio:   req.body.precio,
                imagen:   req.file ? req.file.filename : actual.rows[0].imagen
            }
            const respuesta = await modelo.actualizarProducto(req.params.id, datos)
            return res.json(respuesta.rows[0])
        } catch (e) {
            res.statusCode = 500
            return res.json({ error: e.message })
        }
    })
}

// BAJA
export async function eliminarUno(req, res) {
    try {
        const respuesta = await modelo.eliminarUno(req.params.id)
        if (!respuesta.rows[0]) {
            res.statusCode = 404
            return res.json({ error: 'Producto no encontrado' })
        }
        return res.json({ mensaje: 'Producto eliminado', producto: respuesta.rows[0] })
    } catch (e) {
        res.statusCode = 500
        return res.json({ error: e.message })
    }
}