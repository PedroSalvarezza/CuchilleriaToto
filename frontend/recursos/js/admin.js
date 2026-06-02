// Panel de administración — CRUD de productos y galería.
// Las imágenes se suben como archivo (Multer), por eso usamos FormData.

function mostrarNotificacion(mensaje, tipo = 'exito') {
  const notif = document.createElement('div')
  notif.className = `notificacion ${tipo}`
  notif.textContent = mensaje
  document.body.appendChild(notif)
  setTimeout(() => notif.remove(), 3200)
}

// ── TABS ────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'))
    document.querySelectorAll('.tab-panel').forEach(p => { p.classList.remove('activo'); p.style.display = 'none' })
    btn.classList.add('activo')
    const panel = document.getElementById(`tab-${btn.dataset.tab}`)
    panel.classList.add('activo')
    panel.style.display = 'block'
  })
})

// ════════════════════════════════════════════════════════════════════
//  CATÁLOGO
// ════════════════════════════════════════════════════════════════════
const API_PROD = '/api/v1/productos'
let catalogoItems = []

cargarCatalogo()

async function cargarCatalogo() {
  const $lista = document.getElementById('lista-catalogo')
  $lista.innerHTML = '<p class="estado-cargando">Cargando productos…</p>'
  try {
    const res = await fetch(API_PROD)
    catalogoItems = await res.json()
    renderTablaProductos()
  } catch {
    $lista.innerHTML = '<p class="estado-vacio">Error al cargar el catálogo.</p>'
  }
}

function renderTablaProductos() {
  const $lista = document.getElementById('lista-catalogo')
  if (!catalogoItems.length) {
    $lista.innerHTML = '<p class="estado-vacio">No hay productos todavía. ¡Agregá el primero!</p>'
    return
  }
  const filas = catalogoItems.map(p => `
    <tr>
      <td>${p.imagen ? `<img src="/archivos/${p.imagen}" alt="${p.nombre}" class="tabla-img" onerror="this.style.display='none'">` : `<div class="tabla-img-placeholder">🔪</div>`}</td>
      <td><strong>${p.nombre}</strong></td>
      <td>${p.medidas || '—'}</td>
      <td>${p.material || '—'}</td>
      <td>${p.cabo || '—'}</td>
      <td>$${Number(p.precio).toLocaleString('es-AR')}</td>
      <td><div class="tabla-acciones">
        <button class="btn btn-editar" onclick="editarProducto('${p.id}')">Editar</button>
        <button class="btn btn-eliminar" onclick="eliminarProducto('${p.id}', '${String(p.nombre).replace(/'/g, "\\'")}')">Eliminar</button>
      </div></td>
    </tr>`).join('')
  $lista.innerHTML = `<table class="admin-tabla"><thead><tr>
      <th>Foto</th><th>Nombre</th><th>Medidas</th><th>Material</th><th>Cabo</th><th>Precio</th><th>Acciones</th>
    </tr></thead><tbody>${filas}</tbody></table>`
}

function abrirFormCatalogo(titulo) {
  document.getElementById('form-catalogo-titulo').textContent = titulo
  document.getElementById('form-catalogo-wrap').style.display = 'block'
  document.getElementById('form-catalogo-wrap').scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}
function cerrarFormCatalogo() {
  document.getElementById('form-catalogo-wrap').style.display = 'none'
  document.getElementById('form-catalogo').reset()
  document.getElementById('cat-id').value = ''
  document.getElementById('cat-preview').style.display = 'none'
  document.getElementById('cat-imagen-actual').style.display = 'none'
}
document.getElementById('btn-nuevo-catalogo').addEventListener('click', () => { cerrarFormCatalogo(); abrirFormCatalogo('Nuevo producto') })
document.getElementById('btn-cancelar-catalogo').addEventListener('click', cerrarFormCatalogo)

window.editarProducto = async function(id) {
  try {
    const res = await fetch(`${API_PROD}/${id}`)
    const p = await res.json()
    document.getElementById('cat-id').value      = p.id
    document.getElementById('cat-nombre').value   = p.nombre   || ''
    document.getElementById('cat-precio').value   = p.precio   || ''
    document.getElementById('cat-medidas').value  = p.medidas  || ''
    document.getElementById('cat-material').value = p.material || ''
    document.getElementById('cat-cabo').value     = p.cabo     || ''
    const $prev = document.getElementById('cat-preview')
    const $actual = document.getElementById('cat-imagen-actual')
    if (p.imagen) {
      $prev.src = `/archivos/${p.imagen}`; $prev.style.display = 'block'
      $actual.textContent = 'Imagen actual: ' + p.imagen + ' (subí una nueva solo si querés cambiarla)'
      $actual.style.display = 'block'
    } else { $prev.style.display = 'none'; $actual.style.display = 'none' }
    abrirFormCatalogo('Editar producto')
  } catch { mostrarNotificacion('Error al cargar el producto', 'error') }
}

window.eliminarProducto = async function(id, nombre) {
  if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return
  try {
    const res = await fetch(`${API_PROD}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error()
    mostrarNotificacion('Producto eliminado correctamente'); cargarCatalogo()
  } catch { mostrarNotificacion('Error al eliminar', 'error') }
}

document.getElementById('cat-imagen').addEventListener('change', function() {
  const $prev = document.getElementById('cat-preview')
  const archivo = this.files[0]
  if (archivo) { $prev.src = URL.createObjectURL(archivo); $prev.style.display = 'block' }
})

document.getElementById('form-catalogo').addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('cat-id').value
  const nombre = document.getElementById('cat-nombre').value.trim()
  const precio = document.getElementById('cat-precio').value
  if (!nombre || !precio) { mostrarNotificacion('Nombre y precio son obligatorios', 'error'); return }
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('precio', precio)
  formData.append('medidas',  document.getElementById('cat-medidas').value.trim())
  formData.append('material', document.getElementById('cat-material').value.trim())
  formData.append('cabo',     document.getElementById('cat-cabo').value.trim())
  const archivo = document.getElementById('cat-imagen').files[0]
  if (archivo) formData.append('archivo', archivo)
  try {
    let res
    if (id) res = await fetch(`${API_PROD}/${id}`, { method: 'PUT', body: formData })
    else    res = await fetch(API_PROD, { method: 'POST', body: formData })
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Error al guardar') }
    mostrarNotificacion(id ? 'Producto actualizado correctamente' : 'Producto agregado correctamente')
    cerrarFormCatalogo(); cargarCatalogo()
  } catch (err) { mostrarNotificacion(err.message, 'error') }
})

// ════════════════════════════════════════════════════════════════════
//  GALERÍA
// ════════════════════════════════════════════════════════════════════
const API_GAL = '/api/v1/galeria'
let galeriaItems = []

cargarGaleria()

async function cargarGaleria() {
  const $lista = document.getElementById('lista-galeria')
  $lista.innerHTML = '<p class="estado-cargando">Cargando galería…</p>'
  try {
    const res = await fetch(API_GAL)
    galeriaItems = await res.json()
    renderTablaGaleria()
  } catch {
    $lista.innerHTML = '<p class="estado-vacio">Error al cargar la galería.</p>'
  }
}

function renderTablaGaleria() {
  const $lista = document.getElementById('lista-galeria')
  if (!galeriaItems.length) {
    $lista.innerHTML = '<p class="estado-vacio">No hay fotos todavía. ¡Agregá la primera!</p>'
    return
  }
  const filas = galeriaItems.map(g => `
    <tr>
      <td>${g.imagen ? `<img src="/archivos/${g.imagen}" alt="${g.nombre}" class="tabla-img" onerror="this.style.display='none'">` : `<div class="tabla-img-placeholder">🖼</div>`}</td>
      <td><strong>${g.nombre}</strong></td>
      <td><div class="tabla-acciones">
        <button class="btn btn-editar" onclick="editarGaleria('${g.id}')">Editar</button>
        <button class="btn btn-eliminar" onclick="eliminarGaleria('${g.id}', '${String(g.nombre).replace(/'/g, "\\'")}')">Eliminar</button>
      </div></td>
    </tr>`).join('')
  $lista.innerHTML = `<table class="admin-tabla"><thead><tr>
      <th>Foto</th><th>Nombre</th><th>Acciones</th>
    </tr></thead><tbody>${filas}</tbody></table>`
}

function abrirFormGaleria(titulo) {
  document.getElementById('form-galeria-titulo').textContent = titulo
  document.getElementById('form-galeria-wrap').style.display = 'block'
  document.getElementById('form-galeria-wrap').scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}
function cerrarFormGaleria() {
  document.getElementById('form-galeria-wrap').style.display = 'none'
  document.getElementById('form-galeria').reset()
  document.getElementById('gal-id').value = ''
  document.getElementById('gal-preview').style.display = 'none'
  document.getElementById('gal-imagen-actual').style.display = 'none'
}
document.getElementById('btn-nuevo-galeria').addEventListener('click', () => { cerrarFormGaleria(); abrirFormGaleria('Nueva foto') })
document.getElementById('btn-cancelar-galeria').addEventListener('click', cerrarFormGaleria)

window.editarGaleria = async function(id) {
  try {
    const res = await fetch(`${API_GAL}/${id}`)
    const g = await res.json()
    document.getElementById('gal-id').value     = g.id
    document.getElementById('gal-nombre').value = g.nombre || ''
    const $prev = document.getElementById('gal-preview')
    const $actual = document.getElementById('gal-imagen-actual')
    if (g.imagen) {
      $prev.src = `/archivos/${g.imagen}`; $prev.style.display = 'block'
      $actual.textContent = 'Imagen actual: ' + g.imagen + ' (subí una nueva solo si querés cambiarla)'
      $actual.style.display = 'block'
    } else { $prev.style.display = 'none'; $actual.style.display = 'none' }
    abrirFormGaleria('Editar foto')
  } catch { mostrarNotificacion('Error al cargar la foto', 'error') }
}

window.eliminarGaleria = async function(id, nombre) {
  if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return
  try {
    const res = await fetch(`${API_GAL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error()
    mostrarNotificacion('Foto eliminada correctamente'); cargarGaleria()
  } catch { mostrarNotificacion('Error al eliminar', 'error') }
}

document.getElementById('gal-imagen').addEventListener('change', function() {
  const $prev = document.getElementById('gal-preview')
  const archivo = this.files[0]
  if (archivo) { $prev.src = URL.createObjectURL(archivo); $prev.style.display = 'block' }
})

document.getElementById('form-galeria').addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('gal-id').value
  const nombre = document.getElementById('gal-nombre').value.trim()
  if (!nombre) { mostrarNotificacion('El nombre es obligatorio', 'error'); return }
  const formData = new FormData()
  formData.append('nombre', nombre)
  const archivo = document.getElementById('gal-imagen').files[0]
  if (archivo) formData.append('archivo', archivo)
  try {
    let res
    if (id) res = await fetch(`${API_GAL}/${id}`, { method: 'PUT', body: formData })
    else    res = await fetch(API_GAL, { method: 'POST', body: formData })
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Error al guardar') }
    mostrarNotificacion(id ? 'Foto actualizada correctamente' : 'Foto agregada correctamente')
    cerrarFormGaleria(); cargarGaleria()
  } catch (err) { mostrarNotificacion(err.message, 'error') }
})