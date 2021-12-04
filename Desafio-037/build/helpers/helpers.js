"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sacar_datos_de_los_parametros = (parametros_entrada) => {
    let datos_retorno = {
        port: 8080,
        modo: ""
    };
    for (const iterator of parametros_entrada) {
        let key = iterator?.split('=')[0]?.toLocaleLowerCase();
        switch (key) {
            case 'port':
                datos_retorno.port = parseInt(iterator?.split('=')[1]);
                break;
            case 'modo':
                datos_retorno.modo = iterator?.split('=')[1];
            default:
                break;
        }
    }
    return datos_retorno;
};
//# sourceMappingURL=helpers.js.map