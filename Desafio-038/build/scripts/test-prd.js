"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_products_1 = require("../database/db-products");
(async () => {
    const db = db_products_1.connect();
    // test static methods
    const products = await db?.UserModel.findAll();
    console.log(products);
    const productos = await db?.UserModel.find();
    console.log(productos);
    db_products_1.disconnect();
})();
//# sourceMappingURL=test-prd.js.map