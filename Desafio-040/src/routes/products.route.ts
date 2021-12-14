import express = require("express");
import { actualizarProducto, agregarProducto, borrarProducto, buscarProducto } from "../controlRoutes/products.route";
import { logger, loggerInfo } from "../helpers/logHandler";
import { authJWT } from '../middleware/log'
import { DBMongo } from "../utils/DBMongo";


let __path = require('path');
const router = express.Router();

router.get('/:id?', buscarProducto)

router.post('/', agregarProducto)

router.delete('/:id', borrarProducto)

router.put('/:id', actualizarProducto)


module.exports = router