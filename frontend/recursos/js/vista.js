const NUMERO_WS = "3512428444";

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
    const seccion = contenedor.closest('section');

    contenedor.innerHTML = "";
    contenedor.removeAttribute("class");
    contenedor.id = "carrusel-track";
    contenedor.style.cssText = "position:relative; width:100%; overflow:visible;";

    lista.forEach((producto, index) => {
        const slide = document.createElement("article");
        slide.classList.add("carrusel-slide");
        slide.style.display = index === 0 ? "flex" : "none";

        // Armar mensaje WhatsApp con los datos del producto
        const mensajeWs = encodeURIComponent(
            `Hola! Me interesa el *${producto.nombre}* que vi en el catálogo:\n` +
            `• Medidas: ${producto.medidas}\n` +
            `• Material: ${producto.material}\n` +
            `• Mango: ${producto.cabo}\n` +
            `• Precio: $${Number(producto.precio).toLocaleString('es-AR')}\n\n` +
            `¿Podrias enviarme mas informacion?`
        );
        const urlWs = `https://wa.me/${NUMERO_WS}?text=${mensajeWs}`;

        slide.innerHTML = `
            <div class="carrusel-imagen-wrap">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="carrusel-img">
            </div>
            <div class="carrusel-info">
                <h3 class="carrusel-nombre">${producto.nombre}</h3>
                <ul class="carrusel-detalles">
                    <li><span class="detalle-label">Medidas</span><span>${producto.medidas}</span></li>
                    <li><span class="detalle-label">Material</span><span>${producto.material}</span></li>
                    <li><span class="detalle-label">Mango</span><span>${producto.cabo}</span></li>
                    <li><span class="detalle-label">Precio</span><span class="carrusel-precio">$${producto.precio.toLocaleString('es-AR')}</span></li>
                </ul>
                <a class="btn-ws-catalogo" href="${urlWs}" target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="currentColor"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.561 2.142 7.974L0 32l8.286-2.108A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.784-1.857l-.486-.29-5.028 1.279 1.306-4.886-.317-.5A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.306-9.917c-.4-.2-2.366-1.167-2.733-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.687-.622-3.213-1.98-1.188-1.058-1.99-2.365-2.223-2.765-.233-.4-.025-.617.175-.817.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.673-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.307 6.833 6.033.955.413 1.7.66 2.28.845.958.305 1.83.262 2.52.159.769-.114 2.366-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z"/></svg>
                    Consultar por este cuchillo
                </a>
            </div>
        `;

        contenedor.appendChild(slide);
    });

    // Botones navegación
    const btnPrev = document.createElement("button");
    btnPrev.classList.add("carrusel-btn", "carrusel-btn-prev");
    btnPrev.setAttribute("aria-label", "Anterior");
    btnPrev.innerHTML = "&#8592;";

    const btnNext = document.createElement("button");
    btnNext.classList.add("carrusel-btn", "carrusel-btn-next");
    btnNext.setAttribute("aria-label", "Siguiente");
    btnNext.innerHTML = "&#8594;";

    seccion.style.position = "relative";
    seccion.appendChild(btnPrev);
    seccion.appendChild(btnNext);

    // Dots
    const dots = document.createElement("div");
    dots.classList.add("carrusel-dots");
    lista.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("carrusel-dot");
        if (i === 0) dot.classList.add("activo");
        dot.setAttribute("aria-label", `Ir al producto ${i + 1}`);
        dot.addEventListener("click", () => irA(i));
        dots.appendChild(dot);
    });
    seccion.appendChild(dots);

    let actual = 0;
    const slides   = contenedor.querySelectorAll(".carrusel-slide");
    const dotsBtns = dots.querySelectorAll(".carrusel-dot");

    function irA(index) {
        slides[actual].style.display = "none";
        dotsBtns[actual].classList.remove("activo");
        actual = (index + slides.length) % slides.length;
        slides[actual].style.display = "flex";
        dotsBtns[actual].classList.add("activo");
    }

    btnPrev.addEventListener("click", () => irA(actual - 1));
    btnNext.addEventListener("click", () => irA(actual + 1));

    // Swipe táctil
    let touchStartX = 0;
    contenedor.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; });
    contenedor.addEventListener("touchend",   e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) irA(diff > 0 ? actual + 1 : actual - 1);
    });
}

export { renderizadoFront, renderizadoCatalogo };
