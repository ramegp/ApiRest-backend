import express = require("express");
let __path = require('path');

const router = express.Router();

import { auth } from '../middleware/log'

router.get('/',auth,(req: express.Request, res: express.Response)=>{
    //@ts-ignore
    res.json({admin:req.session.admin})
})


module.exports = router