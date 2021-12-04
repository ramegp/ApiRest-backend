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
const MessagesSchema = new Mongoose.Schema({
    author: Object,
    text: String
});
//MessagesSchema.statics.findAll = findAll;
//UserSchema.statics.findByAge = findByAge;
//UserSchema.methods.setLastUpdated = setLastUpdated;
//UserSchema.methods.sameLastName = sameLastName;
exports.default = MessagesSchema;
//# sourceMappingURL=messages.schema.js.map