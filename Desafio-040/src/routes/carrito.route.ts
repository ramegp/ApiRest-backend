import express = require("express");

let __path = require('path');

import { agregarProductoAlCarrito, borrarProductoDelCarrito, devolverCarritoActual, devolverTodosLosCarritosDelUsuario, finalizarCompra, finalizarCompra2 } from "../controlRoutes/carrito.route";


const router = express.Router();

router.get('/:idUser',devolverCarritoActual);

router.get('/:idUser/all',devolverTodosLosCarritosDelUsuario);

router.get('/:idUser/buy',finalizarCompra);

router.put('/:idUser',agregarProductoAlCarrito)

router.delete('/:idUser',borrarProductoDelCarrito)


router.post('/:idUser/finalizar', finalizarCompra2)

module.exports = router