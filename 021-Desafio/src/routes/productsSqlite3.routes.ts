import express = require("express");
let __path = require('path');

import { Archivo, DBSqlite3 } from '../clases'

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.json({msg:'routas sqlite3'})
})

router.get('/listar/:id?', (req: express.Request, res: express.Response) => {
    let id_show = parseInt(req.params.id)

    let {nombre, preciomax, preciomin, codigo, stockmax, stockmin} = req.query

    let db = new DBSqlite3();

    //(isNaN(id_show)) ? db.showAllProducts().then((data: any) => { res.json({ productos: data }) }) : db.findById(id_show).then((data: any) => { res.json({ productos: data }) })
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
                    db.findByPriceStockRange(parseInt(preciomin),parseInt(preciomax.toString()),parseInt(stockmin),parseInt(stockmax.toString())).then((data:any)=>{res.json(data)})
                } else {
                    if (stockmax) {
                        (stockmin)?(stockmin = stockmin.toString()):(stockmin = '0')
                        db.findByStockRange(parseInt(stockmin),parseInt(stockmax.toString())).then((data:any)=>{res.json(data)})
                    } else {
                        if (preciomax) {
                            (preciomin)?(preciomin = preciomin.toString()):(preciomin = '0');
                            db.findByPriceRange(parseInt(preciomin),parseInt(preciomax.toString())).then((data:any)=>{res.json(data)})
                        } else {
                            
                            db.showAllProducts().then((data: any) => { res.json(data) })
                            
                        }
                        
                    }
                    
                }
            }
        }
    }
})

router.post('/agregar', (req: express.Request, res: express.Response) => {
    let obj = req.body

    let db = new DBSqlite3();
    db.addProduct(obj).then((id) => { db.findById(id).then((data: any) => { db.cerrarBD(); res.json({ productos: data }) }) })
})

router.put('/actualizar/:id', (req: express.Request, res: express.Response) => {
    let id_produc = parseInt(req.params.id)
    let db = new DBSqlite3();

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
        if (data == 1) { db.findById(id_produc).then((data: any) => { db.cerrarBD(); res.json({ update: true, product: data }) }) }
        else res.json({ update: false, product: [] })
    })
})

router.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    let id_delete = parseInt(req.params.id)
    let db = new DBSqlite3();
    db.deleteProd(id_delete).then((data:any)=>{
        if(data == 1){db.cerrarBD();res.json({delete:true})}
        else {db.cerrarBD();res.json({delete:false})}
    })
})

module.exports = router