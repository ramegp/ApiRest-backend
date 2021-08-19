"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Archivo = /** @class */ (function () {
    function Archivo(path) {
        var _this = this;
        if (path === void 0) { path = ''; }
        this.fs = require('fs');
        this.obtenerCantidadProductos = function () {
            //Obtiene la cantidad de productos del archivo para generar el id automatico
            var contenido = _this.fs.readFileSync(__dirname + ("/../../assets/" + _this.filePath), 'utf-8');
            return JSON.parse(contenido).length;
        };
        this.readFile = function () {
            //devuelve los productos del archivo si es que existe
            try {
                var contenido = _this.fs.readFileSync(__dirname + ("/../../assets/" + _this.filePath), 'utf-8');
                return JSON.parse(contenido);
            }
            catch (error) {
                return [];
            }
        };
        this.saveFile = function (obj) {
            //Guarda un producto en un archivo.
            var objSave = __assign(__assign({}, obj), { id: _this.obtenerCantidadProductos() + 1 });
            var products = JSON.parse(_this.fs.readFileSync(__dirname + ("/../../assets/" + _this.filePath), 'utf-8'));
            products.push(objSave);
            _this.fs.writeFileSync(__dirname + ("/../../assets/" + _this.filePath), JSON.stringify(products, null, '\t'));
            return objSave;
        };
        this.deleteFile = function () {
            //Borra el archivo con todos los producos
            _this.fs.unlink(__dirname + ("/" + './text.txt'), function (error) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Deleted");
                }
            });
        };
        this.searchProductId = function (num) {
            //obtengo los productos
            var products_Aux = _this.readFile();
            if (!products_Aux) {
                //No hay productos devuelvo msj no hay
                return undefined;
            }
            else {
                return products_Aux.find(function (e) { return e.id == num; });
            }
        };
        this.upDateProduct = function (id_produc, new_product) {
            var prod_to_update = _this.searchProductId(id_produc);
            if (prod_to_update) {
                prod_to_update = __assign(__assign({}, prod_to_update), { title: new_product.title, price: new_product.price, id: id_produc, thumbnail: new_product.thumbnail });
                var products = _this.readFile();
                products = products.map(function (p) {
                    if (p.id === id_produc) {
                        p = prod_to_update;
                    }
                    return p;
                });
                _this.fs.writeFileSync(__dirname + ("/../../assets/" + _this.filePath), JSON.stringify(products, null, '\t'));
                return prod_to_update;
            }
            else {
                return undefined;
            }
        };
        this.deletedProduct = function (id_produc) {
            var existe = _this.searchProductId(id_produc);
            if (existe) {
                var products = _this.readFile();
                var index_deleted = void 0;
                //products.splice(,1)
                //console.log(products.findIndex((p:any)=>{p.id = id_produc}))
                for (var index = 0; index < products.length; index++) {
                    if (products[index].id === id_produc) {
                        index_deleted = index;
                    }
                }
                products.splice(index_deleted, 1);
                _this.fs.writeFileSync(__dirname + ("/../../assets/" + _this.filePath), JSON.stringify(products, null, '\t'));
                return existe;
            }
            else {
                return 'error, no existe el id';
            }
        };
        this.filePath = path;
    }
    return Archivo;
}());
exports.Archivo = Archivo;
/*
let arch = new Archivo("productos.txt");

console.log(arch.readFile())
arch.deletedProduct(3) */
/* console.log(arch.upDateProduct(2,{"title":"Salamin","price":1000,"thumbnail" : "url foto"}));
console.log(arch.readFile()) */
/* arch.saveFile({
    title: "Cartuchera",
    price: 100,
    thumbnail: 'url'
}); */
//arch.deleteFile();
