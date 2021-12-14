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

podemos usar el graphql para agregar productos y listarlos
```
Para agregar dirigirse a localhost:8080/graphql y escribir:

mutation{addProducto(
title:"Celular",
description:"Celular con camara 64px",
stock:64,
codigo:"CEL-01",
price:783.23,
thumbnail:"https://www.cetrogar.com.ar/media/catalog/product/t/e/te2715.jpg?width=500&height=500&canvas=500:500&quality=80&bg-color=255,255,255&fit=bounds",
timestamp:"2021-09-01T23:18:43.342Z") {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
```
Para listar producto por precio 
{producto(price:900) {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
```
Listar productos por nombre
{producto(title:"sarlanga") {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
```
Listar todos los productos
{productos {
  _id
  title
  description
  stock
  timestamp
  codigo
  price
  thumbnail
  _v
}}
```
Test: en la carpeta `src/test/ApiTest.ts`
```
Descomentar la prueba de testing post y cambiarle los datos al producto

let producto_agregar = {
  title: "pan dulce",
  description: "Escuadra de color rosa",
  stock: 400,
  codigo: "ES-55",
  price: 45,
  thumbnail: "https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/soda-bread-baking-512.png"
}
```
Para los test, debemos en una terminal correr la api con `npm run dev` y en la otra hacer 
```
npm run test
```

Utilizamos el middleware de compresion de node para la compresion de gzip en la aplicacion Express.

Utilizamos com logger log4js


Para ejecutar la factory con diferente sistema de persistencia hacer 
```
npm run dev <File o Mongo>
```

Si queremos comprobar que tenemos un solo singleton en la factory ejecutar el archivo src/utils/ProbandoClases.ts `npx ts-node src/utils/ProbandoClases.ts`