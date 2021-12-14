import express = require("express");
import { loggerInfo,loggerWarn } from "../helpers/logHandler";
import {datos} from '../controlRoutes/datos.route'

let __path = require('path');

const router = express.Router();

const argumentos_entrada = process.argv.slice()



router.get('/',datos)


module.exports = router