"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logHandler_1 = require("../helpers/logHandler");
let __path = require('path');
const router = express.Router();
const argumentos_entrada = process.argv.slice();
router.get('/', (req, res) => {
    let { url, method } = req;
    logHandler_1.loggerInfo.info(`Request a la ruta /datos por el metodo ${method}`);
    res.json({
        argumentos: process.argv.slice(2),
        SO: process.platform,
        version_node: process.version,
        uso_memoria: process.memoryUsage(),
        path_ejecucion: __filename,
        pid: process.pid,
        carpeta: process.cwd(),
        worker: process.pid,
        date: new Date().toLocaleString()
    });
});
module.exports = router;
//# sourceMappingURL=datos.route.js.map