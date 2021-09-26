import express = require("express");
let __path = require('path');

const router = express.Router();

const isAdmin = true;

router.get('/',(req: express.Request, res: express.Response)=>{
    res.json({isAdmin})
})



module.exports = router