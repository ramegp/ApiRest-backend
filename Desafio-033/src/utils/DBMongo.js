"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var DBMongo = /** @class */ (function () {
    function DBMongo() {
        var _this = this;
        this.prod_connect = require('../database/db-products').connect;
        this.prod_disconnect = require('../database/db-products').disconnect;
        this.msg_connect = require('../database/db-messages').connect;
        this.msg_disconnect = require('../database/db-messages').disconnect;
        this.users_connect = require('../database/db-users').connect;
        this.users_disconnect = require('../database/db-users').disconnect;
        this.imprimir = function () { return __awaiter(_this, void 0, void 0, function () {
            var db, productos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.find())];
                    case 1:
                        productos = _a.sent();
                        //console.log(productos);
                        this.prod_disconnect();
                        return [2 /*return*/, productos];
                }
            });
        }); };
        this.findById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var db, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.find({ _id: id }))];
                    case 1:
                        producto = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, producto];
                }
            });
        }); };
        this.findByName = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var db, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.find({ title: name }))];
                    case 1:
                        producto = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, producto];
                }
            });
        }); };
        this.findByCode = function (code) { return __awaiter(_this, void 0, void 0, function () {
            var db, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.find({ codigo: code }))];
                    case 1:
                        producto = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, producto];
                }
            });
        }); };
        this.findByPrice = function (price_max, price_min) {
            if (price_min === void 0) { price_min = 0; }
            return __awaiter(_this, void 0, void 0, function () {
                var db, producto;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(price_min <= price_max)) return [3 /*break*/, 2];
                            db = this.prod_connect();
                            return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.find({ price: { $gte: price_min, $lt: price_max } }))];
                        case 1:
                            producto = _a.sent();
                            this.prod_disconnect();
                            return [2 /*return*/, producto];
                        case 2: return [2 /*return*/, {}];
                    }
                });
            });
        };
        this.findByStock = function (stock_max, stock_min) { return __awaiter(_this, void 0, void 0, function () {
            var db, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(stock_min <= stock_max)) return [3 /*break*/, 2];
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.find({ stock: { $gte: stock_min, $lt: stock_max } }))];
                    case 1:
                        producto = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, producto];
                    case 2: return [2 /*return*/, {}];
                }
            });
        }); };
        this.findByPriceStock = function (price_max, price_min, stock_max, stock_min) { return __awaiter(_this, void 0, void 0, function () {
            var db, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((stock_min <= stock_max) && (price_min <= price_max))) return [3 /*break*/, 2];
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.find({ $and: [{ price: { $gte: price_min, $lt: price_max } }, { stock: { $gte: stock_min, $lt: stock_max } }] }))];
                    case 1:
                        producto = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, producto];
                    case 2: return [2 /*return*/, {}];
                }
            });
        }); };
        this.addProd = function (new_prod) { return __awaiter(_this, void 0, void 0, function () {
            var db, prod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        new_prod.timestamp = new Date;
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.create(new_prod))];
                    case 1:
                        prod = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, prod];
                }
            });
        }); };
        this.addProducts = function (products) { return __awaiter(_this, void 0, void 0, function () {
            var _i, products_1, prod_1, db, prod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                            prod_1 = products_1[_i];
                            prod_1.timestamp = new Date;
                        }
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.insertMany(products))];
                    case 1:
                        prod = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, prod];
                }
            });
        }); };
        this.removeById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var db, prod_removed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.deleteOne({ _id: id }))];
                    case 1:
                        prod_removed = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, prod_removed];
                }
            });
        }); };
        this.upDate = function (id, prod) { return __awaiter(_this, void 0, void 0, function () {
            var db, prod_saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.prod_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserModel.updateOne({ '_id': id }, prod))];
                    case 1:
                        prod_saved = _a.sent();
                        this.prod_disconnect();
                        return [2 /*return*/, prod_saved];
                }
            });
        }); };
        this.showMessages = function () { return __awaiter(_this, void 0, void 0, function () {
            var db, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.msg_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.MessagesModel.find())];
                    case 1:
                        messages = _a.sent();
                        //console.log(productos);
                        this.msg_disconnect();
                        return [2 /*return*/, messages];
                }
            });
        }); };
        this.showMessagesById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var db, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.msg_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.MessagesModel.find({ _id: id }))];
                    case 1:
                        message = _a.sent();
                        this.msg_disconnect();
                        return [2 /*return*/, message];
                }
            });
        }); };
        this.addMessage = function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var db, message_created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.msg_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.MessagesModel.create(msg))];
                    case 1:
                        message_created = _a.sent();
                        this.msg_disconnect();
                        return [2 /*return*/, message_created];
                }
            });
        }); };
        this.addMessages = function (messages) { return __awaiter(_this, void 0, void 0, function () {
            var db, message_created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.msg_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.MessagesModel.insertMany(messages))];
                    case 1:
                        message_created = _a.sent();
                        this.msg_disconnect();
                        return [2 /*return*/, message_created];
                }
            });
        }); };
        this.removeMessageById = function (id_to_deleted) { return __awaiter(_this, void 0, void 0, function () {
            var db, msg_removed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.msg_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.MessagesModel.deleteOne({ _id: id_to_deleted }))];
                    case 1:
                        msg_removed = _a.sent();
                        this.msg_disconnect();
                        return [2 /*return*/, msg_removed];
                }
            });
        }); };
        this.upDateMessageById = function (id_to_update, msg_upgrade) { return __awaiter(_this, void 0, void 0, function () {
            var db, msg_saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.msg_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.MessagesModel.updateOne({ '_id': id_to_update }, msg_upgrade))];
                    case 1:
                        msg_saved = _a.sent();
                        this.msg_disconnect();
                        return [2 /*return*/, msg_saved];
                }
            });
        }); };
        this.manejador = function (search, amount) {
            switch (search) {
                case 'preciomax':
                    //@ts-ignore
                    return _this.findByPrice(amount, 0);
                    break;
                case 'stockmax':
                    //@ts-ignore
                    return _this.findByStock(amount, 0);
                    break;
                case 'nombre':
                    //@ts-ignore
                    return _this.findByName(amount);
                    break;
                default:
                    break;
            }
        };
        //Metodos para manejar las sessiones de usuarios Passport
        this.addSessionPassport = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var db, user_created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.users_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserSessionModel.create(user))];
                    case 1:
                        user_created = _a.sent();
                        this.users_disconnect();
                        return [2 /*return*/, user_created];
                }
            });
        }); };
        this.findUserByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var db, user_search;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.users_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserSessionModel.find({ user: email }))];
                    case 1:
                        user_search = _a.sent();
                        this.users_disconnect();
                        return [2 /*return*/, user_search];
                }
            });
        }); };
        this.findUserById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var db, user_search;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.users_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserSessionModel.find({ _id: id }))];
                    case 1:
                        user_search = _a.sent();
                        this.users_disconnect();
                        return [2 /*return*/, user_search];
                }
            });
        }); };
        this.findUserOrCreate = function (email, newUser) { return __awaiter(_this, void 0, void 0, function () {
            var db, user_search, user_created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.users_connect();
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserSessionModel.find({ user: email }))];
                    case 1:
                        user_search = _a.sent();
                        if (!(user_search.length == 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (db === null || db === void 0 ? void 0 : db.UserSessionModel.create(newUser))];
                    case 2:
                        user_created = _a.sent();
                        console.log("Usuario creado");
                        this.users_disconnect();
                        return [2 /*return*/, user_created];
                    case 3:
                        console.log('Usuario Existe');
                        this.users_disconnect();
                        return [2 /*return*/, {}];
                }
            });
        }); };
    }
    return DBMongo;
}());
exports.DBMongo = DBMongo;
