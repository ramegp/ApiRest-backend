"use strict";
exports.__esModule = true;
var SalaChat_1 = require("./SalaChat");
var logHandler_1 = require("../helpers/logHandler");
var ApiBackend = /** @class */ (function () {
    function ApiBackend(port, modo_servidor) {
        var _this = this;
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
        this.inicializar = function (port) {
            var env = require('node-env-file'); // .env file
            env(__dirname + '/../../.env');
            _this.port = port;
            _this.routes_api = require('../routes/api.route');
            _this.app.use(_this.cors({
                credentials: true,
                origin: true
            }));
            //configuracion session
            _this.app.use(_this.session({
                store: _this.MongoStore.create({
                    mongoUrl: 'mongodb+srv://dbUser:asd123456@ecommerce.iqobf.mongodb.net/sessions?retryWrites=true&w=majority',
                    mongoOptions: _this.advancedOptions
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
            _this.app.use(_this.express.json());
            _this.app.use(_this.express.text());
            _this.app.use(_this.express.urlencoded({ extended: true }));
            //Cargo las rutas
            _this.app.use('', _this.routes_api);
            //Middleware de compresion no funciona
            _this.app.use(_this.compression);
            //Carpeta public
            _this.app.use(_this.express.static(__dirname + '/public'));
            _this.server.listen(_this.port, function () {
                logHandler_1.loggerInfo.info("Servidor express escuchando en el puerto " + _this.port + " - PID WORKER " + process.pid);
                //console.log(`servidor inicializado en el puerto ${this.port}`);
            });
            _this.metodoSocket();
        };
        this.listening = function () {
            return _this.port;
        };
        this.metodoSocket = function () {
            _this.io.on('connection', function (socket) {
                //console.log(`usuario conectado: ${socket.id}`);
                socket.emit('msj-server', 'servidor');
                _this.configConexionReact(socket);
            });
        };
        this.confCargaProductosEnVivo = function (socket) {
            socket.on('prod', function (data) {
                _this.prod.push(data);
                _this.io.emit('productos', _this.prod);
            });
            _this.io.emit('productos', _this.prod);
        };
        this.confSalaChat = function (socket) {
            _this.io.emit('allMsj', _this.msjSalaChat.readFile());
            socket.on('salaChat-msj', function (data) {
                _this.msjSalaChat.saveMsj(data);
                _this.io.emit('allMsj', _this.msjSalaChat.readFile());
            });
        };
        this.configConexionReact = function (socket) {
            //conexion con el front
            socket.on('msj-user', function (data) {
                _this.msjSalaFront.push(data);
                _this.io.emit('mensajes', _this.msjSalaFront);
            });
            socket.on('usuario-conectado', function (data) {
                var obj = {
                    id: socket.id,
                    user: data
                };
                _this.userConected.push(obj);
                _this.io.emit('usuarios-conectados', _this.userConected);
                console.log("Conectados " + _this.userConected.length);
            });
            _this.io.emit('usuarios-conectados', _this.userConected);
            _this.io.emit('mensajes', _this.msjSalaFront);
        };
        if ((modo_servidor === null || modo_servidor === void 0 ? void 0 : modo_servidor.toLowerCase()) == 'cluster') {
            /* MASTER */
            if (this.cluster.isMaster) {
                logHandler_1.logger.trace("Servidor iniciado Modo Cluster");
                logHandler_1.loggerInfo.info("PID MASTER " + process.pid + " -- Numero de cpus " + this.numCPUs);
                for (var i = 0; i < this.numCPUs; i++) {
                    this.cluster.fork();
                }
                this.cluster.on('exit', function (worker) {
                    logHandler_1.loggerInfo.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
                    logHandler_1.loggerWarn.warn('Worker', worker.process.pid, 'died', new Date().toLocaleString());
                    _this.cluster.fork();
                });
            }
            /* --------------------------------------------------------------------------- */
            /* WORKERS */
            else {
                this.inicializar(port);
            }
        }
        else {
            logHandler_1.logger.trace("Servidor iniciado Modo Fork");
            this.inicializar(port);
        }
    }
    return ApiBackend;
}());
exports.ApiBackend = ApiBackend;
