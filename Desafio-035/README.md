# ApiRest-backend

ejecutar:

`npm run dev`

en la ruta localhost:8080/sing/up enviar un objeto {username:"email",password:"contraseña"}
Nos envia un email para validar el email, continuar los pasos del email.

en la ruta localhost:8080/sing/in enviar un objeto {username:"email",password:"contraseña"} 
Una vez iniciado sesion nos envia un email con el dia que se inicio sesion


Utilizamos el middleware de compresion de node para la compresion de gzip en la aplicacion Express.

Utilizamos com logger log4js