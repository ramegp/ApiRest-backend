import express = require("express");
let __path = require('path');

import { Archivo } from '../clases'

const router = express.Router();


router.get('/listar/:id?',(req: express.Request, res: express.Response)=>{
    let id_show = parseInt(req.params.id)
    let products = new Archivo("productos.txt")
    //console.log("Consulta")
    //Agrego header sino no puedo hacer la peticion desde la app react
    res.header("Access-Control-Allow-Origin", "*");
    res.json({productos: (isNaN(id_show))?products.readFile():[products.searchProductId(id_show)]})
})

router.post('/agregar',(req: express.Request, res: express.Response)=>{
    let obj = req.body
    let products = new Archivo("productos.txt");
    res.json({data:"agregar",producto:products.saveFile(obj)})
})

router.put('/actualizar/:id',(req: express.Request, res: express.Response)=>{
    let id_produc = parseInt(req.params.id)

    let products = new Archivo("productos.txt")
    let prod_to_update = {
        "title":req.body.title,
        "price":req.body.price,
        "thumbnail":req.body.thumbnail,
        "codigo":req.body.codigo,
        "stock":req.body.stock,
        "description":req.body.description,
        "timestamp":req.body.timestamp
    }
    
    res.json({data:"Actualizar",producto:products.upDateProduct(id_produc,prod_to_update),idproducto:id_produc})
})

router.delete('/borrar/:id',(req: express.Request, res: express.Response)=>{
    let id_delete = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    res.json({data:"borrar",producto:products.deletedProduct(id_delete)})
})


module.exports = router