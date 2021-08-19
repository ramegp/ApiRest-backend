"use strict";
exports.__esModule = true;
var express = require("express");
var handlebars = require("express-handlebars");
var app = express();
var puerto = 8080;
var path = __dirname + "/../../assets";
var api = require('./rutas/productos.route');
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
/* handlebars */
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('views', './views');
app.set('view engine', 'hbs');
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use('/api', api);
app.use(express.static('public'));
var server = app.listen(puerto, function () {
    console.log("servidor inicializado en el puerto " + puerto);
});
