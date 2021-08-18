import express = require("express");
import * as fs from "fs";



const app = express();
const puerto = 8080;

const path = __dirname + "/../../assets";
const api = require('./rutas/productos.route');

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.get('/',(req:any,res:any)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.use('/api',api);
app.use(express.static('public'));

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en el puerto ${puerto}`);
});