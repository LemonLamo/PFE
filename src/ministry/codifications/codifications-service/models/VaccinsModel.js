const { db } = require("../config/database");

class VaccinsModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `vaccins` WHERE CONCAT(`code_vaccin`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }

  async getOne(code_vaccin){
    const [results] = await db.query('SELECT * FROM `vaccins` WHERE `code_vaccin`=?', [code_vaccin]);
    return results
  }
}

module.exports = new VaccinsModel();
