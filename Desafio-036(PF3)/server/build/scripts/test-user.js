"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_users_1 = require("../database/db-users");
(async () => {
    const db = db_users_1.connect();
    let obj = {
        user: "ramgep",
        pass: "123456"
    };
    const user = await db?.UserSessionModel.create(obj);
    console.log(user);
    db_users_1.disconnect();
})();
//# sourceMappingURL=test-user.js.map