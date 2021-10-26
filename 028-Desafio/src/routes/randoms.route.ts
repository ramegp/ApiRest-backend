import express = require("express");
let __path = require('path');

const { fork } = require('child_process')

const router = express.Router();

router.get('/',(req: express.Request, res: express.Response)=>{
    let { cant } = req.query
    let num = parseInt(cant? cant.toString():"") || 100000000
    
    console.log(__dirname);
    
    const computo = fork(`${__dirname}/computo.js`)
    computo.send('start')
    computo.on('message', (obj:any) => {
        res.json({datos:obj})
    })

})


module.exports = router