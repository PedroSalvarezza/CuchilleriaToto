import * as modelo from './modelo.productos.mjs'

export async function obtenerCatalogo(req, res){
    const respuesta = await modelo.obtenerCatalogo()
    const respuestaDatos = respuesta.rows
    res.json(respuestaDatos)
}