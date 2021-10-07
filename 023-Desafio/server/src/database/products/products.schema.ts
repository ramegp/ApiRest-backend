import * as Mongoose from "mongoose";
import { findAll } from "./products.statics";
//import { setLastUpdated, sameLastName } from "./users.methods";

const UserSchema = new Mongoose.Schema({
  title: String,
  description: String,
  codigo: String,
  price: Number,
  stock: Number,
  timestamp: String,
  thumbnail: String
});

UserSchema.statics.findAll = findAll;
//UserSchema.statics.findByAge = findByAge;

//UserSchema.methods.setLastUpdated = setLastUpdated;
//UserSchema.methods.sameLastName = sameLastName;

export default UserSchema;
