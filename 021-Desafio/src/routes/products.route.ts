import express = require("express");
let __path = require('path');

import { Archivo, DBMongo } from '../clases'

const router = express.Router();

router.get('/listar/:id?', async (req: express.Request, res: express.Response) => {
    let id_show = req.params.id
    let {nombre, preciomax, preciomin, codigo, stockmax, stockmin} = req.query
    
    let db = new DBMongo();
    
    if (id_show) {
        db.findById(id_show).then((data:any)=>{res.json(data)})
    } else {
        if (nombre) {
            db.findByName(nombre.toString()).then((data:any)=>{res.json(data)})
        } else {
            if (codigo) {
                db.findByCode(codigo.toString()).then((data:any)=>{res.json(data)})
            } else {
                if (preciomax && stockmax) {
                    
                    (preciomin)?(preciomin = preciomin.toString()):(preciomin = '0');
                    (stockmin)?(stockmin = stockmin.toString()):(stockmin = '0');
                    db.findByPriceStock(parseInt(preciomax.toString()),parseInt(preciomin),parseInt(stockmax.toString()),parseInt(stockmin)).then((data:any)=>{res.json(data)})
                    
                } else {
                    if (stockmax) {
                        (stockmin)?(stockmin = stockmin.toString()):(stockmin = '0')
                        db.findByStock(parseInt(stockmax.toString()),parseInt(stockmin)).then((data:any)=>{res.json(data)})
                    } else {
                        if (preciomax) {
                            (preciomin)?(preciomin = preciomin.toString()):(preciomin = '0');
                            db.findByPrice(parseInt(preciomax.toString()),parseInt(preciomin)).then((data:any)=>{res.json(data)})
                        } else {
                            
                            db.imprimir().then((data:any)=>{res.json(data)})
                        }
                        
                    }
                }
            }
        }
    }
    
})

router.post('/agregar', (req: express.Request, res: express.Response) => {
    let obj = req.body

    let db = new DBMongo();
    db.addProd(obj).then((prod) => {res.json(prod)})
})

router.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    let id_delete = req.params.id

    let db = new DBMongo();
    db.removeById(id_delete).then((data:any)=>{
        res.json(data)
    })
})

router.put('/actualizar/:id', (req: express.Request, res: express.Response) => {
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