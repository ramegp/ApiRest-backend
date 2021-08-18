const express = require('express');
let __path = require('path');


//console.log(__path.resolve(__dirname+'/../public/index.html'))

const router = express.Router();

router.get('/productos',(req,res)=>{
    res.sendFile(__path.resolve(__dirname+'/../public/index.html'))
})

router.get('/productos/actualizar',(req,res)=>{
    let title = req.body.title;
    let price = req.body.price;
    let url = req.body.img;
    console.log(req.body)
    res.json({title:title,price:price,url:url})
})

router.put('/productos/actualizar/:id',(req,res)=>{
    res.send('borrara usuario'+req.params.id)
})

router.delete('/productos/borrar/:id',(req,res)=>{
    res.send('actualizara usuario'+req.params.id)
})


module.exports = router