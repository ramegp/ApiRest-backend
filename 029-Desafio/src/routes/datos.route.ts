import express = require("express");
let __path = require('path');

const router = express.Router();

const argumentos_entrada = process.argv.slice()

router.get('/',(req: express.Request, res: express.Response)=>{

    res.json({
        argumentos:process.argv.slice(2),
        SO:process.platform,
        version_node:process.version,
        uso_memoria:process.memoryUsage(),
        path_ejecucion:__filename,
        pid:process.pid,
        carpeta:process.cwd(),
        worker:process.pid,
        date:new Date().toLocaleString()
    })
})


module.exports = router