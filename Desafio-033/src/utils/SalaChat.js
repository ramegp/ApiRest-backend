"use strict";
exports.__esModule = true;
var SalaChat = /** @class */ (function () {
    function SalaChat(path) {
        var _this = this;
        if (path === void 0) { path = ''; }
        this.fs = require('fs');
        this._path = require('path');
        this.readFile = function () {
            //devuelve los productos del archivo si es que existe
            try {
                var contenido = _this.fs.readFileSync(_this._path.resolve(__dirname + ("/../assets/" + _this.filePath)), 'utf-8');
                return JSON.parse(contenido);
            }
            catch (error) {
                return [];
            }
        };
        this.saveMsj = function (obj) {
            //Guarda un producto en un archivo.
            //let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }
            var chats = JSON.parse(_this.fs.readFileSync(__dirname + ("/../assets/" + _this.filePath), 'utf-8'));
            chats.push(obj);
            _this.fs.writeFileSync(__dirname + ("/../assets/" + _this.filePath), JSON.stringify(chats, null, '\t'));
            return obj;
        };
        this.filePath = path;
    }
    return SalaChat;
}());
exports.SalaChat = SalaChat;
