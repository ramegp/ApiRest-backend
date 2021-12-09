import express = require("express");
import { errorRoute } from "../controlRoutes/error.route";

let __path = require('path');

const router = express.Router();

router.get('*',errorRoute)



module.exports = router