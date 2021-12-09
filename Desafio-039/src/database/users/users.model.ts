import * as Mongoose from "mongoose";
import UserSessionSchema from "./users.schema";
import { IUserSessionDocument, IUserSessionModel  } from "./users.types";


// nombre de la coleccion 
export const UserSessionModel = Mongoose.model<IUserSessionDocument>(
  "sessiones",
  UserSessionSchema
) as IUserSessionModel;

