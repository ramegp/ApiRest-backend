"use strict";
exports.__esModule = true;
exports.sacar_datos_de_los_parametros = function (parametros_entrada) {
    var _a;
    var datos_retorno = {
        port: 8080,
        modo: ""
    };
    for (var _i = 0, parametros_entrada_1 = parametros_entrada; _i < parametros_entrada_1.length; _i++) {
        var iterator = parametros_entrada_1[_i];
        var key = (_a = iterator === null || iterator === void 0 ? void 0 : iterator.split('=')[0]) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        switch (key) {
            case 'port':
                datos_retorno.port = parseInt(iterator === null || iterator === void 0 ? void 0 : iterator.split('=')[1]);
                break;
            case 'modo':
                datos_retorno.modo = iterator === null || iterator === void 0 ? void 0 : iterator.split('=')[1];
            default:
                break;
        }
    }
    return datos_retorno;
};
