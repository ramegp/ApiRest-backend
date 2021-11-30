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
const users_statics_1 = require("./users.statics");
const UserSessionSchema = new Mongoose.Schema({
    user: String,
    pass: String
});
UserSessionSchema.statics.findAll = users_statics_1.findAll;
exports.default = UserSessionSchema;
//# sourceMappingURL=users.schema.js.map