const normalizr = require('normalizr');

const normalize = normalizr.normalize;
const denormalize = normalize.denormalize;
const schema = normalizr.schema;


const mensajes = [
    {
        id:1,
        author:{
            id:'ramegp@gmail.com',
            nombre:'Ramiro',
            apellido:'Gonzalez',
            alias:'ramegp',
            edad:30
        },
        text:'hola como andan?'
    },
    {
        id:2,
        author:{
            id:'ramegp@gmail.com',
            nombre:'Ramiro',
            apellido:'Gonzalez',
            alias:'ramegp',
            edad:30
        },
        text:'hola como andan?'
    },
    {
        id:3,
        author:{
            id:'ramegp@gmail.com',
            nombre:'Ramiro',
            apellido:'Gonzalez',
            alias:'ramegp',
            edad:30
        },
        text:'hola como andan?'
    },
    {
        id:4,
        author:{
            id:'ramegp@gmail.com',
            nombre:'Ramiro',
            apellido:'Gonzalez',
            alias:'ramegp',
            edad:30
        },
        text:'hola como andan?'
    }
]

const author = new schema.Entity('author')

const msj = new schema.Entity('mensaje',{
    author:author
})

const msjs = new schema.Entity('mensajes',{
    mensajes:[msj]
})

const normalizeData = normalize(mensajes,msj)
console.log(normalizeData)