import * as Mongoose from "mongoose";
import CarritoSchema from "./cart.schema";
import { ICarritoDocument, ICarritoModel } from "./cart.types";


// nombre de la coleccion 
export const CarritoModel = Mongoose.model<ICarritoDocument>(
  "carritos",
  CarritoSchema
) as ICarritoModel;

