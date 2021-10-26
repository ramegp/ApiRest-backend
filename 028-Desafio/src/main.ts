import { ApiBackend } from "./utils/ApiBackend";

const argumentos = process.argv.slice()

const puerto_servidor = parseInt(argumentos.splice(2)[0]) || 8080

const servidor = new ApiBackend(puerto_servidor);

console.log(`
====================================================================
=============                                       ================
=============           Ready on port ${servidor.listening()}          ================
=============                                       ================
====================================================================
`);

