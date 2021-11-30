"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function findAll() {
    const products = await this.find({});
    return products;
}
exports.findAll = findAll;
/* export async function findByAge(
  min?: number,
  max?: number
): Promise<IUserDocument[]> {
  return this.find({ age: { $gte: min || 0, $lte: max || Infinity } });
}
 */ 
//# sourceMappingURL=messages.statics.js.map