"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let __path = require('path');
const router = express.Router();
const log_1 = require("../middleware/log");
router.get('/', log_1.auth, (req, res) => {
    //@ts-ignore
    res.json({ admin: req.session.admin });
});
module.exports = router;
//# sourceMappingURL=admin.route.js.map