"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBMongo_1 = require("../utils/DBMongo");
let db = new DBMongo_1.DBMongo();
let obj = {
    title: "Jabon liquido",
    description: "Jabon para lavar la ropa de forma rapida",
    codigo: "LI-01",
    price: 10,
    stock: 300,
    thumbnail: "https://farmacityar.vteximg.com.br/arquivos/ids/203039-600-600/125961_jabon-liquido-con-dosificador-para-manos-aloe-vera-x-221-ml_imagen-1.jpg?v=637357164803000000"
};
//db.addProd(obj);
//db.imprimir().then((data:any)=>{console.log(data)})
let productos = [
    {
        title: "Jabon liquido",
        description: "Jabon para lavar la ropa de forma rapida",
        codigo: "LI-01",
        price: 10,
        stock: 300,
        thumbnail: "https://farmacityar.vteximg.com.br/arquivos/ids/203039-600-600/125961_jabon-liquido-con-dosificador-para-manos-aloe-vera-x-221-ml_imagen-1.jpg?v=637357164803000000"
    },
    {
        title: "Heladera",
        description: "Heladera dos puertas",
        codigo: "CO-01",
        price: 100000,
        stock: 30,
        thumbnail: "https://www.vondom.com.ar/pub/media/catalog/product/cache/1/image/700x560/9922f564bc4197ada649fc4613f2961f/s/b/sbs605_front-_final-01.jpg"
    },
    {
        title: "Salamin",
        description: "Salamin picado fino, hecho en tandil",
        codigo: "EM-01",
        price: 280.32,
        stock: 300,
        thumbnail: "https://www.facilshops.com/static/stores/s730_cz1b/images/products/m/fox-salamin-candelario-colorado-tira-4-unidades-peso-aprox-800-g-precio-x-kg-_86185.jpg"
    },
    {
        title: "Notebook",
        description: "Notebook I9",
        codigo: "TEC-01",
        price: 7500,
        stock: 15,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_944413-MLA42937681675_072020-O.jpg"
    },
    {
        title: "Ravioles",
        description: "Ravioles de verdura y queso",
        codigo: "COM-01",
        price: 150.66,
        stock: 153,
        thumbnail: "https://www.hazteveg.com/img/recipes/full/201305/R16-77309.jpg"
    },
    {
        title: "Silla Eames",
        description: "Silla de comedor",
        codigo: "MUEBLES-01",
        price: 2000.78,
        stock: 50,
        thumbnail: "https://pintureriasagitario.com.ar/wp-content/uploads/2021/02/silla-eames-blanca1-55b7ee34e74bd7f69515980292526080-1024-1024.jpg"
    }
];
db.addProducts(productos);
//# sourceMappingURL=createProductsMongoAtlas.js.map