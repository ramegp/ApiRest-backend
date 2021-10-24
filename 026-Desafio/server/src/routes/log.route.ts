import express = require("express");
import { DBMongo } from "../utils/DBMongo";

import bCrypt = require('bcrypt');



import { jwt, authJWT, generateAuthToken } from '../middleware/log';

import { UsuarioPassport, UsuarioPassportMongo } from "../utils/Interfaces";

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
    console.log(userRegister);
    
    const db = new DBMongo()
    db.findUserByEmail(userRegister.user).then((user: any) => {

        if (user.length != 0) {
            
            let credencialesOk = user[0].user == userRegister.user && isValidPassword(user[0],userRegister.pass)

            if (credencialesOk) {

                const token = generateAuthToken(user.user);
                res.header("x-auth-token", token).json({
                    username: user[0].user,
                    token
                });
            }
            else {
                res.json({ error: 'error de credenciales' });
            }
        }
        else {
            res.json({ error: 'usuario no existe' });
        }
    })

})

router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
})

//Register sing up
router.get('/up', (req: express.Request, res: express.Response) => {
    res.send('singup')
})

router.post('/up', (req: express.Request, res: express.Response) => {
    let { username, password } = req.body
    let userRegister = {
        user: req.body.username,
        pass: createHash(req.body.password)
    }
    
    const db = new DBMongo()
    db.findUserOrCreate(userRegister.user, userRegister).then((user: any) => {

        if (Object.keys(user).length == 0) {
            res.json({ error: 'Ya existe el email' });
        }
        else {

            const token = generateAuthToken(user.user);
            res.header("x-auth-token", token).json({
                username: user.user,
                token
            });
        }
    })
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