"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logHandler_1 = require("../helpers/logHandler");
const DBMongo_1 = require("../utils/DBMongo");
let __path = require('path');
const router = express.Router();
router.get('/:id?', (req, res) => {
    let id_show = req.params.id;
    //console.log(id_show);
    let db = new DBMongo_1.DBMongo();
    logHandler_1.logger.trace(`Request /menssages metodo ${req.method}`);
    (id_show) ? (db.showMessagesById(id_show).then((data) => {
        logHandler_1.loggerInfo.info(`Consulta por un mensaje id ${id_show}`);
        res.json(data);
    })) : (db.showMessages().then((data) => {
        logHandler_1.loggerInfo.info(`Consulta por todos los mensajes`);
        res.json(data);
    }));
});
router.post('/', (req, res) => {
    let msg_to_add = req.body;
    logHandler_1.logger.trace(`Request /menssages metodo ${req.method}`);
    if (Object.keys(msg_to_add).length != 0) {
        let db = new DBMongo_1.DBMongo();
        db.addMessage(msg_to_add).then((msg) => {
            logHandler_1.loggerInfo.info(`Se guardo el mensaje en la base de datos`);
            res.json(msg);
        });
    }
    else {
        logHandler_1.loggerInfo.warn(`No se probeyo del mensaje`);
        logHandler_1.loggerWarn.warn(`No se probeyo del mensaje`);
        res.json({ error: "No se probeyo mensaje" });
    }
});
router.delete('/:id', (req, res) => {
    let id_delete = req.params.id;
    logHandler_1.logger.trace(`Request /menssages metodo ${req.method}`);
    let db = new DBMongo_1.DBMongo();
    db.removeMessageById(id_delete).then((data) => {
        logHandler_1.loggerInfo.info(`Se borro mensaje con id ${id_delete}`);
        res.json(data);
    });
});
module.exports = router;
//# sourceMappingURL=messages.route.js.map