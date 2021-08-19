"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var app = express();
var puerto = 8080;
var path = "../assets";
var server = app.listen(puerto, function () {
    console.log("servidor inicializado en el puerto " + puerto);
});
var crearArchivo = function (nombreArchivo) {
    var visitas = [
        {
            items: 0,
            item: 0
        },
    ];
    // if (!fs.existsSync(nombreArchivo)) { //esto seria si quiero guardar el contenido
    //   fs.writeFileSync(
    //   path + "/" + nombreArchivo,
    //   JSON.stringify(visitas, null, "\t")
    // );
    // }
    fs.writeFileSync(path + "/" + nombreArchivo, JSON.stringify(visitas, null, "\t"));
    //esto es para pisarlo cada vez que inicio el server
};
crearArchivo("visitas.txt");
app.get("/", function (req, res) {
    return res.json({ msg: "Home" });
});
app.get("/items", function (req, res) {
    var visitas = JSON.parse(fs.readFileSync(path + "/visitas.txt", "utf-8"));
    visitas[0].items++;
    fs.writeFileSync(path + "/visitas.txt", JSON.stringify(visitas, null, "\t"));
    fs.promises
        .readFile(path + "/productos.txt")
        .then(function (data) { return data.toString("utf-8"); })
        .then(function (datos) {
        res.json({
            items: JSON.parse(datos),
            cantidad: JSON.parse(datos).length
        });
    });
});
app.get("/item-random", function (req, res) {
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    var visitas = JSON.parse(fs.readFileSync(path + "/visitas.txt", "utf-8"));
    visitas[0].item++;
    fs.writeFileSync(path + "/visitas.txt", JSON.stringify(visitas, null, "\t"));
    fs.promises
        .readFile(path + "/productos.txt")
        .then(function (data) { return data.toString("utf-8"); })
        .then(function (datos) {
        return res.json({
            item: JSON.parse(datos)[random(0, JSON.parse(datos).length)]
        });
    });
});
app.get("/visitas", function (req, res) {
    fs.promises
        .readFile(path + "/visitas.txt")
        .then(function (data) { return data.toString("utf-8"); })
        .then(function (datos) {
        return res.json({ visitas: JSON.parse(datos)[0] });
    });
});
