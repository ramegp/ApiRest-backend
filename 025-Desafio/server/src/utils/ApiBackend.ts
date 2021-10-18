import { SalaChat } from "./SalaChat";

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

    private session = require("express-session");
    private MongoStore = require('connect-mongo');
    private advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };


    //Route carrito
    private cart: any;
    //Route productos
    private route_products: any;
    //Route message
    private route_messages: any
    //Route Admin
    private route_admin: any;
    //Route Error
    private route_error: any;

    //Route Log
    private route_log: any;

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


    private userConected: Array<any> = [];
    private msjSalaFront: Array<any> = [];



    //private middleware_auth = require('./middleware/log').auth;

    constructor(port: number) {

        var env = require('node-env-file'); // .env file
        env(__dirname + '/../../.env');

        this.port = port
        //Route del carrito de compras
        this.cart = require('../routes/carrito.route');
        //Route Productos
        this.route_products = require('../routes/products.route');
        //Route Messages
        this.route_messages = require('../routes/messages.route');
        //Route Admin
        this.route_admin = require('../routes/admin.route');
        //Route Error 
        this.route_error = require('../routes/error.route');
        //Route Log
        this.route_log = require('../routes/log.route');

        //this.route_products_sqlite = require('./routes/productsSqlite3.routes')

        this.app.use(this.cors({
            credentials: true,
            origin: true,
        }));

        //configuracion session
        this.app.use(this.session({
            store: this.MongoStore.create({
                mongoUrl: 'mongodb+srv://dbUser:asd123456@ecommerce.iqobf.mongodb.net/sessions?retryWrites=true&w=majority',
                mongoOptions: this.advancedOptions
            }),
            secret: "secreto",
            resave: true,
            saveUninitialized: true,
            rolling:true,
            cookie: {
                secure: false,
                maxAge: 10000
            }
        }))

        this.app.use(this.express.json())
        this.app.use(this.express.text())
        this.app.use(this.express.urlencoded({ extended: true }))


        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'ejs')




        //Cargo las Routes Mongo
        this.app.use('/log', this.route_log)
        this.app.use('/cart', this.cart);
        this.app.use('/products', this.route_products);
        this.app.use('/messages', this.route_messages);
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
        socket.on('msj-user', (data: any) => {
            this.msjSalaFront.push(data);
            this.io.emit('mensajes', this.msjSalaFront)
        })
        socket.on('usuario-conectado', (data: any) => {
            let obj = {
                id: socket.id,
                user: data
            }
            this.userConected.push(obj)
            this.io.emit('usuarios-conectados', this.userConected)
            console.log(`Conectados ${this.userConected.length}`)
        })
        this.io.emit('usuarios-conectados', this.userConected);
        this.io.emit('mensajes', this.msjSalaFront);
    }





}
