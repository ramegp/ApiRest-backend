import { Knex } from "knex";
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


    //private api: any;
    //Route carrito
    private cart: any;
    //Route productos
    private route_products: any;
    //Route Admin
    private route_admin: any;
    //Route Error
    private route_error: any;

    private port: number;
    private api_route: any = [];
    prod: any = []
    private msjSalaChat = new SalaChat("chats.txt");


    //Para manejar la base de datos
    private options_sqlite3 = require('./options/sqlite3');
    private knex_sqlite3 = require('knex')(this.options_sqlite3);

    private options_mysql = require('./options/mysql');
    private knex_mysql = require('knex')(this.options_mysql);



    constructor(port: number) {
        //console.log(this.config.application.cors.server);
        this.port = port
        //this.api = require('./routes/productos.route');
        //Route del carrito de compras
        this.cart = require('./routes/carrito.route');
        //Route Productos
        this.route_products = require('./routes/products.route')
        //Route Admin
        this.route_admin = require('./routes/admin.route');
        //Route Error 
        this.route_error = require('./routes/error.route')
        this.app.use(this.express.json())
        this.app.use(this.express.text())
        this.app.use(this.express.urlencoded({ extended: true }))

        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'ejs')

        /* this.app.get('/', (req: any, res: any) => {
            res.sendFile(__dirname + '/public/index.html')
        }) */

        this.app.use(this.cors());

        //this.app.use('/api', this.api);
        this.app.use('/cart', this.cart);
        this.app.use('/products', this.route_products);
        this.app.use('/admin', this.route_admin);
        this.app.use('/', this.route_error)
        this.app.use(this.express.static(__dirname + '/public'));

        this.server.listen(this.port, () => {
            //console.log(`servidor inicializado en el puerto ${this.port}`);
        });

        /* for (const i of this.api.stack) {
            this.api_route.push(`http://localhost:${this.port}/api${i.route.path}`)
        } */

        for (const i of this.cart.stack) {
            this.api_route.push(`http://localhost:${this.port}/cart${i.route.path}`)
        }

        for (const i of this.route_products.stack) {
            this.api_route.push(`http://localhost:${this.port}/products${i.route.path}`)
        }

        for (const i of this.route_admin.stack) {
            this.api_route.push(`http://localhost:${this.port}/admin${i.route.path}`)
        }

        this.metodoSocket()

        this.app.locals.admin = true;

        this.DBSqlite3();
        this.DBMysql();

    }

    listening = (): number => {
        return this.port
    }

    routes = () => {
        return this.api_route
    }

    private metodoSocket = () => {
        this.io.on('connection', (socket: any) => {
            console.log(`usuario conectado: ${socket.id}`);
            socket.on('msj-user', (data: any) => {
                console.log(data)
            })
            socket.emit('msj-server', 'servidor')

            this.configConexionReact(socket)
            this.confCargaProductosEnVivo(socket)
            this.confSalaChat(socket)
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
        /* socket.on('react-msj',(data:any)=>{console.log(data);
        }) */
        this.knex_sqlite3("mensajes").select("*").then((data: any) => {
            this.io.emit('Msj-Servidor', data)
        })
        socket.on('Msj-react', (data: any) => {
            console.log(data);
            this.knex_sqlite3("mensajes").insert(data).then(() => {
                console.log('Agrego msj');
                this.knex_sqlite3("mensajes").select("*").then((data: any) => {
                    this.io.emit('Msj-Servidor', data)
                })

            })
        })
    }

    private DBSqlite3 = () => {
        this.knex_sqlite3.schema.dropTableIfExists("mensajes").createTable('mensajes', (table: any) => {
            table.increments('id').notNullable();
            table.string('user', 30);
            table.string('mensaje');

        }).then(() => {
            console.log('table creada');
        })
            .catch((err: any) => console.log(err))/* 
        .finally(()=>{this.knex_sqlite3.destroy()}) */
    }

    private DBMysql = () => {

        let products = new Archivo('productos.txt');

        this.knex_mysql.schema.dropTableIfExists("products").createTable('products', (table: any) => {
            table.increments('id');
            table.string('title', 20);
            table.float('price');
            table.string('description');
            table.integer('stock');
            table.string('timestamp');
            table.string('codigo', 15);
            table.string('thumbnail');

        }).then(() => {
            console.log('table creada');
            this.knex_mysql("products").insert(products.readFile())
                .then(() => {
                    console.log('Se han cargado los productos');

                })
        })
            .catch((err: any) => console.log(err))
        //.finally(()=>{this.knex_mysql.destroy()}) 
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

export class DBMysql {
    private options = require('./options/mysql');
    private knex = require('knex')(this.options);

    constructor() { }

    addProduct = (prod: Producto) => {
        //agrega un producto solo
        this.knex('products').insert(prod)
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
        this.knex('products')
            .where({ id: drop_id })
            .del()
            .then(() => {
                console.log('Se borro');

            })
            .catch((err: any) => {
                console.log(err);

            })
            .finally(() => {
                this.knex.destroy()
            })
    }

    showAllProducts = () => {
        let array:Array<Producto> = []
        this.knex('products').select('*')
            .then((data: any) => {
                for (const i of data) {
                    array.push(i)
                    
                }
                
            })
            .catch((err: any) => {
                console.log(err);

            })
            .finally(():Array<Producto> => {
                this.knex.destroy()
                return array
            })
            
    }

    updateProduc = (id_update: number,prod_new:Producto) => {
        this.knex('products')
            .where({ id: id_update })
            .update(prod_new)
            .then(() => {
                console.log('Se actualizo');
            })
            .catch((err: any) => {
                console.log(err);
            })
            .finally(() => {
                this.knex.destroy()
            })
    }

}


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

let db = new DBMysql();

let obj = {
    "title": "Maradona",
    "description": "Jugador seleccion argentina",
    "stock": 1,
    "timestamp": "2021-09-01T23:18:43.342Z",
    "codigo": "JU-10",
    "price": 100.25,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Helmet.jpg-512.png"
}

//db.addProduct(obj);
//db.deleteProd(12);
console.log(db.showAllProducts());


//db.updateProduc(11,obj)