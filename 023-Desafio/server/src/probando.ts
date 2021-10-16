const normalizr = require('normalizr');

const normalize = normalizr.normalize;
const denormalize = normalize.denormalize;
const schema = normalizr.schema;

let blog = {
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}


/*   // Define a users schema
const user = new schema.Entity('users');
 
// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
});
 
// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});
 
const normalizedData = normalize(blog, article);
console.log(normalizedData);
 */


const mensajes = 
  {
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


const autor = new schema.Entity('author',{idAttribute:'id'})

const msj = new schema.Entity('mensaje', {
  author: autor
})

const msjs = new schema.Entity('mensajes', {
  mensajes: [msj]
})

const normalizeData = normalize(mensajes, msjs)
console.log(JSON.stringify(normalizeData))


console.log(`original ${JSON.stringify(mensajes).length}`);

console.log(`normalizado ${JSON.stringify(normalizeData).length}`);
