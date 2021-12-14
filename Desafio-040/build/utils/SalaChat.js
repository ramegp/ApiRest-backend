"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalaChat {
    constructor(path = '') {
        this.fs = require('fs');
        this._path = require('path');
        this.readFile = () => {
            //devuelve los productos del archivo si es que existe
            try {
                let contenido = this.fs.readFileSync(this._path.resolve(__dirname + `/../assets/${this.filePath}`), 'utf-8');
                return JSON.parse(contenido);
            }
            catch (error) {
                return [];
            }
        };
        this.saveMsj = (obj) => {
            //Guarda un producto en un archivo.
            //let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }
            let chats = JSON.parse(this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8'));
            chats.push(obj);
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(chats, null, '\t'));
            return obj;
        };
        this.filePath = path;
    }
}
exports.SalaChat = SalaChat;
//# sourceMappingURL=SalaChat.js.map