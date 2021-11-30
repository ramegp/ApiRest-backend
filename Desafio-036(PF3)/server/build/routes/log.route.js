"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DBMongo_1 = require("../utils/DBMongo");
const bCrypt = require("bcrypt");
const log_1 = require("../middleware/log");
const logHandler_1 = require("../helpers/logHandler");
const router = express.Router();
//---------------------------------------------------------//
// Generates hash using bCrypt
var createHash = function (password) {
    //@ts-ignore
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.pass);
};
router.get('/', log_1.authJWT, (req, res) => {
    res.json({ msg: "hola" });
});
router.post('/in', (req, res) => {
    let userRegister = {
        user: req.body.username,
        pass: req.body.password
    };
    if (userRegister.user & userRegister.pass) {
        const db = new DBMongo_1.DBMongo();
        db.findUserByEmail(userRegister.user).then((user) => {
            if (user.length != 0) {
                let credencialesOk = user[0].user == userRegister.user && isValidPassword(user[0], userRegister.pass);
                if (credencialesOk) {
                    const token = log_1.generateAuthToken(user.user);
                    logHandler_1.loggerInfo.info(`Usuario ${user[0].user} inicio sesion ${(new Date).toDateString()}`);
                    res.header("x-auth-token", token).json({
                        username: user[0].user,
                        token
                    });
                }
                else {
                    logHandler_1.loggerInfo.warn(`Intento Fallido de inicio de sesion - Error en las credenciales`);
                    logHandler_1.loggerWarn.warn(`Intento Fallido de inicio de sesion - Error en las credenciales`);
                    res.json({ error: 'error de credenciales' });
                }
            }
            else {
                logHandler_1.loggerInfo.warn(`Intento Fallido de inicio de sesion - Usuario no existe`);
                logHandler_1.loggerWarn.warn(`Intento Fallido de inicio de sesion - Usuario no existe`);
                res.json({ error: 'usuario no existe' });
            }
        });
    }
    else {
        logHandler_1.loggerWarn.warn(`No se puede iniciar sesion sin username y password -- Ruta sing/in `);
        logHandler_1.loggerInfo.warn(`No se puede iniciar sesion sin username y password -- Ruta sing/in ${(new Date)}`);
        res.json({ error: "Falta pasar username y password" });
    }
});
router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
});
//Register sing up
router.get('/up', (req, res) => {
    res.send('singup');
});
router.post('/up', (req, res) => {
    if (req.body.username & req.body.password) {
        let { username, password } = req.body;
        let userRegister = {
            user: req.body.username,
            pass: createHash(req.body.password)
        };
        const db = new DBMongo_1.DBMongo();
        db.findUserOrCreate(userRegister.user, userRegister).then((user) => {
            if (Object.keys(user).length == 0) {
                logHandler_1.loggerWarn.warn(`Usuario ya registrado con ese mail`);
                logHandler_1.loggerInfo.warn(`Usuario ya registrado con ese mail`);
                res.json({ error: 'Ya existe el email' });
            }
            else {
                const token = log_1.generateAuthToken(user.user);
                logHandler_1.loggerInfo.info(`Usuario creado ${user.user}`);
                res.header("x-auth-token", token).json({
                    username: user.user,
                    token
                });
            }
        });
    }
    else {
        logHandler_1.loggerWarn.warn(`Faltan pasar username y password para la ruta /sing/up `);
        logHandler_1.loggerInfo.warn(`Faltan pasar username y password para la ruta /sing/up `);
        res.json({ error: "Falta pasar username y password" });
    }
});
router.get('/failregister', (req, res) => {
    res.render('register-error', {});
});
//SingOut
router.get('/out', (req, res) => {
    req.logout();
    res.render("logout");
});
router.get('/datos', (req, res) => {
    res.json({ datos: process.argv });
});
//@ts-ignore
module.exports = router;
//# sourceMappingURL=log.route.js.map