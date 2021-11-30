"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBMongo_1 = require("../utils/DBMongo");
let db = new DBMongo_1.DBMongo();
const mensajes = [
    {
        author: {
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
        },
        text: 'hola como andan?'
    },
    {
        author: {
            id: 'ciro@gmail.com',
            nombre: 'Ciro',
            apellido: 'Gonzalez',
            alias: 'cirogp',
            edad: 2
        },
        text: 'hola como andan?'
    },
    {
        author: {
            id: 'julicasanovas19@gmail.com',
            nombre: 'Julia',
            apellido: 'Casanovas',
            alias: 'julic',
            edad: 30
        },
        text: 'hola como andan?'
    },
    {
        author: {
            id: 'mateo@gmail.com',
            nombre: 'Mateo',
            apellido: 'Fernandez',
            alias: 'MateoF',
            edad: 25
        },
        text: 'hola como andan?'
    },
    {
        author: {
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
        },
        text: 'hafhahdsa'
    },
    {
        author: {
            id: 'mateo@gmail.com',
            nombre: 'Mateo',
            apellido: 'Fernandez',
            alias: 'MateoF',
            edad: 25
        },
        text: 'hola como andan?'
    },
    {
        author: {
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
        },
        text: 'hafhahdsa'
    },
    {
        author: {
            id: 'ramegp@gmail.com',
            nombre: 'Ramiro',
            apellido: 'Gonzalez',
            alias: 'ramegp',
            edad: 30
        },
        text: 'hafhahdsa'
    },
    {
        author: {
            id: 'julicasanovas19@gmail.com',
            nombre: 'Julia',
            apellido: 'Casanovas',
            alias: 'julic',
            edad: 30
        },
        text: 'hola como andan?'
    }
];
db.addMessages(mensajes);
//# sourceMappingURL=createMessagesMongoAtlas.js.map