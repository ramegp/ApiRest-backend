interface Producto {
    title: string,
    price: Number,
    thumbnail: string
}


export class Archivo {
    private filePath: string;
    private fs = require('fs');

    constructor(path: string = '') {
        this.filePath = path;
    }

    private obtenerCantidadProductos = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        let contenido = this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8')
        return JSON.parse(contenido).length
    }

    readFile =  () => {
        //devuelve los productos del archivo si es que existe
        
        try {
            let contenido = this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8');
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }
        
    }

    saveFile = (obj: Producto): void => {
        //Guarda un producto en un archivo.
        let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }
        let products = JSON.parse(this.fs.readFileSync(__dirname + `/../../assets/${this.filePath}`, 'utf-8'));
        products.push(objSave)
        this.fs.writeFileSync(__dirname + `/../../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))

    }
    deleteFile = (): void => {
        //Borra el archivo con todos los producos
        this.fs.unlink(__dirname + `/${'./text.txt'}`, (error: any) => {
            if (error) {
                console.log(error)

            } else {
                console.log("Deleted")
            }
        })

    }

    
    searchProductId = (num:number) => {
        //obtengo los productos
        let products_Aux = this.readFile();

        if (!products_Aux) {
            //No hay productos devuelvo msj no hay
            return undefined
        } else {
            return products_Aux.find((e:any)=>e.id==num)
        }
    }


}

/* let arch = new Archivo("productos.txt");

console.log(arch.readFile())
console.log(arch.searchProductId(5));
 */
/* arch.saveFile({
    title: "Cartuchera",
    price: 100,
    thumbnail: 'url'
}); */

//arch.deleteFile();
