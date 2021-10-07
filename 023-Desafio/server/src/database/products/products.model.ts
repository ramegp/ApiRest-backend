import * as Mongoose from "mongoose";
import UserSchema from "./products.schema";
import { IUserDocument, IUserModel } from "./products.types";


// nombre de la coleccion 
export const UserModel = Mongoose.model<IUserDocument>(
  "productos",
  UserSchema
) as IUserModel;

