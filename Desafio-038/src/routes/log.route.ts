import express = require("express");

import { authJWT } from '../middleware/log';

import { inicioSesion, registroUser, validarEmail } from "../controlRoutes/log.route";

const router = express.Router();

router.get('/', authJWT, (req: express.Request, res: express.Response) => {
    res.json({ msg: "hola" })

})
/* Inicio de sesion */
router.post('/in', inicioSesion)

//Register sing up

router.post('/up', registroUser)

router.get('/validaremail', validarEmail)


//@ts-ignore

module.exports = router