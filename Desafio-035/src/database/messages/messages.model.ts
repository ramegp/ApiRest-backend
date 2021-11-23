import * as Mongoose from "mongoose";
import MessagesSchema from "./messages.schema";
import { IMessagesDocument, IMessagesModel } from "./messages.types";


// nombre de la coleccion 
export const MessagesModel = Mongoose.model<IMessagesDocument>(
  "mensajes",
  MessagesSchema
) as IMessagesModel;

