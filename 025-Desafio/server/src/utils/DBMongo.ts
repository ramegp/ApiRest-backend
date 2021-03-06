import { MsjChat } from "./Interfaces";

export class DBMongo {
    prod_connect = require('../database/db-products').connect
    prod_disconnect = require('../database/db-products').disconnect;
    msg_connect = require('../database/db-messages').connect;
    msg_disconnect = require('../database/db-messages').disconnect;


    constructor() {

    }

    imprimir = async () => {

        let db = this.prod_connect()
        let productos = await db?.UserModel.find()
        //console.log(productos);
        this.prod_disconnect();
        return productos

    }

    findById = async (id: string) => {
        let db = this.prod_connect();
        let producto = await db?.UserModel.find({ _id: id })
        this.prod_disconnect();

        return producto
    }
    findByName = async (name: string) => {
        let db = this.prod_connect();
        let producto = await db?.UserModel.find({ title: name });
        this.prod_disconnect()
        return producto
    }

    findByCode = async (code: string) => {
        let db = this.prod_connect();
        let producto = await db?.UserModel.find({ codigo: code });
        this.prod_disconnect()
        return producto
    }

    findByPrice = async (price_max: number, price_min: number = 0) => {
        //Pasamos primero el precio mayor 

        if (price_min <= price_max) {

            let db = this.prod_connect();
            let producto = await db?.UserModel.find({ price: { $gte: price_min, $lt: price_max } });
            this.prod_disconnect()
            return producto

        } else {
            return {}
        }
    }

    findByStock = async (stock_max: number, stock_min: number) => {
        //Pasamos primero el precio mayor 

        if (stock_min <= stock_max) {

            let db = this.prod_connect();
            let producto = await db?.UserModel.find({ stock: { $gte: stock_min, $lt: stock_max } });
            this.prod_disconnect()
            return producto

        } else {
            return {}
        }
    }

    findByPriceStock = async (price_max: number, price_min: number, stock_max: number, stock_min: number) => {
        if ((stock_min <= stock_max) && (price_min <= price_max)) {

            let db = this.prod_connect();
            let producto = await db?.UserModel.find({ $and: [{ price: { $gte: price_min, $lt: price_max } }, { stock: { $gte: stock_min, $lt: stock_max } }] });
            this.prod_disconnect()
            return producto

        } else {
            return {}
        }
    }

    addProd = async (new_prod: any) => {
        let db = this.prod_connect();
        let prod = await db?.UserModel.create(new_prod)
        this.prod_disconnect()
        return prod
    }

    removeById = async (id: string) => {
        let db = this.prod_connect();
        let prod_removed = await db?.UserModel.deleteOne({ _id: id })
        this.prod_disconnect();
        return prod_removed
    }
    upDate = async (id: string, prod: any) => {
        let db = this.prod_connect();
        let prod_saved = await db?.UserModel.updateOne({ '_id': id }, prod);
        this.prod_disconnect()
        return prod_saved
    }

    showMessages = async () => {
        let db = this.msg_connect()
        let messages = await db?.MessagesModel.find()
        //console.log(productos);
        this.msg_disconnect();
        return messages
    }
    showMessagesById = async (id: string) => {
        let db = this.msg_connect();
        let message = await db?.MessagesModel.find({ _id: id })
        this.msg_disconnect();

        return message
    }
    addMessage = async (msg: MsjChat) => {
        let db = this.msg_connect();
        let message_created = await db?.MessagesModel.create(msg)
        this.msg_disconnect()
        return message_created
    }

    removeMessageById = async (id_to_deleted: string) => {
        let db = this.msg_connect();
        let msg_removed = await db?.MessagesModel.deleteOne({ _id: id_to_deleted })
        this.msg_disconnect();
        return msg_removed
    }

    upDateMessageById = async (id_to_update: string, msg_upgrade: MsjChat) => {
        let db = this.msg_connect();
        let msg_saved = await db?.MessagesModel.updateOne({ '_id': id_to_update }, msg_upgrade);
        this.msg_disconnect()
        return msg_saved
    }
    manejador = (search: string, amount: number | string) => {
        switch (search) {
            case 'preciomax':
                //@ts-ignore
                return this.findByPrice(amount, 0)
                break;
            case 'stockmax':
                //@ts-ignore
                return this.findByStock(amount, 0)
                break;
            case 'nombre':
                //@ts-ignore
                return this.findByName(amount)
                break
            default:
                break;
        }
    }
}
