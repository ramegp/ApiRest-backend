"use strict";
exports.__esModule = true;
var ApiBackend_1 = require("./utils/ApiBackend");
var helpers_1 = require("./helpers/helpers");
var argumentos = process.argv.slice();
argumentos = argumentos.splice(2);
var datos_para_servidor = helpers_1.sacar_datos_de_los_parametros(argumentos);
var PORT = process.env.PORT || 8080;
//@ts-ignore
var servidor = new ApiBackend_1.ApiBackend(PORT, datos_para_servidor.modo);
/* console.log(`
====================================================================
=============                                       ================
=============           Ready on port ${servidor.listening()}          ================
=============                                       ================
====================================================================
`); */
