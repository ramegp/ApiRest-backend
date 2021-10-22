import express = require("express");

import passport = require('passport');
import bCrypt = require('bcrypt');
import { Strategy as LocalStrategy } from "passport-local";

const router = express.Router();

import { jwt ,authJWT, generateAuthToken } from '../middleware/log';
import { DBMongo } from "../utils/DBMongo";
import { UsuarioPassport, UsuarioPassportMongo } from "../utils/Interfaces";


//---------------------------------------------------------//
router.get('/',(req: express.Request, res: express.Response)=>{
    res.json({msg:"hola"})

})

router.post('/in',(req: express.Request, res: express.Response) => {
    let userRegister = {
        user:req.body.username,
        pass:req.body.password
    }
    const db = new DBMongo()
    db.findUserByEmail(userRegister.user).then((user:any)=>{

        if(user.length != 0) {
            
            
            let credencialesOk = user[0].user==userRegister.user && user[0].pass==userRegister.pass
            
            if(credencialesOk) {
                
                const token = generateAuthToken(user.user);
                res.header("x-auth-token", token).send({
                    username: user[0].user
                });
            }
            else {
                res.json({error: 'error de credenciales'});
            }
        }
        else {
            res.json({error: 'usuario no existe'});
        }
    })
    
})

router.get('/faillogin', (req,res) => {
    res.render('login-error', {});
})

//Register sing up
router.get('/up', (req: express.Request, res: express.Response) => {
    res.send('singup')
})

router.post('/up',(req: express.Request, res: express.Response) => {
    let { username, password } = req.body
    let userRegister = {
        user:req.body.username,
        pass:req.body.password
    }
    const db = new DBMongo()
    db.findUserOrCreate(userRegister.user,userRegister).then((user:any)=>{

        if(Object.keys(user).length == 0) {
            res.json({error: 'error user register'}); 
        }
        else {
            
            const token = generateAuthToken(user.user);
            res.header("x-auth-token", token).send({
                username: user.user
            });
        }
    })
})

router.get('/failregister', (req: express.Request, res: express.Response) => {
    res.render('register-error', {});
})

//SingOut

router.get('/out',(req: express.Request, res: express.Response) => {
    req.logout()
    res.render("logout")
})



module.exports = router