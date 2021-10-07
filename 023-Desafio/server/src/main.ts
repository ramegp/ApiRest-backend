import express = require("express");
import { ApiBackend } from './clases'

const servidor = new ApiBackend(8080);
console.log(servidor.routes());
