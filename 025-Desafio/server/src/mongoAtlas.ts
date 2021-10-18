import { DBMongo } from "./utils/DBMongo";

let db = new DBMongo();
let obj = {
    title: "Jabon liquido",
    description: "Jabon para lavar la ropa de forma rapida",
    codigo: "LI-01",
    price: 10,
    stock: 300,
    timestamp: "12 de julio",
    thumbnail: "https://farmacityar.vteximg.com.br/arquivos/ids/203039-600-600/125961_jabon-liquido-con-dosificador-para-manos-aloe-vera-x-221-ml_imagen-1.jpg?v=637357164803000000"
}
db.addProd(obj);

//db.imprimir().then((data:any)=>{console.log(data)})