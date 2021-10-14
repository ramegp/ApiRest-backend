import express = require("express");
let __path = require('path');

const router = express.Router();

import { auth } from '../middleware/log'

router.get('/',(req: express.Request, res: express.Response)=>{
    /* cuando consulto a esta ruta no me devuelve el la session y el usuario */
    
    console.log(`${req.session.user} `);
    //@ts-ignore
    //req.session.cookie.expires = 15000;
    //@ts-ignore
    req.session.cookie.maxAge = 10000;
    (req.session.user)?(res.json({user:req.session.user,admin:req.session.admin})):(res.json({user:null,admin:false}))
})

router.post('/',(req: express.Request, res: express.Response)=>{
    //Log de session
    const {user,password } = req.body
    
    if (!user && !password) {
        res.json({status:"error",body:"completar usuario y password"})
    } else {

        //@ts-ignore
        req.session.cookie.maxAge = 10000;
        
        req.session.user = user;
        
        console.log(req.session.user);
        
        
        req.session.admin = (user === process.env.useradmin && password === process.env.passwordadmin);
        console.log(`Ùsuario conectado ${user}`);
        
        
        res.json({status:"ok",admin:req.session.admin})
    }
})

router.get('/out',(req: express.Request, res: express.Response)=>{
    //Cierra la session
    
    req.session.destroy((err:any)=>{
        if (!err) res.json({status:"ok"})
        else res.json({status:"error",body:err})
    })
})

router.get('/content',auth,(req: express.Request, res: express.Response)=>{
    res.json({msg:"Admin"})
})


module.exports = router