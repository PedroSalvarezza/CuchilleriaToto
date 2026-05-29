import { Router } from "express";
import * as controlador from './controlador.productos.mjs'

const rutasProductos= new Router()

rutasProductos.get('/api/v1/productos', controlador.obtenerCatalogo)
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerProductoPorId)

rutasProductos.delete('/api/v1/productos/:id', controlador.eliminarUno)

rutasProductos.post('/api/v1/productos', controlador.crearProducto)   

rutasProductos.put('/api/v1/productos/:id', controlador.actualizarProducto) 




export default rutasProductos