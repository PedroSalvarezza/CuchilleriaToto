import { Router } from 'express'
import * as controlador from './controlador.galeria.mjs'

const rutasGaleria = new Router()

rutasGaleria.get('/api/v1/galeria', controlador.obtenerTodos)
rutasGaleria.get('/api/v1/galeria/:id', controlador.obtenerPorId)
rutasGaleria.post('/api/v1/galeria', controlador.crearUno)
rutasGaleria.put('/api/v1/galeria/:id', controlador.actualizarUno)
rutasGaleria.delete('/api/v1/galeria/:id', controlador.eliminarUno)

export default rutasGaleria