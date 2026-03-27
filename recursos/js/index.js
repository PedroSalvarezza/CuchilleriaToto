import { renderizadoFront, renderizadoCatalogo } from "./vista.js";
import { obtenerDatos } from "./servicios.js";

const galeriaUrl = './datos/json/galeria.json';
const catalogoUrl = './datos/json/catalogo.json';

const $productosList = document.querySelector('.productos-lista');
const $catalogoList = document.querySelector('.catalogo-lista');

(async function init() {
    try {
        if ($catalogoList) {
            $catalogoList.innerHTML = '<p>Cargando catálogo…</p>';
            const productosCatalogo = await obtenerDatos(catalogoUrl);
            console.log('catalogo:', productosCatalogo);
            renderizadoCatalogo(productosCatalogo, $catalogoList);
        }

        if ($productosList) {
            $productosList.innerHTML = '';
            const productosGaleria = await obtenerDatos(galeriaUrl);
            console.log('galeria:', productosGaleria);
            renderizadoFront(productosGaleria, $productosList);
        }
    } catch (err) {
        console.error('Error cargando productos:', err);
        if ($catalogoList) $catalogoList.innerHTML = '<p>Error cargando catálogo.</p>';
        if ($productosList) $productosList.innerHTML = '<p>Error cargando productos.</p>';
    }
})();
