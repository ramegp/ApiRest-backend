"use strict";
exports.__esModule = true;
var express = require("express");
var clases_1 = require("./clases");
var app = express();
var puerto = 8080;
var path = __dirname + "/../assets";
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
var server = app.listen(puerto, function () {
    console.log("servidor inicializado en el puerto " + puerto);
});
app.get("/api/productos/listar/:id", function (req, res) {
    var id_search = parseInt(req.params.id.split('=')[1]);
    var products = new clases_1.Archivo("productos.txt");
    var product_wanted = products.searchProductId(id_search);
    if (product_wanted) {
        return res.json(product_wanted);
    }
    else {
        return res.json({ error: 'Producto no encontrado / no existe' });
    }
});
app.get("/api/productos/listar", function (req, res) {
    var products = new clases_1.Archivo("productos.txt");
    if (!products.readFile().length) {
        //Esta vacio
        res.json({ error: "No hay productos cargados" });
    }
    else {
        res.json({ items: products.readFile() });
    }
});
app.post("/api/productos/guardar", function (req, res) {
    var products = new clases_1.Archivo("productos.txt");
    var product_to_save = req.body;
    products.saveFile(product_to_save);
    return res.json({ msg: "Producto guardado" });
});
