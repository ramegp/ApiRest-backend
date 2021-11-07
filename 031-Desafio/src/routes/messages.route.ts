import express = require("express");
import { DBMongo } from "../utils/DBMongo";
let __path = require('path');


const router = express.Router();

router.get('/:id?', (req: express.Request, res: express.Response) => {
    let id_show = req.params.id
    //console.log(id_show);
    
    let db = new DBMongo();
    
    (id_show)?(db.showMessagesById(id_show).then((data:any)=>{res.json(data)})):(db.showMessages().then((data:any)=>{res.json(data)}))
})

router.post('/', (req: express.Request, res: express.Response) => {
    let msg_to_add = req.body

    let db = new DBMongo();
    db.addMessage(msg_to_add).then((msg)=>{res.json(msg)})
    
})

router.delete('/:id', (req: express.Request, res: express.Response) => {
    let id_delete = req.params.id

    let db = new DBMongo();
    db.removeMessageById(id_delete).then((data:any)=>{
        res.json(data)
    })
})


module.exports = router