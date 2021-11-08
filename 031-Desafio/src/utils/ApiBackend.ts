import { DBMongo } from "./DBMongo";
import { UsuarioPassport, UsuarioPassportMongo } from "./Interfaces";
import { SalaChat } from "./SalaChat";


import bCrypt = require('bcrypt');
import { Strategy as LocalStrategy } from 'passport-local'

import { loggerInfo, loggerError, loggerWarn, logger } from '../helpers/logHandler'

export class ApiBackend {
    //Servidor modo cluster
    private cluster = require('cluster');
    private numCPUs = require('os').cpus().length




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

    private session = require("express-session");
    private MongoStore = require('connect-mongo');
    private advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    //Route General
    private routes_api: any;

    //@ts-ignore
    private port: number;
    prod: any = []
    private msjSalaChat = new SalaChat("chats.txt");


    private userConected: Array<any> = [];
    private msjSalaFront: Array<any> = [];

    private passport = require('passport');

    //middlewate de
    private compression = require('compression');

    constructor(port: number, modo_servidor: string) {

        if (modo_servidor?.toLowerCase() == 'cluster') {
            /* MASTER */
            if (this.cluster.isMaster) {
                logger.trace(`Servidor iniciado Modo Cluster`);
                loggerInfo.info(`PID MASTER ${process.pid} -- Numero de cpus ${this.numCPUs}`);
    
                for (let i = 0; i < this.numCPUs; i++) {
                    this.cluster.fork()
                }
    
                this.cluster.on('exit', (worker: any) => {
                    loggerInfo.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
                    loggerWarn.warn('Worker', worker.process.pid, 'died', new Date().toLocaleString());
                    
                    this.cluster.fork()
                })
            }
            /* --------------------------------------------------------------------------- */
            /* WORKERS */
            else {
                this.inicializar(port)
            }
            
        } else {
            logger.trace(`Servidor iniciado Modo Fork`);
            this.inicializar(port)
        }







    }


    inicializar = (port:number) => {
        var env = require('node-env-file'); // .env file
        env(__dirname + '/../../.env');

        this.port = port

        this.routes_api = require('../routes/api.route')

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
            rolling: true,
            cookie: {
                secure: false,
                maxAge: 10000
            }
        }))

        this.app.use(this.express.json())
        this.app.use(this.express.text())
        this.app.use(this.express.urlencoded({ extended: true }))

        //Cargo las rutas
        this.app.use('', this.routes_api)

        //Middleware de compresion no funciona
        this.app.use(this.compression)

        //Carpeta public
        this.app.use(this.express.static(__dirname + '/public'));

        this.server.listen(this.port, () => {
            loggerInfo.info(`Servidor express escuchando en el puerto ${this.port} - PID WORKER ${process.pid}`)
            //console.log(`servidor inicializado en el puerto ${this.port}`);
        });

        this.metodoSocket()
    }


    listening = (): number => {
        return this.port
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
