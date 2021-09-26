import Mongoose from "mongoose";
import { MessagesModel } from "./messages/messages.model";

let database: Mongoose.Connection;

export const connect = () => {
  // add your own uri below
  const uri =
    "mongodb://localhost:27017/ecommerce";

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
    console.log("Connected to database messages");
  });

  database.on("error", () => {
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
  console.log('Disconnect to database messages')
};
