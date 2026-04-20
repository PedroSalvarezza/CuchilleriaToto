import { renderizadoFront, renderizadoCatalogo } from './vista.js'
import { obtenerDatos } from './servicios.js'

const $productosList = document.querySelector('.productos-lista')
const $catalogoList = document.querySelector('.catalogo-lista')

;(async function init() {
  try {
    if ($catalogoList) {
      $catalogoList.innerHTML = '<p>Cargando catálogo…</p>'
      const productosCatalogo = await obtenerDatos('/api/catalogo')
      renderizadoCatalogo(productosCatalogo, $catalogoList)
    }

    if ($productosList) {
      $productosList.innerHTML = ''
      const productosGaleria = await obtenerDatos('/api/galeria')
      renderizadoFront(productosGaleria, $productosList)
    }
  } catch (e) {
    console.log(e.message)
    if ($catalogoList) $catalogoList.innerHTML = '<p>Error al cargar el catálogo.</p>'
    if ($productosList) $productosList.innerHTML = '<p>Error al cargar los productos.</p>'
  }
})()
