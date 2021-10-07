import * as Mongoose from "mongoose";
import { findAll } from "./messages.statics";
//import { setLastUpdated, sameLastName } from "./users.methods";

const MessagesSchema = new Mongoose.Schema({
  user: String,
  msj: String,
  date: String
});

//MessagesSchema.statics.findAll = findAll;
//UserSchema.statics.findByAge = findByAge;

//UserSchema.methods.setLastUpdated = setLastUpdated;
//UserSchema.methods.sameLastName = sameLastName;

export default MessagesSchema;
