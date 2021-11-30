import * as Mongoose from "mongoose";
import { findAll } from "./cart.statics";
//import { setLastUpdated, sameLastName } from "./users.methods";

import { Author } from "../../utils/Interfaces";

const CarritoSchema = new Mongoose.Schema({
  
  titular: String,
  productos: Array,
  finalizo: Boolean
});

//MessagesSchema.statics.findAll = findAll;
//UserSchema.statics.findByAge = findByAge;

//UserSchema.methods.setLastUpdated = setLastUpdated;
//UserSchema.methods.sameLastName = sameLastName;

export default CarritoSchema;
