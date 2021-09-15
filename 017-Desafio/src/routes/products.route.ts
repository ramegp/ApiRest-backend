import express = require("express");
let __path = require('path');

import { Archivo, DBMysql } from '../clases'

const router = express.Router();

router.get('/bd-listar/:id?', (req: express.Request, res: express.Response) => {
    let id_show = parseInt(req.params.id)

    let db = new DBMysql();

    (isNaN(id_show)) ? db.showAllProducts().then((data: any) => { res.json({ productos: data }) }) : db.showOnlyProduct(id_show).then((data: any) => { res.json({ productos: data }) })

})

router.post('/bd-agregar', (req: express.Request, res: express.Response) => {
    let obj = req.body

    let db = new DBMysql();
    db.addProduct(obj).then((id) => { db.showOnlyProduct(id).then((data: any) => { db.cerrarBD(); res.json({ productos: data }) }) })
})

router.put('/bd-actualizar/:id', (req: express.Request, res: express.Response) => {
    let id_produc = parseInt(req.params.id)
    let db = new DBMysql();

    let prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp
    }
    db.updateProduc(id_produc, prod_to_update).then((data: any) => {
        if (data == 1) { db.showOnlyProduct(id_produc).then((data: any) => { db.cerrarBD(); res.json({ update: true, product: data }) }) }
        else res.json({ update: false, product: [] })
    })
})

router.delete('/bd-borrar/:id', (req: express.Request, res: express.Response) => {
    let id_delete = parseInt(req.params.id)
    let db = new DBMysql();
    db.deleteProd(id_delete).then((data:any)=>{
        if(data == 1){db.cerrarBD();res.json({delete:true})}
        else {db.cerrarBD();res.json({delete:false})}
    })
})


/* ---Sin DB--- */
router.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    let id_show = parseInt(req.params.id)
    let products = new Archivo("productos.txt")
    //console.log("Consulta")
    //Agrego header sino no puedo hacer la peticion desde la app react
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ productos: (isNaN(id_show)) ? products.readFile() : [products.searchProductId(id_show)] })
})

router.post('/agregar', (req: express.Request, res: express.Response) => {
    let obj = req.body
    let products = new Archivo("productos.txt");
    res.json({ data: "agregar", producto: products.saveFile(obj) })
})

router.put('/actualizar/:id', (req: express.Request, res: express.Response) => {
    let id_produc = parseInt(req.params.id)

    let products = new Archivo("productos.txt")
    let prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp
    }

    res.json({ data: "Actualizar", producto: products.upDateProduct(id_produc, prod_to_update), idproducto: id_produc })
})

router.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    let id_delete = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    res.json({ data: "borrar", producto: products.deletedProduct(id_delete) })
})


module.exports = router