import express = require("express");
import * as fs from "fs";

import { ApiBackend } from './clases'

const servidor = new ApiBackend(8080);
console.log(servidor.routes());