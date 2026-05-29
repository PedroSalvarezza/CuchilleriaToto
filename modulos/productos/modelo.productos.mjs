import pool from "../../utilidades/conexion.bd.mjs";


export async function obtenerCatalogo() {
    const resultado = await pool.query('SELECT * FROM productos ORDER BY id')
    return resultado.rows
}


export async function obtenerProductoPorId(id) {
    const resultado = await pool.query('SELECT * FROM productos WHERE id = $1', [id])
    return resultado.rows[0]
}


export async function crearProducto(datos) {
    const { nombre, medidas, material, cabo, precio, imagen } = datos
    const resultado = await pool.query(
        `INSERT INTO productos (nombre, medidas, material, cabo, precio, imagen)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [nombre, medidas, material, cabo, precio, imagen]
    )
    return resultado.rows[0]
}


export async function actualizarProducto(id, datos) {
    const { nombre, medidas, material, cabo, precio, imagen } = datos
    const resultado = await pool.query(
        `UPDATE productos
         SET nombre = $1, medidas = $2, material = $3, cabo = $4, precio = $5, imagen = $6
         WHERE id = $7
         RETURNING *`,
        [nombre, medidas, material, cabo, precio, imagen, id]
    )
    return resultado.rows[0]
}


export async function eliminarUno(id) {
    const resultado = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id])
    return resultado.rows[0]
}
