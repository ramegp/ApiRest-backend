import { connect, disconnect } from "../database/db-users";

(async () => {
  const db = connect();
  let obj = {
      user:"ramgep",
      pass:"123456"
  }
  const user = await db?.UserSessionModel.create(obj);
  console.log(user);

  disconnect();
})();
