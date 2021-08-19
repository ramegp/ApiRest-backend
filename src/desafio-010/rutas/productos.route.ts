import express = require("express");
let __path = require('path');
import { Archivo } from '../clases'



//console.log(__path.resolve(__dirname+'/../public/index.html'))

const router = express.Router();

router.get('', (req: express.Request, res: express.Response) => {
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
    })
})


router.get('/productos', (req: express.Request, res: express.Response) => {
    res.sendFile(__path.resolve(__dirname + '/../public/index.html'))
})




router.get('/productos/actualizar/:id', (req: express.Request, res: express.Response) => {

    let id_search = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    let prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail
    }

    res.json({ datos: products.upDateProduct(id_search, prod_to_update) })
})

router.get('/productos/cargar', (req: express.Request, res: express.Response) => {
    let obj_to_add = {
        "title": req.query.title as string,
        "price": parseInt(req.query.price as string),
        "thumbnail": req.query.img as string
    }
    let products = new Archivo("productos.txt");
    res.json({ data: products.saveFile(obj_to_add) });
})

router.delete('/productos/borrar/:id', (req: express.Request, res: express.Response) => {
    let id_search = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    res.json({ data: products.deletedProduct(id_search) })
})


module.exports = router