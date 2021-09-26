import { IUserDocument } from "./products.types";

export async function findAll(this: any) {
  const products = await this.find({})
  return products
}

/* export async function findByAge(
  min?: number,
  max?: number
): Promise<IUserDocument[]> {
  return this.find({ age: { $gte: min || 0, $lte: max || Infinity } });
}
 */