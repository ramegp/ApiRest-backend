import express = require("express");
import { ApiBackend } from './clases'


const MongoBD = 1 
const Sqlite3 = 2
/* Pasarle al apibackend que tipo de persistencia de datos queremos, por default es MongoDB */

const servidor = new ApiBackend(8080);
console.log(servidor.routes());
