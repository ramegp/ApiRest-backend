import { DBMongo } from "./DBMongo";
import { UsuarioPassport, UsuarioPassportMongo } from "./Interfaces";
import { SalaChat } from "./SalaChat";


import bCrypt = require('bcrypt');
import { Strategy as LocalStrategy } from 'passport-local'


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

    //Route General
    private routes_api: any;


    private port: number;
    private api_route: any = [];
    prod: any = []
    private msjSalaChat = new SalaChat("chats.txt");


    private userConected: Array<any> = [];
    private msjSalaFront: Array<any> = [];

    private passport = require('passport');

    constructor(port: number) {

        /* this.passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
            function (req, username, password, done) {
                // check in mongo if a user with username exists or not
                const db = new DBMongo();
                db.findUserByEmail(username).then((user: UsuarioPassportMongo) => {
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        console.log('message', 'User Not found.');
                        return done(null, false)
                    } else {
                        // User exists but wrong password, log the error 
                        if (!isValidPassword(user, password)) {
                            console.log('Invalid Password');
                            console.log('message', 'Invalid Password');
                            return done(null, false)
                        }
                        // User and password both match, return user from 
                        // done method which will be treated like success
                        return done(null, user);
                    }
                })

            })
        );

        var isValidPassword = function (user: UsuarioPassport, password: string) {
            return bCrypt.compareSync(password, user.pass);
        }

        this.passport.use('register', new LocalStrategy({
            passReqToCallback: true
        },
            function (req, username, password, done) {

                const findOrCreateUser = function () {
                    // find a user in Mongo with provided username
                    const db = new DBMongo();
                    db.findUserByEmail(username).then((user: UsuarioPassportMongo) => {
                        if (user) {
                            console.log('User already exists');
                            console.log('message', 'User Already Exists');
                            return done(null, false)
                        } else {
                            let newUser = {
                                user: username,
                                pass: createHash(password)
                            }
                            db.addSessionPassport(newUser).then((user: any) => {
                                console.log('User Registration succesful');
                                return done(null, newUser);
                            })
                        }
                    })

                }
                // Delay the execution of findOrCreateUser and execute 
                // the method in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
        )
        // Generates hash using bCrypt
        var createHash = function (password: string) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
        }
        this.passport.serializeUser((user: any, done:any) => {
            done(null, user._id);
        });

        this.passport.deserializeUser(function (id: string, done:any) {
            const db = new DBMongo();
            db.findUserById(id).then((user: any) => { done(null, user) })

        });
 */

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

        //passport
        this.app.use(this.passport.initialize())
        this.app.use(this.passport.session())

        //Cargo las rutas
        this.app.use('', this.routes_api)

        //Carpeta public
        this.app.use(this.express.static(__dirname + '/public'));

        this.server.listen(this.port, () => {
            //console.log(`servidor inicializado en el puerto ${this.port}`);
        });

        this.metodoSocket()

        //this.app.locals.admin = true;

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
