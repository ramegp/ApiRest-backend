import express = require("express");
import { logger, loggerInfo, loggerWarn } from "../helpers/logHandler";
import { DBMongo } from "../utils/DBMongo";
let __path = require('path');


const router = express.Router();

router.get('/:id?', (req: express.Request, res: express.Response) => {
    let id_show = req.params.id
    //console.log(id_show);
    
    let db = new DBMongo();
    logger.trace(`Request /menssages metodo ${req.method}`); 
    (id_show)?(db.showMessagesById(id_show).then((data:any)=>{
        loggerInfo.info(`Consulta por un mensaje id ${id_show}`)
        res.json(data)})):(db.showMessages().then((data:any)=>{
            loggerInfo.info(`Consulta por todos los mensajes`)
            res.json(data)}))
})

router.post('/', (req: express.Request, res: express.Response) => {
    let msg_to_add = req.body
    logger.trace(`Request /menssages metodo ${req.method}`);
    if (Object.keys(msg_to_add).length != 0) {
        let db = new DBMongo();
        db.addMessage(msg_to_add).then((msg)=>{
            loggerInfo.info(`Se guardo el mensaje en la base de datos`)
            res.json(msg)})
        
    } else {
        loggerInfo.warn(`No se probeyo del mensaje`);
        loggerWarn.warn(`No se probeyo del mensaje`);
        res.json({error:"No se probeyo mensaje"})
    }
    
})

router.delete('/:id', (req: express.Request, res: express.Response) => {
    let id_delete = req.params.id
    logger.trace(`Request /menssages metodo ${req.method}`);
    let db = new DBMongo();
        db.removeMessageById(id_delete).then((data:any)=>{
            loggerInfo.info(`Se borro mensaje con id ${id_delete}`)
            res.json(data)
        })
})


module.exports = router