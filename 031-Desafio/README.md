# ApiRest-backend

ejecutar:

`npm run dev`

en la ruta localhost:8080/sing/up enviar un objeto {username:"email",password:"contraseña"} 
en la ruta localhost:8080/sing/in enviar un objeto {username:"email",password:"contraseña"} 


Tambien podemos ejecutar con:
`npx ts-node src/main.ts PORT=<numero> MODO=<fork o cluster>`


Utilizamos el middleware de compresion de node para la compresion de gzip en la aplicacion Express.

Utilizamos com logger log4js