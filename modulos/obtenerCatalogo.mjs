// URL de tu proyecto en MockAPI — reemplazá con la tuya
const MOCKAPI_URL = 'https://69e6698fce4e908a155f7dd6.mockapi.io/api/v1/catalogo'

export async function obtenerCatalogo() {
  const respuesta = await fetch(MOCKAPI_URL)

  if (!respuesta.ok) {
    throw new Error(`Error al contactar la API: ${respuesta.status} ${respuesta.statusText}`)
  }

  const catalogo = await respuesta.json()
  return catalogo
}
