import { isArrowFunction } from "typescript";
import { HandlePersistenciaProductos } from "./AbstracClass";
import { Producto } from "./Interfaces";

let instance_class_archivo: Archivo | null = null

export class Archivo implements HandlePersistenciaProductos {
    private filePath: string;
    private fs = require('fs');

    constructor(path: string = '') {
        this.filePath = path;
    }

    getFilePath = () =>{
        return this.filePath
    }

    static getInstanceClassArchivo (){
        if(!instance_class_archivo){
            instance_class_archivo = new Archivo("productos.txt")
        }

        return instance_class_archivo
    }

    private obtenerCantidadProductos = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        let contenido = this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8')
        return JSON.parse(contenido).length
    }

    getAllProducts = () => {
        //devuelve los productos del archivo si es que existe

        try {
            
            let contenido = this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8');
            return new Promise((resolve,reject)=>{
                resolve(JSON.parse(contenido))
            })
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }

    }

    addProd = (obj: any) => {
        //Guarda un producto en un archivo.
        let objSave = { ...obj, id: (this.obtenerCantidadProductos() + 1 ).toString(),timestamp: new Date().toString()}
        let products = JSON.parse(this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8'));
        products.push(objSave)
        this.fs.writeFileSync(__dirname + `/../../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
        return new Promise((resolve,reject)=>{
            resolve(objSave)
        })
    }

    /* deleteFile = (): void => {
        //Borra el archivo con todos los producos
        this.fs.unlink(__dirname + `/${'./text.txt'}`, (error: any) => {
            if (error) {
                console.log(error)

            } else {
                console.log("Deleted")
            }
        })

    } */


    findById = async (num: string) => {
        //obtengo los productos
        let products_Aux:any = undefined 
        return await this.getAllProducts().then((result: any) => {
            
            if (result.length == 0) {
                //No hay productos devuelvo msj no hay
                console.log("no hay");
                
                return new Promise((resolve,reject)=>{
                    resolve(undefined)
                })
            } else {
                let producto_devolver = result.find((e: any) => e.id == num)
                
                
                return new Promise((resolve,reject)=>{
                    resolve(producto_devolver)
                })
            }
        })
        
    }

    upDate = async (id_produc: string, new_product: Producto) => {
        let prod_to_update: any = undefined
        return this.findById(id_produc).then((result:any)=>{
            prod_to_update = result
            if (prod_to_update) {
                prod_to_update = { ...prod_to_update, title: new_product.title, price: new_product.price, id: id_produc, thumbnail: new_product.thumbnail, stock: new_product.stock, description: new_product.description, codigo: new_product.codigo, timestamp: new_product.timestamp, }
    
                return this.getAllProducts().then((result: any) => {
                    
                    result = result.map((p: any) => {
                        if (p.id === id_produc) {
                            p = prod_to_update
                        }
                        return p
                    })
                    this.fs.writeFileSync(__dirname + `/../../assets/${this.filePath}`, JSON.stringify(result, null, '\t'))
                    return new Promise((resolve,reject)=>{
                        resolve(prod_to_update)
                    })
                }).catch((err: any) => {
                    
                });
            } else {
                return new Promise((resolve,reject)=>{
                    resolve(undefined)
                })
            }
        })
    }

    removeById = (id_produc: string) => {
        let existe = this.findById(id_produc)
        if (existe) {
            let products = this.getAllProducts();
            let index_deleted: number;
            //products.splice(,1)
            //console.log(products.findIndex((p:any)=>{p.id = id_produc}))
            for (let index = 0; index < products.length; index++) {
                if (products[index].id === id_produc) {
                    index_deleted = index
                }
            }
            // @ts-ignore
            products.splice(index_deleted, 1)
            this.fs.writeFileSync(__dirname + `/../../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
            return existe
        } else {
            return 'error, no existe el id'
        }
    }
    findByName = async (name: string) => {
       return await this.getAllProducts().then((result: any) => {
            return new Promise((resolve,reject)=>{
                resolve(result.filter((p:any)=>{return p.title === name}))
            })
        }).catch((err: any) => {
            return new Promise((resolve,reject)=>{
                resolve([])
            })
        });
    }

    findByCode = async (code: string) => {
        return await this.getAllProducts().then((result: any) => {
            return new Promise((resolve,reject)=>{
                resolve(result.filter((p:any)=>{return p.codigo === code}))
            })
        }).catch((err: any) => {
            return new Promise((resolve,reject)=>{
                resolve([])
            })
        });
    }

    findByPrice = async (price_max: number, price_min: number = 0) => {
        //Pasamos primero el precio mayor 
        
        if (price_min <= price_max) {
            return await this.getAllProducts().then((result: any) => {
                return new Promise((resolve,reject)=>{
                    resolve(result.filter((p:any)=>{
                        return ((p.price <= price_max)&&(p.price >= price_min))
                    }))
                })
            }).catch((err: any) => {
                return new Promise((resolve,reject)=>{
                    resolve([])
                })
            });
            

        } else {
            return new Promise((resolve,reject)=>{
                resolve([])
            })
        }
    }

    findByStock = async (stock_max: number, stock_min: number=0) => {
        //Pasamos primero el precio mayor 

        if (stock_min <= stock_max) {

            return await this.getAllProducts().then((result: any) => {
                return new Promise((resolve,reject)=>{
                    resolve(result.filter((p:any)=>{
                        return ((p.stock <= stock_max)&&(p.stock >= stock_min))
                    }))
                })
            }).catch((err: any) => {
                return new Promise((resolve,reject)=>{
                    resolve([])
                })
            });
            

        } else {
            return new Promise((resolve,reject)=>{
                resolve([])
            })
        }
    }

    findByPriceStock = async (price_max: number, price_min: number, stock_max: number, stock_min: number) => {
        if ((stock_min <= stock_max) && (price_min <= price_max)) {

            return await this.getAllProducts().then((result: any) => {
                return new Promise((resolve,reject)=>{
                    resolve(result.filter((p:any)=>{
                        return ((p.stock <= stock_max)&&(p.stock >= stock_min)&&(p.price <= price_max)&&(p.price >= price_min))
                    }))
                })
            }).catch((err: any) => {
                return new Promise((resolve,reject)=>{
                    resolve([])
                })
            });
            

        } else {
            return new Promise((resolve,reject)=>{
                resolve([])
            })
        }
    }

}

/* const a1 = Archivo.getInstanceClassArchivo()
const a2 = Archivo.getInstanceClassArchivo()
console.log("Equals", a1 === a2); */
const a1 = Archivo.getInstanceClassArchivo()
a1.findByPriceStock(50,10,21,0).then((result)=>{console.log(result);
})