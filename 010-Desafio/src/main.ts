import express = require("express");
import * as fs from "fs";


import handlebars = require('express-handlebars')


const app = express();
const puerto = 8080;

const path = __dirname + "/../assets";
const api = require('./rutas/productos.route');

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

/* handlebars */
app.engine('hbs',handlebars(
    {
        extname:'.hbs',
        defaultLayout:'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    }
))

app.set('views',__dirname + '/views');
app.set('view engine','hbs');


app.get('/',(req:any,res:any)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.use('/api',api);
app.use(express.static(__dirname+'/public'));

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en el puerto ${puerto}`);
});