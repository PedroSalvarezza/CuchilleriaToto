import pool from "../../utilidades/conexion.bd.mjs";

export async function obtenerCatalogo(){
    const resultado = await pool.query('SELECT * FROM productos')
    return resultado
}