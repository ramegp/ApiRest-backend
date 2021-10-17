
import { SIGQUIT } from "constants";
import { ObjectId } from "mongoose";
import { Socket } from "socket.io";

export class ApiBackend {
    private express = require("express")
    private app = this.express()
    private server = require("http").Server(this.app);
    private io = require('socket.io')(this.server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    })

    private cors = require('cors');

    private config = {
        application: {
            cors: {
                server: [
                    {
                        origin: "localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                        credentials: true
                    }
                ]
            }
        }
    }

    //Route carrito
    private cart: any;
    //Route productos
    private route_products: any;
    //Route message
    private route_messages:any
    //Route Admin
    private route_admin: any;
    //Route Error
    private route_error: any;
    /* 
    //Route products sqlite3
    private route_products_sqlite: any;

 */
    private port: number;
    private api_route: any = [];
    prod: any = []
    private msjSalaChat = new SalaChat("chats.txt");


   /*  //Para manejar la base de datos
    private options_sqlite3 = require('./options/sqlite3');
    private knex_sqlite3 = require('knex')(this.options_sqlite3);
 */

    /*  //Para manejar la base de datos
     private options_sqlite3 = require('./options/sqlite3');
     private knex_sqlite3 = require('knex')(this.options_sqlite3);
    */

    normalizr = require('normalizr');

    normalize = this.normalizr.normalize;
    denormalize = this.normalizr.denormalize;
    schema = this.normalizr.schema;

    private userConected: Array<any> = [];
    private msjSalaFront = {
        id: 0,
        mensajes: [
          {
          id: 1,
          author: {
            _id: 1,
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
          },
          text: 'hola como andan?'
        },
        {
          id: 2,
          author: {
            _id: 2,
            id: 'ciro@gmail.com',
            nombre: 'Ciro',
            apellido: 'Gonzalez',
            alias: 'cirogp',
            edad: 2
          },
          text: 'hola como andan?'
        },
        {
          id: 3,
          author: {
            _id: 3,
            id: 'julicasanovas19@gmail.com',
            nombre: 'Julia',
            apellido: 'Casanovas',
            alias: 'julic',
            edad: 30
          },
          text: 'hola como andan?'
        },
        {
          id: 4,
          author: {
            _id: 4,
            id: 'mateo@gmail.com',
            nombre: 'Mateo',
            apellido: 'Fernandez',
            alias: 'MateoF',
            edad: 25
          },
          text: 'hola como andan?'
        },
        {
          id: 5,
          author: {
            _id: 1,
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
          },
          text: 'hafhahdsa'
        },
        {
          id: 6,
          author: {
            _id: 4,
            id: 'mateo@gmail.com',
            nombre: 'Mateo',
            apellido: 'Fernandez',
            alias: 'MateoF',
            edad: 25
          },
          text: 'hola como andan?'
        },
        {
          id: 7,
          author: {
            _id: 1,
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
          },
          text: 'hafhahdsa'
        },
        {
          id: 8,
          author: {
            _id: 1,
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
          },
          text: 'hafhahdsa'
        },
        {
          id: 9,
          author: {
            _id: 3,
            id: 'julicasanovas19@gmail.com',
            nombre: 'Julia',
            apellido: 'Casanovas',
            alias: 'julic',
            edad: 30
          },
          text: 'hola como andan?'
        },]
      }

    constructor(port: number) {
        
        this.port = port
        //Route del carrito de compras
        this.cart = require('./routes/carrito.route');
        //Route Productos
        this.route_products = require('./routes/products.route');
        //Route Messages
        this.route_messages = require('./routes/messages.route');
        //Route Admin
        this.route_admin = require('./routes/admin.route');
        //Route Error 
        this.route_error = require('./routes/error.route');

        //this.route_products_sqlite = require('./routes/productsSqlite3.routes')

        this.app.use(this.express.json())
        this.app.use(this.express.text())
        this.app.use(this.express.urlencoded({ extended: true }))

        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'ejs')


        this.app.use(this.cors());


        //Cargo las Routes Mongo
        this.app.use('/cart', this.cart);
        this.app.use('/products', this.route_products);
        this.app.use('/messages',this.route_messages);
        this.app.use('/admin', this.route_admin);
        this.app.use('/', this.route_error)


        this.app.use(this.express.static(__dirname + '/public'));

        this.server.listen(this.port, () => {
            //console.log(`servidor inicializado en el puerto ${this.port}`);
        });


        for (const i of this.cart.stack) {
            this.api_route.push(`http://localhost:${this.port}/cart${i.route.path}`)
        }

        for (const i of this.route_products.stack) {
            this.api_route.push(`http://localhost:${this.port}/products${i.route.path}`)
        }

        for (const i of this.route_messages.stack) {
            this.api_route.push(`http://localhost:${this.port}/messages${i.route.path}`)
        }

        for (const i of this.route_admin.stack) {
            this.api_route.push(`http://localhost:${this.port}/admin${i.route.path}`)
        }

        this.metodoSocket()

        this.app.locals.admin = true;

    }

    listening = (): number => {
        return this.port
    }

    routes = () => {
        return this.api_route
    }

    private metodoSocket = () => {
        this.io.on('connection', (socket: any) => {
            //console.log(`usuario conectado: ${socket.id}`);
            
            socket.emit('msj-server', 'servidor')

            this.configConexionReact(socket)
            
        })
    }
    private confCargaProductosEnVivo = (socket: any) => {
        socket.on('prod', (data: any) => {
            this.prod.push(data)
            this.io.emit('productos', this.prod)
        })
        this.io.emit('productos', this.prod)
    }
    private confSalaChat = (socket: any) => {
        this.io.emit('allMsj', this.msjSalaChat.readFile())
        socket.on('salaChat-msj', (data: any) => {
            this.msjSalaChat.saveMsj(data)
            this.io.emit('allMsj', this.msjSalaChat.readFile())
        })
    }

    private configConexionReact = (socket: any) => {
        //conexion con el front
        socket.on('msj-user',(data:any)=>{
            data.id = this.msjSalaFront.mensajes.length + 1;
            
            this.msjSalaFront.mensajes.push(data);
            this.io.emit('mensajes',this.normalizarMensaje())
        })
        socket.on('usuario-conectado',(data:any)=>{
            let obj = {
                id:socket.id,
                user:data
            }
            this.userConected.push(obj)
            this.io.emit('usuarios-conectados',this.userConected)
            //console.log(`Conectados ${this.userConected.length}`)
        })
        this.io.emit('usuarios-conectados',this.userConected);
        this.io.emit('mensajes',this.normalizarMensaje());
    }

   
    private normalizarMensaje = () => {
        const autor = new this.schema.Entity('author',{idAttribute:'id'})

        const msj = new this.schema.Entity('mensaje', {
        author: autor
        })

        const msjs = new this.schema.Entity('mensajes', {
        mensajes: [msj]
        })

        const normalizeData = this.normalize(this.msjSalaFront, msjs)

        return normalizeData
    }
    

}
interface Producto {
    title: string,
    description: string,
    stock: number,
    timestamp: string,
    codigo: string,
    price: number,
    thumbnail: string,
}


export class Archivo {
    private filePath: string;
    private fs = require('fs');

    constructor(path: string = '') {
        this.filePath = path;
    }

    private obtenerCantidadProductos = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8')
        return JSON.parse(contenido).length
    }

    readFile = () => {
        //devuelve los productos del archivo si es que existe

        try {
            let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8');
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }

    }

    saveFile = (obj: Producto) => {
        //Guarda un producto en un archivo.
        let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }
        let products = JSON.parse(this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8'));
        products.push(objSave)
        this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
        return objSave
    }
    deleteFile = (): void => {
        //Borra el archivo con todos los producos
        this.fs.unlink(__dirname + `/${'./text.txt'}`, (error: any) => {
            if (error) {
                console.log(error)

            } else {
                console.log("Deleted")
            }
        })

    }


    searchProductId = (num: number) => {
        //obtengo los productos
        let products_Aux = this.readFile();

        if (!products_Aux) {
            //No hay productos devuelvo msj no hay
            return undefined
        } else {
            return products_Aux.find((e: any) => e.id == num)
        }
    }

    upDateProduct = (id_produc: number, new_product: Producto) => {
        let prod_to_update = this.searchProductId(id_produc);
        if (prod_to_update) {
            prod_to_update = { ...prod_to_update, title: new_product.title, price: new_product.price, id: id_produc, thumbnail: new_product.thumbnail, stock: new_product.stock, description: new_product.description, codigo: new_product.codigo, timestamp: new_product.timestamp, }

            let products = this.readFile();
            products = products.map((p: any) => {
                if (p.id === id_produc) {
                    p = prod_to_update
                }
                return p
            })
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
            return prod_to_update
        } else {
            return undefined
        }
    }

    deletedProduct = (id_produc: number) => {
        let existe = this.searchProductId(id_produc)
        if (existe) {
            let products = this.readFile();
            let index_deleted: number;
            //products.splice(,1)
            //console.log(products.findIndex((p:any)=>{p.id = id_produc}))
            for (let index = 0; index < products.length; index++) {
                if (products[index].id === id_produc) {
                    index_deleted = index
                }
            }
            // @ts-ignore
            products.splice(index_deleted, 1)
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
            return existe
        } else {
            return 'error, no existe el id'
        }
    }
}
interface MsjChat {
    user: string,
    msj: string,
    date: string
}
export class SalaChat {
    private filePath: string;
    private fs = require('fs');
    private _path = require('path');

    constructor(path: string = '') {
        this.filePath = path;
    }

    readFile = () => {
        //devuelve los productos del archivo si es que existe

        try {
            let contenido = this.fs.readFileSync(this._path.resolve(__dirname + `/../assets/${this.filePath}`), 'utf-8');
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }

    }


    saveMsj = (obj: MsjChat) => {
        //Guarda un producto en un archivo.
        //let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }

        let chats = JSON.parse(this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8'));
        chats.push(obj)
        this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(chats, null, '\t'))
        return obj
    }

}

export class Cart {
    private id_cart: number;
    private user: string;
    private products_cart: any = []
    private root: boolean = false;
    private buy: boolean = false;

    constructor(id: number, user: string) {
        this.user = user
        this.id_cart = id;
    }
    getId = () => {
        return this.id_cart
    }
    getUser = () => {
        return this.user
    }
    private obtenerCantidadProductos = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        return this.products_cart.length
    }

    addProductToCart = (prod: Producto) => {
        let prod_add_to_cart = { ...prod, id: this.obtenerCantidadProductos() + 1 }
        this.products_cart.push(prod_add_to_cart);
        return prod_add_to_cart
    }

    products = () => {
        return this.products_cart
    }

    searchProductId = (num: number) => {
        //obtengo los productos
        if (!this.products_cart) {
            //No hay productos devuelvo msj no hay
            return undefined
        } else {
            return this.products_cart.find((e: any) => e.id == num)
        }
    }

    deletedProduct = (id_produc: number) => {
        let existe = this.searchProductId(id_produc)
        if (existe) {
            let index_deleted: number;

            for (let index = 0; index < this.products_cart.length; index++) {
                if (this.products_cart[index].id === id_produc) {
                    index_deleted = index
                }
            }
            // @ts-ignore
            this.products_cart.splice(index_deleted, 1)
            return existe
        } else {
            return 'error, no existe el id'
        }
    }
    isRoot = () => {
        return this.root
    }
    buyOrder = () => {
        //me dice si finalizo la compra o no
        return this.buy
    }
    finishBuy = () => {
        //Marcamos que el usuario termino la compra con ese carrito
        this.buy = true
    }
}

export class HandleCarts {
    private carts: Array<Cart> = [];
    constructor() {

    }
    private obtenerCantidadCarts = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        return this.carts.length
    }
    getCarts = () => {
        return this.carts
    }
    createCart = (user: string) => {
        this.addCart(new Cart(this.obtenerCantidadCarts() + 1, user))
    }
    addCart = (cart: Cart) => {
        this.carts.push(cart)
    }
    addProductToCart = (user: string, prod: any) => {
        if (this.searchCartByUser(user)) {
            return this.searchCartByUser(user)?.addProductToCart(prod)
        }
    }

    deleteProductToCart = (user: string, id_prod: number) => {
        if (this.searchCartByUser(user)) {
            return this.searchCartByUser(user)?.deletedProduct(id_prod);
        }
    }

    searchCartByUser = (user_search: string) => {

        if (!this.carts) {
            //No hay carritos devuelvo undefined
            return undefined
        } else {
            //si tengo carritos busco el usuario y que no haya finalizado la compra
            return this.carts.find((e: Cart) => (e.getUser() == user_search) && (!e.buyOrder()))
        }
    }

    finishBuyUser = (user: string) => {
        if (!this.searchCartByUser(user)) {
            this.searchCartByUser(user)?.finishBuy()
        }
    }

    showUserCart = (user: string) => {
        if (!this.searchCartByUser(user)) {
            return this.searchCartByUser(user)
        } else {
            return undefined
        }
    }

}

/* 
export class DBSqlite3 {
    private options = require('./options/sqlite3');
    private knex = require('knex')(this.options);

    constructor() { }

    addProduct = (prod: Producto):Promise<any>=> {
        //agrega un producto solo
        return this.knex('products').insert(prod)
        
    }

    addProducts = (array: Array<Producto>) => {
        //Agrega un arreglo de productos
        this.knex('products').insert(array)
            .then(() => {
                console.log('Se cargo el producto');

            })
            .catch((err: any) => {
                console.log(err);

            })
            .finally(() => {
                this.knex.destroy()
            })
    }

    deleteProd = (drop_id: number) => {
        return this.knex('products')
            .where({ id: drop_id })
            .del()
            
    }

    showAllProducts = () => {
        
        return this.knex('products').select('*')
            
        
    }

    findById = (id_search:number)=>{
        return this.knex('products')
        .where({ id: id_search })
    }

    findByName = (name:string)=>{
        return this.knex('products').where({title:name})
    }

    findByCode = (code:string)=>{
        return this.knex('products').where({codigo:code})
    }

    findByStockRange = (stock_min:number,stock_max:number) => {
        if (stock_min <= stock_max) {
            return this.knex('products').where('stock','>=',stock_min).where('stock','<',stock_max)
        } else {
            return {}
        }
    }
    findByPriceRange = (price_min:number,price_max:number) => {
        if (price_min <= price_max) {
            return this.knex('products').where('price','>=',price_min).where('price','<',price_max)
        } else {
            return {}
        }
    }

    findByPriceStockRange = (price_min:number,price_max:number,stock_min:number,stock_max:number) => {
        if ((price_min <= price_max)&&(stock_min <= stock_max)) {
            return this.knex('products').where('price','>=',price_min).where('price','<',price_max).where('stock','>=',stock_min).where('stock','<',stock_max)
        } else {
            return {}
        }
    }

    updateProduc = (id_update: number,prod_new:Producto) => {
        return this.knex('products')
            .where({ id: id_update })
            .update(prod_new)
            
    }

    cerrarBD = ()=>{
        this.knex.destroy()
    }

}

 */


export class DBMongo {
    prod_connect = require('./database/db-products').connect
    prod_disconnect = require('./database/db-products').disconnect;
    msg_connect = require('./database/db-messages').connect;
    msg_disconnect = require('./database/db-messages').disconnect;


    constructor (){
        
    }
    
    imprimir = async () => {

        let db = this.prod_connect()
        let productos = await db?.UserModel.find()
        //console.log(productos);
        this.prod_disconnect();
        return productos
        
    }

    findById = async (id:string) => {
        let db = this.prod_connect();
        let producto = await db?.UserModel.find({_id:id})
        this.prod_disconnect();
        
        return producto
    }
    findByName = async (name:string) => {
        let db = this.prod_connect();
        let producto = await db?.UserModel.find({title:name});
        this.prod_disconnect()
        return producto
    }

    findByCode = async (code:string) => {
        let db = this.prod_connect();
        let producto = await db?.UserModel.find({codigo:code});
        this.prod_disconnect()
        return producto
    }

    findByPrice = async ( price_max:number, price_min:number = 0) => {
        //Pasamos primero el precio mayor 
        
        if (price_min <= price_max) {

            let db = this.prod_connect();
            let producto = await db?.UserModel.find({price:{$gte:price_min,$lt:price_max}});
            this.prod_disconnect()
            return producto
            
        } else {
            return {}
        }
    }

    findByStock = async ( stock_max:number, stock_min:number) => {
        //Pasamos primero el precio mayor 
        
        if (stock_min <= stock_max) {

            let db = this.prod_connect();
            let producto = await db?.UserModel.find({stock:{$gte:stock_min,$lt:stock_max}});
            this.prod_disconnect()
            return producto
            
        } else {
            return {}
        }
    }

    findByPriceStock = async (price_max:number,price_min:number,stock_max:number,stock_min:number) => {
        if ((stock_min <= stock_max) && (price_min<=price_max)) {

            let db = this.prod_connect();
            let producto = await db?.UserModel.find({$and:[{price:{$gte:price_min,$lt:price_max}},{stock:{$gte:stock_min,$lt:stock_max}}]});
            this.prod_disconnect()
            return producto
            
        } else {
            return {}
        }
    }

    addProd = async (new_prod:any) => {
        let db = this.prod_connect();
        let prod = await db?.UserModel.create(new_prod)
        this.prod_disconnect()
        return prod
    }

    removeById = async (id:string) => {
        let db = this.prod_connect();
        let prod_removed = await db?.UserModel.deleteOne({_id:id})
        this.prod_disconnect();
        return prod_removed
    }
    upDate = async (id:string,prod:any) => {
        let db = this.prod_connect();
        let prod_saved = await db?.UserModel.updateOne({'_id':id},prod);
        this.prod_disconnect()
        return prod_saved
    }

    showMessages = async () => {
        let db = this.msg_connect()
        let messages = await db?.MessagesModel.find()
        //console.log(productos);
        this.msg_disconnect();
        return messages
    }
    showMessagesById = async (id:string) => {
        let db = this.msg_connect();
        let message = await db?.MessagesModel.find({_id:id})
        this.msg_disconnect();
        
        return message
    }
    addMessage = async (msg:MsjChat) => {
        let db = this.msg_connect();
        let message_created = await db?.MessagesModel.create(msg)
        this.msg_disconnect()
        return message_created
    }

    removeMessageById = async (id_to_deleted:string) => {
        let db = this.msg_connect();
        let msg_removed = await db?.MessagesModel.deleteOne({_id:id_to_deleted})
        this.msg_disconnect();
        return msg_removed
    }

    upDateMessageById = async (id_to_update:string,msg_upgrade:MsjChat) => {
        let db = this.msg_connect();
        let msg_saved = await db?.MessagesModel.updateOne({'_id':id_to_update},msg_upgrade);
        this.msg_disconnect()
        return msg_saved
    }
    manejador = (search:string,amount:number|string) => {
        switch (search) {
            case 'preciomax':
                //@ts-ignore
                return this.findByPrice(amount,0)
                break;
            case 'stockmax':
                //@ts-ignore
                return this.findByStock(amount,0)
                break;
            case 'nombre':
                //@ts-ignore
                return this.findByName(amount)
                break
            default:
                break;
        }
    }
}

//let db = new DBMongo()

/* db.findById('6144fc851bd5a6f997fde914').then((data:any)=>{console.log(data);
}) */

/* db.findByName("Jamon").then((d:any)=>{console.log(d);
}) */
/* let p = {
    "title": "Salamin",
    "description": "Escuadra de color rosa",
    "stock": 400,
    "timestamp": "2021-09-09T22:26:41.443Z",
    "codigo": "ES-55",
    "price": 123.45,
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/meat-product/96/Meat-06-512.png"
} */
/* db.addProd(p).then((d:any)=>{console.log(d);
}) */

/* db.removeById('614e17a23244711bb31c08d8').then((d:any)=>{console.log(d);
}) */

/* db.imprimir().then((data:any)=>{console.log(data);
}) */

/* db.upDate('6144fc851bd5a6f997fde914',p).then((d:any)=>{console.log(d);
}) */

/*
let arch = new Archivo("productos.txt");

console.log(arch.readFile())
arch.deletedProduct(3) */
/* console.log(arch.upDateProduct(2,{"title":"Salamin","price":1000,"thumbnail" : "url foto"}));
console.log(arch.readFile()) */

/* arch.saveFile({
    title: "Cartuchera",
    price: 100,
    thumbnail: 'url'
}); */

//arch.deleteFile();

/* let arc = new SalaChat("chats.txt")
let obj = {
    user:"Ciro",
    msj:"Hola papilele",
    date: "2021-09-01T22:54:50.260Z"
}
arc.saveMsj(obj)
console.log(arc.readFile())
 */

/* let produ = {
    title: "string",
    description: "string",
    stock: 45,
    timestamp: "string",
    codigo: "string",
    price: 455,
    thumbnail: "string",
}

const CART = new HandleCarts();
CART.createCart("ramegp");
CART.createCart("ciro");
CART.addProductToCart("ramegp",produ)
CART.addProductToCart("ramegp",produ)
console.log(CART.getCarts());
 */

//let db = new DBMysql();
/* 
let obj = {
    "title": "Neymar",
    "description": "Jugador de basquet",
    "stock": 1,
    "timestamp": "2021-09-01T23:18:43.342Z",
    "codigo": "JU-10",
    "price": 1000.25,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Helmet.jpg-512.png"
}
 */
//db.addProduct(obj).then((data)=>{console.log(data)})
//db.deleteProd(12).then((data:any)=>{console.log(data)});

//db.showAllProducts().then((a:any)=>console.log(a))

//db.cerrarBD()
/* db.updateProduc(13,obj).then((data:any)=>{if(data==1)console.log("actualizo");else console.log('no');
}) */


//let db = new DBSqlite3();

//db.findByPriceStockRange(0,30,0,500).then((data:any)=>{console.log(data)})
