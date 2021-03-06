import express = require("express");
let __path = require('path');

import { Archivo, DBMongo } from '../clases'

const faker = require('faker')
faker.locate = 'es'

const router = express.Router();

router.get('/:id?', async (req: express.Request, res: express.Response) => {
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

router.post('/', (req: express.Request, res: express.Response) => {
    let obj = req.body

    let db = new DBMongo();
    db.addProd(obj).then((prod) => {res.json(prod)})
})

router.delete('/:id', (req: express.Request, res: express.Response) => {
    let id_delete = req.params.id

    let db = new DBMongo();
    db.removeById(id_delete).then((data:any)=>{
        res.json(data)
    })
})

router.put('/:id', (req: express.Request, res: express.Response) => {
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

router.get('/vista', (req: express.Request, res: express.Response)=>{
    let {cant} = req.query;
    //@ts-ignore
    (cant)?(res.json(generarProductsFaker(parseInt(cant.toString())))):(res.json(generarProductsFaker(10)));
})

const generarProductsFaker = (cant:number) => {
    let products = []
    for (let i = 0; i < cant; i++) {
       products.push({
            name:faker.commerce.productName(),
            price:faker.commerce.price(),
            description:faker.commerce.productDescription()
       })
    }
    return products
}

module.exports = router