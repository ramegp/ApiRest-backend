import { connect, disconnect } from "../database/db-products";

(async () => {
  const db = connect();

  // test static methods
  const products = await db?.UserModel.findAll();
  console.log(products);
  
  const productos = await db?.UserModel.find();
  console.log(productos);

  disconnect();
})();
