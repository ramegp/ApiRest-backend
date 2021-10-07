import { Document, Model } from "mongoose";

export interface IMessages {
  user: string,
  msj: string,
  date: string
}

export interface IMessagesDocument extends IMessages, Document {
  //setLastUpdated: (this: IUserDocument) => Promise<void>;
  //sameLastName: (this: IUserDocument) => Promise<Document[]>;
}

export interface IMessagesModel extends Model<IMessagesDocument> {
  //findAll: () => Promise<IMessagesDocument>;
}
