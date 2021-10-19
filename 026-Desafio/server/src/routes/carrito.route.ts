import express = require("express");
import { Archivo } from "../utils/Archivo";
import { HandleCarts } from "../utils/HandleCarts";
let __path = require('path');

//import { Archivo, Cart, HandleCarts } from '../clases'


const router = express.Router();

const carts = new HandleCarts();

//Pasar todo por query y hacer las rutas get
router.post('/',(req: express.Request, res: express.Response)=>{
    let user = req.body.user;
    //console.log(req.body)
    carts.createCart(user);
    //console.log(carts.getCarts())
    res.json({data:carts.searchCartByUser(user)})
})

router.post('/listar/:id?',(req: express.Request, res: express.Response)=>{
    let id_show = parseInt(req.params.id);
    let user = req.body.user;
    //console.log(req.body)
    if ( isNaN(id_show) ) {
        res.json({product:carts.searchCartByUser(user)?.products()})
    } else {
        res.json({product:carts.searchCartByUser(user)?.searchProductId(id_show)})
    }
})

router.post('/agregar/:id',(req: express.Request, res: express.Response)=>{
    let id_produc = parseInt(req.params.id);
    let user = req.body.user;
    
    if (isNaN(id_produc)) {
        res.json({data:"Error al ingresar id"})
    } else {
        let products = new Archivo("productos.txt");
        res.json({product:carts.addProductToCart(user,products.searchProductId(id_produc))}) 
    }

})

router.post('/borrar/:id',(req: express.Request, res: express.Response)=>{
    let id_delete = parseInt(req.params.id)
    let user = req.body.user

    if (isNaN(id_delete)) {
        res.json({data:"Error al ingresar id"})
    } else {
        res.json({delete:carts.deleteProductToCart(user,id_delete)}) 
    }
})


module.exports = router