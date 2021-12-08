import { Document, Model } from "mongoose";
import {UsuarioPassport } from "../../utils/Interfaces";

export interface ICarrito {
  titular: String,
  productos: Array<any>,
  finalizo: Boolean
}

export interface ICarritoDocument extends ICarrito, Document {
  //setLastUpdated: (this: IUserDocument) => Promise<void>;
  //sameLastName: (this: IUserDocument) => Promise<Document[]>;
}

export interface ICarritoModel extends Model<ICarritoDocument> {
  //findAll: () => Promise<IMessagesDocument>;
}
