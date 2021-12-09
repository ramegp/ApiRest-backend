"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBMongo {
    constructor() {
        this.prod_connect = require('../database/db-products').connect;
        this.prod_disconnect = require('../database/db-products').disconnect;
        this.msg_connect = require('../database/db-messages').connect;
        this.msg_disconnect = require('../database/db-messages').disconnect;
        this.users_connect = require('../database/db-users').connect;
        this.users_disconnect = require('../database/db-users').disconnect;
        this.imprimir = async () => {
            let db = this.prod_connect();
            let productos = await db?.UserModel.find();
            //console.log(productos);
            this.prod_disconnect();
            return productos;
        };
        this.findById = async (id) => {
            let db = this.prod_connect();
            let producto = await db?.UserModel.find({ _id: id });
            this.prod_disconnect();
            return producto;
        };
        this.findByName = async (name) => {
            let db = this.prod_connect();
            let producto = await db?.UserModel.find({ title: name });
            this.prod_disconnect();
            return producto;
        };
        this.findByCode = async (code) => {
            let db = this.prod_connect();
            let producto = await db?.UserModel.find({ codigo: code });
            this.prod_disconnect();
            return producto;
        };
        this.findByPrice = async (price_max, price_min = 0) => {
            //Pasamos primero el precio mayor 
            if (price_min <= price_max) {
                let db = this.prod_connect();
                let producto = await db?.UserModel.find({ price: { $gte: price_min, $lt: price_max } });
                this.prod_disconnect();
                return producto;
            }
            else {
                return {};
            }
        };
        this.findByStock = async (stock_max, stock_min) => {
            //Pasamos primero el precio mayor 
            if (stock_min <= stock_max) {
                let db = this.prod_connect();
                let producto = await db?.UserModel.find({ stock: { $gte: stock_min, $lt: stock_max } });
                this.prod_disconnect();
                return producto;
            }
            else {
                return {};
            }
        };
        this.findByPriceStock = async (price_max, price_min, stock_max, stock_min) => {
            if ((stock_min <= stock_max) && (price_min <= price_max)) {
                let db = this.prod_connect();
                let producto = await db?.UserModel.find({ $and: [{ price: { $gte: price_min, $lt: price_max } }, { stock: { $gte: stock_min, $lt: stock_max } }] });
                this.prod_disconnect();
                return producto;
            }
            else {
                return {};
            }
        };
        this.addProd = async (new_prod) => {
            new_prod.timestamp = new Date;
            let db = this.prod_connect();
            let prod = await db?.UserModel.create(new_prod);
            this.prod_disconnect();
            return prod;
        };
        this.addProducts = async (products) => {
            for (const prod of products) {
                prod.timestamp = new Date;
            }
            let db = this.prod_connect();
            let prod = await db?.UserModel.insertMany(products);
            this.prod_disconnect();
            return prod;
        };
        this.removeById = async (id) => {
            let db = this.prod_connect();
            let prod_removed = await db?.UserModel.deleteOne({ _id: id });
            this.prod_disconnect();
            return prod_removed;
        };
        this.upDate = async (id, prod) => {
            let db = this.prod_connect();
            let prod_saved = await db?.UserModel.updateOne({ '_id': id }, prod);
            this.prod_disconnect();
            return prod_saved;
        };
        this.showMessages = async () => {
            let db = this.msg_connect();
            let messages = await db?.MessagesModel.find();
            //console.log(productos);
            this.msg_disconnect();
            return messages;
        };
        this.showMessagesById = async (id) => {
            let db = this.msg_connect();
            let message = await db?.MessagesModel.find({ _id: id });
            this.msg_disconnect();
            return message;
        };
        this.addMessage = async (msg) => {
            let db = this.msg_connect();
            let message_created = await db?.MessagesModel.create(msg);
            this.msg_disconnect();
            return message_created;
        };
        this.addMessages = async (messages) => {
            let db = this.msg_connect();
            let message_created = await db?.MessagesModel.insertMany(messages);
            this.msg_disconnect();
            return message_created;
        };
        this.removeMessageById = async (id_to_deleted) => {
            let db = this.msg_connect();
            let msg_removed = await db?.MessagesModel.deleteOne({ _id: id_to_deleted });
            this.msg_disconnect();
            return msg_removed;
        };
        this.upDateMessageById = async (id_to_update, msg_upgrade) => {
            let db = this.msg_connect();
            let msg_saved = await db?.MessagesModel.updateOne({ '_id': id_to_update }, msg_upgrade);
            this.msg_disconnect();
            return msg_saved;
        };
        this.manejador = (search, amount) => {
            switch (search) {
                case 'preciomax':
                    //@ts-ignore
                    return this.findByPrice(amount, 0);
                    break;
                case 'stockmax':
                    //@ts-ignore
                    return this.findByStock(amount, 0);
                    break;
                case 'nombre':
                    //@ts-ignore
                    return this.findByName(amount);
                    break;
                default:
                    break;
            }
        };
        //Metodos para manejar las sessiones de usuarios Passport
        this.addSessionPassport = async (user) => {
            let db = this.users_connect();
            let user_created = await db?.UserSessionModel.create(user);
            this.users_disconnect();
            return user_created;
        };
        this.findUserByEmail = async (email) => {
            let db = this.users_connect();
            let user_search = await db?.UserSessionModel.find({ user: email });
            this.users_disconnect();
            return user_search;
        };
        this.findUserById = async (id) => {
            let db = this.users_connect();
            let user_search = await db?.UserSessionModel.find({ _id: id });
            this.users_disconnect();
            return user_search;
        };
        this.findUserOrCreate = async (email, newUser) => {
            let db = this.users_connect();
            let user_search = await db?.UserSessionModel.find({ user: email });
            if (user_search.length == 0) {
                let user_created = await db?.UserSessionModel.create(newUser);
                console.log("Usuario creado");
                this.users_disconnect();
                return user_created;
            }
            console.log('Usuario Existe');
            this.users_disconnect();
            return {};
        };
    }
}
exports.DBMongo = DBMongo;
//# sourceMappingURL=DBMongo.js.map