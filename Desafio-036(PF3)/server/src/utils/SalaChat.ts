import { MsjChat } from "./Interfaces";

export class SalaChat {
    private filePath: string;
    private fs = require('fs');
    private _path = require('path');

    constructor(path: string = '') {
        this.filePath = path;
    }

    readFile = () => {
        //devuelve los productos del archivo si es que existe

        try {
            let contenido = this.fs.readFileSync(this._path.resolve(__dirname + `/../assets/${this.filePath}`), 'utf-8');
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }

    }


    saveMsj = (obj: MsjChat) => {
        //Guarda un producto en un archivo.
        //let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }

        let chats = JSON.parse(this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8'));
        chats.push(obj)
        this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(chats, null, '\t'))
        return obj
    }

}