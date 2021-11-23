"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJWT = exports.generateAuthToken = exports.auth = void 0;
exports.jwt = require("jsonwebtoken");
const env = require('node-env-file');
env(__dirname + '/../../.env');
const MY_SECRET_KEY = process.env.SECRET_KEY || "miclaveprivada";
const auth = (req, res, next) => {
    console.log(`${req.session.user} == ${process.env.useradmin}`);
    if (req.session && (req.session.user == process.env.useradmin) && req.session.admin) {
        return next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.auth = auth;
const generateAuthToken = function (nombre) {
    const token = exports.jwt.sign({ nombre: nombre }, MY_SECRET_KEY, { expiresIn: '60s' }); //get the private key from the config file -> environment variable
    return token;
};
exports.generateAuthToken = generateAuthToken;
const authJWT = function (req, res, next) {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //console.log(req.headers)
    //console.log(token)
    //if no token found, return response (without going to the next middelware)
    if (!token) {
        console.log('if no token found, return response (without going to the next middelware)');
        //res.redirect('/login')
        return res.json({ error: 'if no token found, return response (without going to the next middelware)' });
    }
    try {
        //if can verify the token, set req.user and pass to next middleware
        //@ts-ignore
        const decoded = exports.jwt.verify(token.split(" ")[1], MY_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        //if invalid token
        console.log('if invalid token');
        //res.redirect('/login')
        return res.json({ error: 'if invalid token' });
    }
};
exports.authJWT = authJWT;
//# sourceMappingURL=log.js.map