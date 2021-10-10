import express = require("express");
import { ApiBackend } from './clases'

const servidor = new ApiBackend(8001);
console.log(servidor.routes());
