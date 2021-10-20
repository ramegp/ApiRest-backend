import { Document, Model } from "mongoose";
import { UsuarioPassport } from '../../utils/Interfaces';

export interface IUserSession {
  user:String,
  pass: String
}

export interface IUserSessionDocument extends IUserSession, Document {
  //setLastUpdated: (this: IUserDocument) => Promise<void>;
  //sameLastName: (this: IUserDocument) => Promise<Document[]>;
}

export interface IUserSessionModel extends Model<IUserSessionDocument> {
  findAll: () => Promise<IUserSessionDocument>;
  addSessionPassport: (obj:UsuarioPassport) => Promise<IUserSessionDocument>;
}
