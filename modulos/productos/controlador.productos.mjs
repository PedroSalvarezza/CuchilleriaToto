import * as modelo from './modelo.productos.mjs'

export async function obtenerCatalogo(req, res){
    const respuesta = await modelo.obtenerCatalogo()
    const respuestaDatos = respuesta.rows
    res.json(respuestaDatos)
}

export async function obtenerProductoPorId(req, res) {
    try {
        const producto = await modelo.obtenerProductoPorId(req.params.id)
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

export async function crearProducto(req, res) {
    try {
        const { nombre, precio } = req.body
        if (!nombre || precio === undefined || precio === null || precio === '') {
            res.statusCode = 400
            return res.json({ error: 'El nombre y el precio son obligatorios' })
        }
        const nuevo = await modelo.crearProducto(req.body)
        res.statusCode = 201
        return res.json(nuevo)
    } catch (e) {
        res.statusCode = 500
        return res.json({ error: e.message })
    }
}


export async function actualizarProducto(req, res) {
    try {
        const actualizado = await modelo.actualizarProducto(req.params.id, req.body)
        if (!actualizado) {
            res.statusCode = 404
            return res.json({ error: 'Producto no encontrado' })
        }
        return res.json(actualizado)
    } catch (e) {
        res.statusCode = 500
        return res.json({ error: e.message })
    }
}


export async function eliminarUno(req, res) {
    try {
        const eliminado = await modelo.eliminarUno(req.params.id)
        if (!eliminado) {
            res.statusCode = 404
            return res.json({ error: 'Producto no encontrado' })
        }
        return res.json({ mensaje: 'Producto eliminado', producto: eliminado })
    } catch (e) {
        res.statusCode = 500
        return res.json({ error: e.message })
    }
}

