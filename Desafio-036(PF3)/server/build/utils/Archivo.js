"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Archivo {
    constructor(path = '') {
        this.fs = require('fs');
        this.obtenerCantidadProductos = () => {
            //Obtiene la cantidad de productos del archivo para generar el id automatico
            let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8');
            return JSON.parse(contenido).length;
        };
        this.readFile = () => {
            //devuelve los productos del archivo si es que existe
            try {
                let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8');
                return JSON.parse(contenido);
            }
            catch (error) {
                return [];
            }
        };
        this.saveFile = (obj) => {
            //Guarda un producto en un archivo.
            let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 };
            let products = JSON.parse(this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8'));
            products.push(objSave);
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'));
            return objSave;
        };
        this.deleteFile = () => {
            //Borra el archivo con todos los producos
            this.fs.unlink(__dirname + `/${'./text.txt'}`, (error) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Deleted");
                }
            });
        };
        this.searchProductId = (num) => {
            //obtengo los productos
            let products_Aux = this.readFile();
            if (!products_Aux) {
                //No hay productos devuelvo msj no hay
                return undefined;
            }
            else {
                return products_Aux.find((e) => e.id == num);
            }
        };
        this.upDateProduct = (id_produc, new_product) => {
            let prod_to_update = this.searchProductId(id_produc);
            if (prod_to_update) {
                prod_to_update = { ...prod_to_update, title: new_product.title, price: new_product.price, id: id_produc, thumbnail: new_product.thumbnail, stock: new_product.stock, description: new_product.description, codigo: new_product.codigo, timestamp: new_product.timestamp, };
                let products = this.readFile();
                products = products.map((p) => {
                    if (p.id === id_produc) {
                        p = prod_to_update;
                    }
                    return p;
                });
                this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'));
                return prod_to_update;
            }
            else {
                return undefined;
            }
        };
        this.deletedProduct = (id_produc) => {
            let existe = this.searchProductId(id_produc);
            if (existe) {
                let products = this.readFile();
                let index_deleted;
                //products.splice(,1)
                //console.log(products.findIndex((p:any)=>{p.id = id_produc}))
                for (let index = 0; index < products.length; index++) {
                    if (products[index].id === id_produc) {
                        index_deleted = index;
                    }
                }
                // @ts-ignore
                products.splice(index_deleted, 1);
                this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'));
                return existe;
            }
            else {
                return 'error, no existe el id';
            }
        };
        this.filePath = path;
    }
}
exports.Archivo = Archivo;
//# sourceMappingURL=Archivo.js.map