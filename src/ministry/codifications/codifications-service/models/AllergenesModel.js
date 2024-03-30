const { db } = require("../config/database");

class AllergenesModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `allergenes` WHERE CONCAT(`code_allergene`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }

  async getOne(code_allergene){
    const [results] = await db.query("SELECT * FROM `allergenes` WHERE `code_allergene`=?", [code_allergene]);
    return results
  }
}

module.exports = new AllergenesModel();
