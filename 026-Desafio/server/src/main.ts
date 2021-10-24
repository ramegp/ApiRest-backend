import { ApiBackend } from "./utils/ApiBackend";
//parseInt(process.argv.splice(2)[0]) ||

const puerto_servidor =  8080

const servidor = new ApiBackend(puerto_servidor);

console.log(`
====================================================================
=============                                       ================
=============           Ready on port ${servidor.listening()}          ================
=============                                       ================
====================================================================
`);

