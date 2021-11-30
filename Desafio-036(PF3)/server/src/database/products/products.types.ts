import { Document, Model } from "mongoose";

export interface IUser {
  title: string,
  description: string,
  codigo: string,
  price: number,
  stock: number,
  timestamp: Date,
  thumbnail: string
}

export interface IUserDocument extends IUser, Document {
  //setLastUpdated: (this: IUserDocument) => Promise<void>;
  //sameLastName: (this: IUserDocument) => Promise<Document[]>;
}

export interface IUserModel extends Model<IUserDocument> {
  findAll: () => Promise<IUserDocument>;
}
