import Mongoose from "mongoose";
import { loggerError, loggerInfo } from "../helpers/logHandler";
import { UserModel } from "./products/products.model";

const env = require('node-env-file')
env(__dirname + '/../../.env')

let database: Mongoose.Connection;
// 'mongodb+srv://dbUser:asd123456@ecommerce.iqobf.mongodb.net/sessions?retryWrites=true&w=majority'

//"mongodb://localhost:27017/ecommerce"
export const connect = () => {
  // add your own uri below
  const uri =
  `mongodb+srv://${process.env.mongoAtlasUser}:${process.env.mongoAtlasPassword}@ecommerce.iqobf.mongodb.net/products?retryWrites=true&w=majority`;

  /* if (database) {
    return;
  } */

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    loggerInfo.info(`Conectado a la base de datos de los productos`)
  });

  database.on("error", () => {
    loggerError.error(`Error al conectarse a la base de datos`)
    loggerInfo.error(`Error al conectarse a la base de datos`)
    console.log("Error connecting to database");
  });

  return {
    UserModel,
  };
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();
  loggerInfo.info(`Desconectado de la base de datos de los productos`)
  
};
