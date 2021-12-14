import { Archivo } from "./Archivo";
import { DBMongo } from "./DBMongo";

export class Factory {
    static set(option: string) {
        switch (option) {
            case 'Mongo':
                return DBMongo.getInstanceClassMongoDB()
            case 'Mem':
                break;
            case 'File':
                return Archivo.getInstanceClassArchivo()
        }
    }
}

const option = process.argv[2] || 'File';
export const persistencia = Factory.set(option)


//export const Persistencia = Factory.set(option);
/* persistencia?.getAllProducts().then((result: any) => {
    console.log(result);
    
}).catch((err: any) => {
    console.log(err);
}); */

/* 
let obj = {
    title: "Alberto",
    description: "Crack del futbol",
    stock: 1,
    codigo: "ES-55",
    price: 1000,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Helmet.jpg-512.png",
    timestamp: 'Sun Dec 12 2021 12:45:53 GMT-0300 (Argentina Standard Time)'
}

persistencia?.upDate("12",obj).then((result:any)=>{
    console.log(result);
}) */