import express = require("express");
import * as fs from "fs";
import { Archivo } from "./clases";

const app = express();
const puerto = 8080;
const path = __dirname + "/../assets";

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en el puerto ${puerto}`);
});

app.get("/api/productos/listar/:id", (req: express.Request, res: express.Response) => {
    
    let id_search = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    let product_wanted = products.searchProductId(id_search)
    if (product_wanted) {
        return res.json(product_wanted)
    } else {
        return res.json({error:'Producto no encontrado / no existe'})
    }
});

app.get("/api/productos/listar", (req: express.Request, res: express.Response) => {
    let products = new Archivo("productos.txt");
    if (!products.readFile().length) {
        //Esta vacio
        res.json({error:`No hay productos cargados`})
    } else {
        res.json({items:products.readFile()})
    }
});

app.post("/api/productos/guardar", (req: express.Request, res: express.Response) => {
    let products = new Archivo("productos.txt");
    let product_to_save = req.body
    products.saveFile(product_to_save)
    
    return res.json({ msg: "Producto guardado" });
});