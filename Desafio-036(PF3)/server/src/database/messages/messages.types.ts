import { Document, Model } from "mongoose";
import { Author } from "../../utils/Interfaces";

export interface IMessages {
  author: Author,
  text: string
}

export interface IMessagesDocument extends IMessages, Document {
  //setLastUpdated: (this: IUserDocument) => Promise<void>;
  //sameLastName: (this: IUserDocument) => Promise<Document[]>;
}

export interface IMessagesModel extends Model<IMessagesDocument> {
  //findAll: () => Promise<IMessagesDocument>;
}
