import express = require("express");
import { agregarMsj, borrarMsj, buscarMsj } from "../controlRoutes/messages.route";
let __path = require('path');


const router = express.Router();

router.get('/:id?', buscarMsj)

router.post('/', agregarMsj)

router.delete('/:id', borrarMsj)


module.exports = router