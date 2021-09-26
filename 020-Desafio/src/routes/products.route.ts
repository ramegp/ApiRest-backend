import express = require("express");
let __path = require('path');

import { Archivo, DBMongo } from '../clases'

const router = express.Router();

router.get('/bd-listar/:id?', (req: express.Request, res: express.Response) => {
    let id_show = req.params.id
    //console.log(id_show);

    let db = new DBMongo();

    (isNaN(parseInt(req.params.id))?(db.imprimir().then((data:any)=>{res.json(data)})):(db.findById(id_show).then((data:any)=>{res.json(data)})))
})

router.post('/bd-agregar', (req: express.Request, res: express.Response) => {
    let obj = req.body

    let db = new DBMongo();
    db.addProd(obj).then((prod) => {res.json(prod)})
})

router.delete('/bd-borrar/:id', (req: express.Request, res: express.Response) => {
    let id_delete = req.params.id

    let db = new DBMongo();
    db.removeById(id_delete).then((data:any)=>{
        res.json(data)
    })
})

router.put('/bd-actualizar/:id', (req: express.Request, res: express.Response) => {
    let id_produc = req.params.id
    let db = new DBMongo();

    let prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp
    }
    db.upDate(id_produc, prod_to_update).then((data: any) => {
        res.json(data)
    })
})


module.exports = router