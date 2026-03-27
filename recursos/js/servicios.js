async function obtenerDatos(url){
    const resultado = await fetch(url)
    
    const objetoDatos = await resultado.json()
    return objetoDatos
}
export {
    obtenerDatos
}