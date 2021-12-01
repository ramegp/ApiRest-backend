import express = require("express");
import { Db } from "mongodb";
import { notificacionCompra } from "../helpers/notificacion";
import { Archivo } from "../utils/Archivo";
import { DBCart } from "../utils/DBCart";
import { DBMongo } from "../utils/DBMongo";
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

router.get('/:idUser/buy',(req: express.Request, res: express.Response)=>{
    let user = req.params.idUser;

    let DB = new DBCart()
    DB.buscando(user).then((data:any)=>{
        console.log(data);
        
        let productos = ``;
        let precio_total = 0
        for (const p of data[0].productos) {
            precio_total += p.price;
            let aux = `producto ${p.title} cantidad ${p.cantidad}`;
            productos += aux;
        }

        let detalle_compra = {
            fecha: new Date(),
            user:user,
            productos:productos,
            total:precio_total
        }
        notificacionCompra(detalle_compra)
        res.json(data)
    })
    
});

router.put('/:idUser',(req: express.Request, res: express.Response)=>{
    if (req.query.idProd) {
        
        let { idUser } = req.params
        
        let { cantidad } = req.query
        
        let DBProductos = new DBMongo()
        
        DBProductos.findById(req.query.idProd.toString()).then((data:any)=>{
            
            let DB = new DBCart();
            let prod_add_to_cart = {
                title:data[0].title,
                //@ts-ignore
                cantidad:parseInt(cantidad),
                price:data[0].price
            }
            
            DB.addProdCartUser(idUser,prod_add_to_cart).then((data:any)=>{
                console.log('entre');
                
                res.json({data})})

        })

        
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


router.post('/:idUser/finalizar',(req: express.Request, res: express.Response)=>{
    console.log(`${req.params.idUser}`);
    let DB = new DBCart()
    DB.finalizoCartUser(req.params.idUser).then((data:any)=>{res.json({data})})
})






module.exports = router