import express = require("express");
let __path = require('path');

import { Archivo, DBMongo } from '../clases'

const router = express.Router();

router.get('/bd-listar/:id?', (req: express.Request, res: express.Response) => {
    let id_show = req.params.id
    //console.log(id_show);

    let db = new DBMongo();

    (isNaN(parseInt(req.params.id))?(db.imprimir().then((data:any)=>{res.json(data)})):(db.findById(id_show).then((data:any)=>{res.json(data)})))
})


module.exports = router