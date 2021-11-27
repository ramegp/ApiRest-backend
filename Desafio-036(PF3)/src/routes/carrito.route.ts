import express = require("express");
import { Db } from "mongodb";
import { Archivo } from "../utils/Archivo";
import { DBCart } from "../utils/DBCart";
import { HandleCarts } from "../utils/HandleCarts";
let __path = require('path');

//import { Archivo, Cart, HandleCarts } from '../clases'


const router = express.Router();

const carts = new HandleCarts();

//Pasar todo por query y hacer las rutas get
router.get('/:idUser',(req: express.Request, res: express.Response)=>{
    let user = req.params.idUser;

    let DB = new DBCart()
    DB.findCartUser(user).then((data:any)=>{res.json(data)})
});

router.get('/:idUser/all',(req: express.Request, res: express.Response)=>{
    let user = req.params.idUser;

    let DB = new DBCart()
    DB.findAllCartUser(user).then((data:any)=>{res.json(data)})
});


router.put('/:idUser',(req: express.Request, res: express.Response)=>{
    if (req.query.idProd) {
        let DB = new DBCart();

        let prod_add_to_cart = {
            title:req.query.idProd,
            cantidad:1,
            price:20
        }

        DB.addProdCartUser(req.params.idUser,prod_add_to_cart).then((data:any)=>{res.json({data})})
        
    } else {
        res.json({error:"No hay id prod"})
    }
})

router.delete('/:idUser',(req: express.Request, res: express.Response)=>{
    if (req.query.idProd) {
        console.log(`Elimina del carrito del usuario ${req.params.idUser} el producto ${req.query.idProd}`);
        res.json({data:"ok"})
        
    } else {
        res.json({error:"No hay id prod"})
    }
})

router.put('/:idUser/find',(req: express.Request, res: express.Response)=>{
    if (req.query.idProd) {
        let DB = new DBCart();

        let prod_add_to_cart = {
            title:req.query.idProd,
            cantidad:5,
            price:20
        }

        DB.buscando(req.params.idUser,prod_add_to_cart).then((data:any)=>{res.json({data})})
        
    } else {
        res.json({error:"No hay id prod"})
    }
})

router.post('/:idUser/finalizar',(req: express.Request, res: express.Response)=>{
    console.log(`${req.params.idUser}`);
    let DB = new DBCart()
    DB.finalizoCartUser(req.params.idUser).then((data:any)=>{res.json({data})})
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