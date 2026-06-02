import pool from "../../utilidades/conexion.bd.mjs";

export async function obtenerTodos() {
    const resultado = await pool.query('SELECT * FROM galeria ORDER BY id')
    return resultado
}

export async function obtenerPorId(id) {
    const resultado = await pool.query('SELECT * FROM galeria WHERE id = $1', [id])
    return resultado
}

export async function crearUno(datos) {
    const { nombre, imagen } = datos
    const resultado = await pool.query(
        `INSERT INTO galeria (nombre, imagen) VALUES ($1, $2) RETURNING *`,
        [nombre, imagen]
    )
    return resultado
}

export async function actualizarUno(id, datos) {
    const { nombre, imagen } = datos
    const resultado = await pool.query(
        `UPDATE galeria SET nombre = $1, imagen = $2 WHERE id = $3 RETURNING *`,
        [nombre, imagen, id]
    )
    return resultado
}

export async function eliminarUno(id) {
    const resultado = await pool.query('DELETE FROM galeria WHERE id = $1 RETURNING *', [id])
    return resultado
}