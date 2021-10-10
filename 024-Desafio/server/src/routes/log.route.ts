import { resolveSoa } from "dns";
import express = require("express");
let __path = require('path');

const router = express.Router();

import { auth } from '../middleware/log'

router.get('/',(req: express.Request, res: express.Response)=>{
    //@ts-ignore
    (req.session)?(res.json({user:req.session.user,admin:req.session.admin})):(res.json({}))
})

router.get('/in',(req: express.Request, res: express.Response)=>{
    //Log de session
    const {userName,userPassword } = req.body
    
    if (!userName && !userPassword) {
        res.json({status:"error",body:"completar usuario y password"})
    } else {

        //@ts-ignore
        req.session.user = userName;
        //@ts-ignore
        req.session.admin = (userName === process.env.useradmin && userPassword === process.env.passwordadmin);
        //@ts-ignore
        res.json({status:"ok",admin:req.session.admin})
    }
})

router.get('/out',(req: express.Request, res: express.Response)=>{
    //Cierra la session
    //@ts-ignore
    req.session.destroy((err:any)=>{
        if (!err) res.json({status:"ok"})
        else res.json({status:"error",body:err})
    })
})

router.get('/content',auth,(req: express.Request, res: express.Response)=>{
    res.json({msg:"Admin"})
})


module.exports = router