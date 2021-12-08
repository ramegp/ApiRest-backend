import express = require("express");
import { enviarWhatsapp } from "../controlRoutes/whatsapp.route";

let __path = require('path');


const router = express.Router();

router.get('/',enviarWhatsapp)


module.exports = router