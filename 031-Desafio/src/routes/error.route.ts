import express = require("express");

import { loggerInfo ,loggerWarn } from "../helpers/logHandler";

let __path = require('path');

const router = express.Router();

router.get('*',(req: express.Request, res: express.Response)=>{
    let { url, method } = req
    loggerWarn.warn(`Ruta ${method} ${url} no implementada`)
    loggerInfo.warn(`Ruta ${method} ${url} no implementada`)
    res.json({data:"Ruta no implementada"})
})



module.exports = router