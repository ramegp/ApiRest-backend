"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var app = express();
var puerto = 8080;
var server = app.listen(puerto, function () {
    console.log("servidor inicializado en el puerto " + server.address());
});
app.get('/', function (req, res) {
    res.json({ msg: 'text' });
});
app.get('/mundo', function (req, res) {
    res.send('<h1 style="color:red">Hola mundo</h1>');
});
app.get('/productos', function (req, res) {
    var rand = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    fs.promises.readFile('./productos.txt').then(function (data) { return data.toString('utf-8'); }).then(function (datos) {
        var json = JSON.parse(datos);
        res.json({ item: json[rand(0, json.length - 1)] });
    });
});
app.get('/items', function (req, res) {
    var visitas = JSON.parse(fs.readFileSync('./assets/visitas.txt', 'utf-8'));
    visitas[0].items++;
    fs.writeFileSync('./assets/visitas.txt', JSON.stringify(visitas, null, '\t'));
    fs.promises.readFile('./assets/productos.txt').then(function (data) { return data.toString('utf-8'); }).then(function (datos) {
        res.json({ items: JSON.parse(datos), cantidad: JSON.parse(datos).length });
    });
});
app.get('/item-random', function (req, res) {
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    var visitas = JSON.parse(fs.readFileSync('./assets/visitas.txt', 'utf-8'));
    visitas[0].item++;
    fs.writeFileSync('./assets/visitas.txt', JSON.stringify(visitas, null, '\t'));
    fs.promises.readFile('./assets/productos.txt').then(function (data) { return data.toString('utf-8'); }).then(function (datos) {
        res.json({ item: JSON.parse(datos)[random(0, JSON.parse(datos).length)] });
    });
});
app.get('/visitas', function (req, res) {
    fs.promises.readFile('./assets/visitas.txt').then(function (data) { return data.toString('utf-8'); }).then(function (datos) {
        res.json({ visitas: JSON.parse(datos)[0] });
    });
});
