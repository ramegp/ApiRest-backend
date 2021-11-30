"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logHandler_1 = require("../helpers/logHandler");
const DBMongo_1 = require("../utils/DBMongo");
let __path = require('path');
const router = express.Router();
router.get('/:id?', async (req, res) => {
    let id_show = req.params.id;
    let { nombre, preciomax, preciomin, codigo, stockmax, stockmin } = req.query;
    let db = new DBMongo_1.DBMongo();
    if (id_show) {
        logHandler_1.loggerInfo.info(`Request /products por id ${id_show}`);
        db.findById(id_show).then((data) => { res.json(data); });
    }
    else {
        if (nombre) {
            logHandler_1.loggerInfo.info(`Request /products por nombre ${nombre}`);
            db.findByName(nombre.toString()).then((data) => { res.json(data); });
        }
        else {
            if (codigo) {
                logHandler_1.loggerInfo.info(`Request /products por codigo ${codigo}`);
                db.findByCode(codigo.toString()).then((data) => { res.json(data); });
            }
            else {
                if (preciomax && stockmax) {
                    (preciomin) ? (preciomin = preciomin.toString()) : (preciomin = '0');
                    (stockmin) ? (stockmin = stockmin.toString()) : (stockmin = '0');
                    logHandler_1.loggerInfo.info(`Request /products por precio y stock [$ ${preciomax}, ${stockmax}] `);
                    db.findByPriceStock(parseInt(preciomax.toString()), parseInt(preciomin), parseInt(stockmax.toString()), parseInt(stockmin)).then((data) => { res.json(data); });
                }
                else {
                    if (stockmax) {
                        (stockmin) ? (stockmin = stockmin.toString()) : (stockmin = '0');
                        logHandler_1.loggerInfo.info(`Request /products por stock ${stockmax}`);
                        db.findByStock(parseInt(stockmax.toString()), parseInt(stockmin)).then((data) => { res.json(data); });
                    }
                    else {
                        if (preciomax) {
                            (preciomin) ? (preciomin = preciomin.toString()) : (preciomin = '0');
                            logHandler_1.loggerInfo.info(`Request /products por precio ${preciomax}`);
                            db.findByPrice(parseInt(preciomax.toString()), parseInt(preciomin)).then((data) => { res.json(data); });
                        }
                        else {
                            logHandler_1.loggerInfo.info(`Request /products`);
                            db.imprimir().then((data) => { res.json(data); });
                        }
                    }
                }
            }
        }
    }
});
router.post('/', (req, res) => {
    let obj = req.body;
    let db = new DBMongo_1.DBMongo();
    db.addProd(obj).then((prod) => { res.json(prod); });
});
router.delete('/:id', (req, res) => {
    let id_delete = req.params.id;
    logHandler_1.logger.trace(`Request /products metodo ${req.method}`);
    let db = new DBMongo_1.DBMongo();
    db.removeById(id_delete).then((data) => {
        logHandler_1.loggerInfo.info(`Se borro producto id ${id_delete}`);
        res.json(data);
    });
});
router.put('/:id', (req, res) => {
    let id_produc = req.params.id;
    let db = new DBMongo_1.DBMongo();
    let prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp
    };
    db.upDate(id_produc, prod_to_update).then((data) => {
        res.json(data);
    });
});
module.exports = router;
//# sourceMappingURL=products.route.js.map