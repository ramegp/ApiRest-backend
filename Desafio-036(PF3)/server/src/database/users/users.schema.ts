import * as Mongoose from "mongoose";
import { findAll } from "./users.statics";

const UserSessionSchema = new Mongoose.Schema({
  user:String,
  pass:String,
  name:String,
  address:String,
  age:String,
  phone:String,
  avatar:String
});

UserSessionSchema.statics.findAll = findAll;

export default UserSessionSchema;
