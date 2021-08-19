"use strict";
exports.__esModule = true;
var express = require("express");
var __path = require('path');
var clases_1 = require("../clases");
//console.log(__path.resolve(__dirname+'/../public/index.html'))
var router = express.Router();
/* router.get('/productos',(req: express.Request, res: express.Response)=>{
    res.sendFile(__path.resolve(__dirname+'/../public/index.html'))
}) */
/* router.get('/productos/actualizar/:id',(req: express.Request, res: express.Response)=>{
    
    let id_search = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    let product_wanted = products.searchProductId(id_search)
    if (product_wanted) {
        
        let pagina = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Hola</h1>
        <form action="/api/productos/actualizar/${id_search}" method="GET">
            <input type="text" name="title" id="" value="${product_wanted.title}">
            <input type="number" name="price" id="" value="${product_wanted.price}">
            <input type="submit" value=" enviar">
        </form>
    </body>
    </html>`

        return res.send(pagina)
    } else {
        return res.json({error:'Producto no encontrado / no existe'})
    }
}) */
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
router.get('/productos/actualizar', function (req, res) {
    var title = req.query.title;
    var price = req.query.price;
    console.log("title " + title + " price " + price);
    res.send('borrara usuario' + req.params.id);
});
router["delete"]('/productos/borrar/:id', function (req, res) {
    var id_search = parseInt(req.params.id);
    var products = new clases_1.Archivo("productos.txt");
    res.json({ data: products.deletedProduct(id_search) });
});
module.exports = router;
