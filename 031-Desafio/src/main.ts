import { ApiBackend } from "./utils/ApiBackend";

import { sacar_datos_de_los_parametros } from './helpers/helpers'




let argumentos = process.argv.slice()
argumentos = argumentos.splice(2)

let datos_para_servidor = sacar_datos_de_los_parametros(argumentos)

const servidor = new ApiBackend(datos_para_servidor.port,datos_para_servidor.modo);

/* console.log(`
====================================================================
=============                                       ================
=============           Ready on port ${servidor.listening()}          ================
=============                                       ================
====================================================================
`); */
