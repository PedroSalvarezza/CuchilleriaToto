function renderizadoFront(lista, contenedor) {
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const articulo = document.createElement("article");
        articulo.classList.add("producto-item");

        articulo.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <p class="producto-nombre">${producto.nombre}</p>
        `;

        contenedor.appendChild(articulo);
    });
}

function renderizadoCatalogo(lista, contenedor) {
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const articulo = document.createElement("article");
        articulo.classList.add("catalogo-item");

        articulo.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="catalogo-img">
            <div class="catalogo-info">
                <h3 class="catalogo-nombre">${producto.nombre}</h3>
                <p><strong>Medidas:</strong> ${producto.medidas}</p>
                <p><strong>Material:</strong> ${producto.material}</p>
                <p><strong>Mango:</strong> ${producto.cabo}</p>
                 <p><strong>Precio:</strong> $${producto.precio}</p> 
            </div>
        `;

        contenedor.appendChild(articulo);
    });
}
export { renderizadoFront, renderizadoCatalogo }