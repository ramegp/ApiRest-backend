import { connect, disconnect } from "../database/db-messages";

(async () => {
  const db = connect();
  
  const productos = await db?.MessagesModel.find();
  console.log(productos);

  disconnect();
})();
