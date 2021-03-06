import express = require("express");
let __path = require('path');

const router = express.Router();

/* Importo las rutas */

const ruta_admin = require('./admin.route');
const ruta_cart = require('./carrito.route');
const ruta_log = require('./log.route');
const ruta_messages = require('./messages.route');
const ruta_products = require('./products.route');

const ruta_error = require('./error.route');

router.use('/admin',ruta_admin);
router.use('/cart',ruta_cart);
router.use('/sing',ruta_log);
router.use('/messages',ruta_messages);
router.use('/products',ruta_products);
router.use('',ruta_error)
module.exports = router