"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logHandler_1 = require("../helpers/logHandler");
let __path = require('path');
const router = express.Router();
router.get('*', (req, res) => {
    let { url, method } = req;
    logHandler_1.loggerWarn.warn(`Ruta ${method} ${url} no implementada`);
    logHandler_1.loggerInfo.warn(`Ruta ${method} ${url} no implementada`);
    res.json({ data: "Ruta no implementada" });
});
module.exports = router;
//# sourceMappingURL=error.route.js.map