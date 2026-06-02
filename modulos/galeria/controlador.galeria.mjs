import multer from 'multer'
import path from 'node:path'
import * as modelo from './modelo.galeria.mjs'

const almacenamiento = multer.diskStorage({
    destination: path.join('archivos'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const subirArchivo = multer({ storage: almacenamiento })
const manejarArchivo = subirArchivo.single('archivo')

export async function obtenerTodos(req, res) {
    try {
        const respuesta = await modelo.obtenerTodos()
        res.json(respuesta.rows)
    } catch (e) {
        res.statusCode = 500
        res.json({ error: e.message })
    }
}

export async function obtenerPorId(req, res) {
    try {
        const respuesta = await modelo.obtenerPorId(req.params.id)
        const item = respuesta.rows[0]
        if (!item) {
            res.statusCode = 404
            return res.json({ error: 'Foto no encontrada' })
        }
        return res.json(item)
    } catch (e) {
        res.statusCode = 500
        return res.json({ error: e.message })
    }
}

export async function crearUno(req, res) {
    manejarArchivo(req, res, async (error) => {
        if (error) return res.status(500).json({ error: 'Error al subir el archivo' })
        try {
            const datos = {
                nombre: req.body.nombre,
                imagen: req.file ? req.file.filename : null
            }
            if (!datos.nombre) {
                res.statusCode = 400
                return res.json({ error: 'El nombre es obligatorio' })
            }
            const respuesta = await modelo.crearUno(datos)
            res.statusCode = 201
            return res.json(respuesta.rows[0])
        } catch (e) {
            res.statusCode = 500
            return res.json({ error: e.message })
        }
    })
}

export async function actualizarUno(req, res) {
    manejarArchivo(req, res, async (error) => {
        if (error) return res.status(500).json({ error: 'Error al subir el archivo' })
        try {
            const actual = await modelo.obtenerPorId(req.params.id)
            if (!actual.rows[0]) {
                res.statusCode = 404
                return res.json({ error: 'Foto no encontrada' })
            }
            const datos = {
                nombre: req.body.nombre,
                imagen: req.file ? req.file.filename : actual.rows[0].imagen
            }
            const respuesta = await modelo.actualizarUno(req.params.id, datos)
            return res.json(respuesta.rows[0])
        } catch (e) {
            res.statusCode = 500
            return res.json({ error: e.message })
        }
    })
}

export async function eliminarUno(req, res) {
    try {
        const respuesta = await modelo.eliminarUno(req.params.id)
        if (!respuesta.rows[0]) {
            res.statusCode = 404
            return res.json({ error: 'Foto no encontrada' })
        }
        return res.json({ mensaje: 'Foto eliminada', item: respuesta.rows[0] })
    } catch (e) {
        res.statusCode = 500
        return res.json({ error: e.message })
    }
}