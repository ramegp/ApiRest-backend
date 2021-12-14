"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SalaChat_1 = require("./SalaChat");
const logHandler_1 = require("../helpers/logHandler");
class ApiBackend {
    constructor(port, modo_servidor) {
        //Servidor modo cluster
        this.cluster = require('cluster');
        this.numCPUs = require('os').cpus().length;
        this.express = require("express");
        this.app = this.express();
        this.server = require("http").Server(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST", "PUT", "DELETE"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
        });
        this.cors = require('cors');
        this.session = require("express-session");
        this.MongoStore = require('connect-mongo');
        this.advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        this.prod = [];
        this.msjSalaChat = new SalaChat_1.SalaChat("chats.txt");
        this.userConected = [];
        this.msjSalaFront = [];
        this.passport = require('passport');
        //middlewate de
        this.compression = require('compression');
        this.inicializar = (port) => {
            var env = require('node-env-file'); // .env file
            env(__dirname + '/../../.env');
            this.port = port;
            this.routes_api = require('../routes/api.route');
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
            }));
            this.app.use(this.express.json());
            this.app.use(this.express.text());
            this.app.use(this.express.urlencoded({ extended: true }));
            //Cargo las rutas
            this.app.use('', this.routes_api);
            //Middleware de compresion no funciona
            this.app.use(this.compression);
            //Carpeta public
            this.app.use(this.express.static(__dirname + '/public'));
            this.server.listen(this.port, () => {
                logHandler_1.loggerInfo.info(`Servidor express escuchando en el puerto ${this.port} - PID WORKER ${process.pid}`);
                //console.log(`servidor inicializado en el puerto ${this.port}`);
            });
            this.metodoSocket();
        };
        this.listening = () => {
            return this.port;
        };
        this.metodoSocket = () => {
            this.io.on('connection', (socket) => {
                //console.log(`usuario conectado: ${socket.id}`);
                socket.emit('msj-server', 'servidor');
                this.configConexionReact(socket);
            });
        };
        this.confCargaProductosEnVivo = (socket) => {
            socket.on('prod', (data) => {
                this.prod.push(data);
                this.io.emit('productos', this.prod);
            });
            this.io.emit('productos', this.prod);
        };
        this.confSalaChat = (socket) => {
            this.io.emit('allMsj', this.msjSalaChat.readFile());
            socket.on('salaChat-msj', (data) => {
                this.msjSalaChat.saveMsj(data);
                this.io.emit('allMsj', this.msjSalaChat.readFile());
            });
        };
        this.configConexionReact = (socket) => {
            //conexion con el front
            socket.on('msj-user', (data) => {
                this.msjSalaFront.push(data);
                this.io.emit('mensajes', this.msjSalaFront);
            });
            socket.on('usuario-conectado', (data) => {
                let obj = {
                    id: socket.id,
                    user: data
                };
                this.userConected.push(obj);
                this.io.emit('usuarios-conectados', this.userConected);
                console.log(`Conectados ${this.userConected.length}`);
            });
            this.io.emit('usuarios-conectados', this.userConected);
            this.io.emit('mensajes', this.msjSalaFront);
        };
        if (modo_servidor?.toLowerCase() == 'cluster') {
            /* MASTER */
            if (this.cluster.isMaster) {
                logHandler_1.logger.trace(`Servidor iniciado Modo Cluster`);
                logHandler_1.loggerInfo.info(`PID MASTER ${process.pid} -- Numero de cpus ${this.numCPUs}`);
                for (let i = 0; i < this.numCPUs; i++) {
                    this.cluster.fork();
                }
                this.cluster.on('exit', (worker) => {
                    logHandler_1.loggerInfo.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
                    logHandler_1.loggerWarn.warn('Worker', worker.process.pid, 'died', new Date().toLocaleString());
                    this.cluster.fork();
                });
            }
            /* --------------------------------------------------------------------------- */
            /* WORKERS */
            else {
                this.inicializar(port);
            }
        }
        else {
            logHandler_1.logger.trace(`Servidor iniciado Modo Fork`);
            this.inicializar(port);
        }
    }
}
exports.ApiBackend = ApiBackend;
//# sourceMappingURL=ApiBackend.js.map