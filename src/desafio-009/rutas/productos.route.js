"use strict";
exports.__esModule = true;
var express = require("express");
var __path = require('path');
var clases_1 = require("../clases");
//console.log(__path.resolve(__dirname+'/../public/index.html'))
var router = express.Router();
router.get('/productos', function (req, res) {
    res.sendFile(__path.resolve(__dirname + '/../public/index.html'));
});
router.get('/productos/actualizar/:id', function (req, res) {
    var id_search = parseInt(req.params.id);
    var products = new clases_1.Archivo("productos.txt");
    var product_wanted = products.searchProductId(id_search);
    if (product_wanted) {
        var pagina = "<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Document</title>\n    </head>\n    <body>\n        <h1>Hola</h1>\n        <form action=\"/api/productos/actualizar\" method=\"GET\">\n            <input type=\"text\" name=\"title\" id=\"\" value=\"" + product_wanted.title + "\">\n            <input type=\"number\" name=\"price\" id=\"\" value=\"" + product_wanted.price + "\">\n            <input type=\"submit\" value=\" enviar\">\n        </form>\n    </body>\n    </html>";
        return res.send(pagina);
    }
    else {
        return res.json({ error: 'Producto no encontrado / no existe' });
    }
});
router.get('/productos/actualizar', function (req, res) {
    var title = req.query.title;
    var price = req.query.price;
    console.log("title " + title + " price " + price);
    res.send('borrara usuario' + req.params.id);
});
router["delete"]('/productos/borrar/:id', function (req, res) {
    res.send('actualizara usuario' + req.params.id);
});
module.exports = router;
