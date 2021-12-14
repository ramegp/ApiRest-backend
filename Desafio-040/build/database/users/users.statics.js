"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function findAll() {
    const users = await this.find({});
    return users;
}
exports.findAll = findAll;
async function addSessionPassport(obj_user) {
    const user = await this.create(obj_user);
    return user;
}
exports.addSessionPassport = addSessionPassport;
//# sourceMappingURL=users.statics.js.map