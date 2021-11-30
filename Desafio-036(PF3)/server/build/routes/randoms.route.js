"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let __path = require('path');
const { fork } = require('child_process');
const router = express.Router();
router.get('/', (req, res) => {
    let { cant } = req.query;
    //100000000
    let num = parseInt(cant ? cant.toString() : "") || 100000000;
    //console.log(__dirname);
    let arreglo = [];
    const computo = fork(`${__dirname}/computo.js`);
    computo.send({ cantidad: num });
    computo.on('message', (obj) => {
        res.json({ datos: obj });
    });
});
module.exports = router;
//# sourceMappingURL=randoms.route.js.map