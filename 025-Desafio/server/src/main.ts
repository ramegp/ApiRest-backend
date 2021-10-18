import express = require("express");
import { ApiBackend } from "./utils/ApiBackend";

const servidor = new ApiBackend(8080);
console.log(servidor.routes());
