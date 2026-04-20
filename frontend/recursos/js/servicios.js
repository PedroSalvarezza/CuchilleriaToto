async function obtenerDatos(url) {
    if (url.includes('catalogo.json')) {
        const guardado = localStorage.getItem('catalogo_admin');
        if (guardado) return JSON.parse(guardado);
    }
    if (url.includes('galeria.json')) {
        const guardado = localStorage.getItem('galeria_admin');
        if (guardado) return JSON.parse(guardado);
    }
    const resultado = await fetch(url);
    return await resultado.json();
}

export { obtenerDatos };