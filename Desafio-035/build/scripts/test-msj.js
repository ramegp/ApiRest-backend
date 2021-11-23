"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_messages_1 = require("../database/db-messages");
(async () => {
    const db = db_messages_1.connect();
    const productos = await db?.MessagesModel.find();
    console.log(productos);
    db_messages_1.disconnect();
})();
//# sourceMappingURL=test-msj.js.map