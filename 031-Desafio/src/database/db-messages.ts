import Mongoose from "mongoose";
import { loggerError, loggerInfo } from "../helpers/logHandler";
import { MessagesModel } from "./messages/messages.model";

const env = require('node-env-file')
env(__dirname + '/../../.env')

let database: Mongoose.Connection;

export const connect = () => {
  // add your own uri below
  const uri =
  `mongodb+srv://${process.env.mongoAtlasUser}:${process.env.mongoAtlasPassword}@ecommerce.iqobf.mongodb.net/messages?retryWrites=true&w=majority`;

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
    loggerInfo.info(`Conectado a la base de datos de los mensajes`);
    
  });

  database.on("error", () => {
    loggerError.error(`Error al conectar a la base de datos de los mensajes`)
    loggerInfo.error(`Error al conectar a la base de datos de los mensajes`)
    console.log("Error connecting to database");
  });

  return {
    MessagesModel,
  };
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();
  loggerInfo.info(`Desconectado de la base de datos de los mensajes`)
};
