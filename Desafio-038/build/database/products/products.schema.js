"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = __importStar(require("mongoose"));
const products_statics_1 = require("./products.statics");
//import { setLastUpdated, sameLastName } from "./users.methods";
const UserSchema = new Mongoose.Schema({
    title: String,
    description: String,
    codigo: String,
    price: Number,
    stock: Number,
    timestamp: Date,
    thumbnail: String
});
UserSchema.statics.findAll = products_statics_1.findAll;
//UserSchema.statics.findByAge = findByAge;
//UserSchema.methods.setLastUpdated = setLastUpdated;
//UserSchema.methods.sameLastName = sameLastName;
exports.default = UserSchema;
//# sourceMappingURL=products.schema.js.map