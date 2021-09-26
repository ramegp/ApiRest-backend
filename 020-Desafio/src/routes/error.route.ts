import express = require("express");
let __path = require('path');

const router = express.Router();

router.get('*',(req: express.Request, res: express.Response)=>{
    
    res.json({data:"error"})
})



module.exports = router