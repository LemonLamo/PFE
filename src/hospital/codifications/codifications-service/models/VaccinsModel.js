const { db } = require("../config/database");

class VaccinsModel {
  async getAll() {
    const [results] = await db.query('SELECT * FROM `vaccins`');
    return results
  }

  async getOne(code){
    const [results] = await db.query('SELECT * FROM `vaccins` WHERE `code`=?', [code]);
    return results
  }
}

module.exports = new VaccinsModel();
