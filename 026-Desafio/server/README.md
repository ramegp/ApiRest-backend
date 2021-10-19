# ApiRest-backend

Generar un archivo .env con el siguiente contenido:

`useradmin=<useradmin>`

`passwordadmin=<password>`

usuario admin para logearse en la api y poder tener los privilegios root;


ejecutar:

`npm run dev`

en src/scripts hay dos archivos para cargar datos en la base de datos de mongoAtlas y otros dos archivos para mostrar que tiene la base de datos

ejecutar para ver los productos con:
`nodemon src/scripts/test-prd.ts`

ejecutar para ver los mensajes con:
`nodemon src/scripts/test-msj.ts`