import express = require("express");
import { DBMongo } from "../utils/DBMongo";

import bCrypt = require('bcrypt');



import { jwt, authJWT, generateAuthToken } from '../middleware/log';

import { UsuarioPassport, UsuarioPassportMongo } from "../utils/Interfaces";
import { loggerInfo, loggerWarn } from "../helpers/logHandler";

const router = express.Router();

//---------------------------------------------------------//
// Generates hash using bCrypt
var createHash = function (password: string) {
    //@ts-ignore
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


var isValidPassword = function (user: UsuarioPassportMongo, password: string) {
    return bCrypt.compareSync(password, user.pass);
}


router.get('/', authJWT, (req: express.Request, res: express.Response) => {
    res.json({ msg: "hola" })

})

router.post('/in', (req: express.Request, res: express.Response) => {
    let userRegister = {
        user: req.body.username,
        pass: req.body.password
    }

    if (userRegister.user & userRegister.pass) {
        
        const db = new DBMongo()
        db.findUserByEmail(userRegister.user).then((user: any) => {
    
            if (user.length != 0) {
                
                let credencialesOk = user[0].user == userRegister.user && isValidPassword(user[0],userRegister.pass)
    
                if (credencialesOk) {
    
                    const token = generateAuthToken(user.user);
                    loggerInfo.info(`Usuario ${user[0].user} inicio sesion ${(new Date).toDateString()}`)
                    res.header("x-auth-token", token).json({
                        username: user[0].user,
                        token
                    });
                }
                else {
                    loggerInfo.warn(`Intento Fallido de inicio de sesion - Error en las credenciales`);
                    loggerWarn.warn(`Intento Fallido de inicio de sesion - Error en las credenciales`);
                    res.json({ error: 'error de credenciales' });
                }
            }
            else {
                loggerInfo.warn(`Intento Fallido de inicio de sesion - Usuario no existe`);
                loggerWarn.warn(`Intento Fallido de inicio de sesion - Usuario no existe`);
                res.json({ error: 'usuario no existe' });
            }
        })
    } else {
        loggerWarn.warn(`No se puede iniciar sesion sin username y password -- Ruta sing/in `)
        loggerInfo.warn(`No se puede iniciar sesion sin username y password -- Ruta sing/in ${(new Date)}`)
        
        res.json({error:"Falta pasar username y password"})
    }
    

})

router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
})

//Register sing up
router.get('/up', (req: express.Request, res: express.Response) => {
    res.send('singup')
})

router.post('/up', (req: express.Request, res: express.Response) => {
    if (req.body.username & req.body.password) {
        
        let { username, password } = req.body
        let userRegister = {
            user: req.body.username,
            pass: createHash(req.body.password)
        }
        
        
        const db = new DBMongo()
        db.findUserOrCreate(userRegister.user, userRegister).then((user: any) => {
    
            if (Object.keys(user).length == 0) {
                loggerWarn.warn(`Usuario ya registrado con ese mail`);
                loggerInfo.warn(`Usuario ya registrado con ese mail`);
                
                res.json({ error: 'Ya existe el email' });
            }
            else {
    
                const token = generateAuthToken(user.user);
                loggerInfo.info(`Usuario creado ${user.user}`)
                res.header("x-auth-token", token).json({
                    username: user.user,
                    token
                });
            }
        })
    } else {
        loggerWarn.warn(`Faltan pasar username y password para la ruta /sing/up `)
        loggerInfo.warn(`Faltan pasar username y password para la ruta /sing/up `)
        
        res.json({error:"Falta pasar username y password"})
        
    }
})

router.get('/failregister', (req: express.Request, res: express.Response) => {
    res.render('register-error', {});
})

//SingOut

router.get('/out', (req: express.Request, res: express.Response) => {
    req.logout()
    res.render("logout")
})

router.get('/datos', (req: express.Request, res: express.Response) => {

    res.json({ datos: process.argv })
})
//@ts-ignore

module.exports = router