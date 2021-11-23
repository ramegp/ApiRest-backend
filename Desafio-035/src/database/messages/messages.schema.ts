import * as Mongoose from "mongoose";
import { findAll } from "./messages.statics";
//import { setLastUpdated, sameLastName } from "./users.methods";

import { Author } from "../../utils/Interfaces";

const MessagesSchema = new Mongoose.Schema({
  
  author: Object,
  text: String
});

//MessagesSchema.statics.findAll = findAll;
//UserSchema.statics.findByAge = findByAge;

//UserSchema.methods.setLastUpdated = setLastUpdated;
//UserSchema.methods.sameLastName = sameLastName;

export default MessagesSchema;
