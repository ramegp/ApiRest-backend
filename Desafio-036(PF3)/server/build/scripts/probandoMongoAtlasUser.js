"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBMongo_1 = require("../utils/DBMongo");
const db = new DBMongo_1.DBMongo();
db.findUserByEmail('ramgp').then((data) => {
    if (data.length != 0) {
        console.log("hay");
    }
    else {
        console.log("no ahy");
    }
});
/* if ([]) {
    console.log("true");
    
} else {
    console.log("false");
    
} */ 
//# sourceMappingURL=probandoMongoAtlasUser.js.map