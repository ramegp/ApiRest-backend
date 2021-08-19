"use strict";
exports.__esModule = true;
var express = require("express");
var __path = require('path');
var clases_1 = require("../clases");
//console.log(__path.resolve(__dirname+'/../public/index.html'))
var router = express.Router();
router.get('', function (req, res) {
    res.render('main', {
        productos: [
            {
                name: "azucar",
                precio: 45
            },
            {
                name: "harina",
                precio: 56
            },
            {
                name: "yerba mate",
                precio: 500
            }
        ]
    });
});
router.get('/productos', function (req, res) {
    res.sendFile(__path.resolve(__dirname + '/../public/index.html'));
});
router.get('/productos/actualizar/:id', function (req, res) {
    var id_search = parseInt(req.params.id);
    var products = new clases_1.Archivo("productos.txt");
    var prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail
    };
    res.json({ datos: products.upDateProduct(id_search, prod_to_update) });
});
router.get('/productos/cargar', function (req, res) {
    var obj_to_add = {
        "title": req.query.title,
        "price": parseInt(req.query.price),
        "thumbnail": req.query.img
    };
    var products = new clases_1.Archivo("productos.txt");
    res.json({ data: products.saveFile(obj_to_add) });
});
router["delete"]('/productos/borrar/:id', function (req, res) {
    var id_search = parseInt(req.params.id);
    var products = new clases_1.Archivo("productos.txt");
    res.json({ data: products.deletedProduct(id_search) });
});
module.exports = router;
