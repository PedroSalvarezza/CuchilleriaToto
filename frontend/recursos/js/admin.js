
async function cargarCatalogo() {
  const $lista = document.getElementById('lista-catalogo')
  $lista.innerHTML = '<p class="estado-cargando">Cargando productos…</p>'
  try {
    catalogoItems = await api('/productos')
    renderTablaProductos()
  } catch {
    $lista.innerHTML = '<p class="estado-vacio">Error al cargar el catálogo.</p>'
  }
}
