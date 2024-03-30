const { db } = require("../config/database");

class MedicamentsModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `medicaments` WHERE CONCAT(`code_medicament`, ' - ', `DCI`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }
  
  async getOne(code_medicament){
    const [results] = await db.query('SELECT * FROM `medicaments` WHERE `code_medicament`=?', [code_medicament]);
    return results
  }
}

module.exports = new MedicamentsModel();
