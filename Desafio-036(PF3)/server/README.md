# ApiRest-backend

ejecutar:

`npm run dev`

en el archivo .env configurar el telefono al que llegaron las notificaciones
en el archivo src/config.ts configurar 
```
export const credencialesEmail = {
    user:"<email desde el cual se envian los mails>",
    pass:"<password>"
}

export const credencialesTwilio = {
    accountSid : '<credenciales de twilio>',
    authToken : '<token twilio>',
    number:'<phone que nos da twilio>'
}

export const administrador = {
    phone:"<phone del administrador para que nos lleguen las notificaciones>",
    email:"<email del administrador para que nos lleguen las notificaciones>"
}
```
en la ruta localhost:8080/sing/up enviar un objeto 
```
{
    "username":"ramegp@gmail.com",
    "password":"123456",
    "name":"ramiro",
    "address":"70 num 640",
    "age":"30",
    "phone":"+5492215731619",
    "avatar":""
}
```
Nos envia un email para validar el email, continuar los pasos del email.

en la ruta localhost:8080/sing/in enviar un objeto
``` 
{username:"email",password:"contraseña"} 
```
Una vez iniciado sesion nos envia un email con el dia que se inicio sesion y nos envia un sms


Utilizamos el middleware de compresion de node para la compresion de gzip en la aplicacion Express.

Utilizamos com logger log4js