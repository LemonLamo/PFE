const { db } = require("../config/database");

class RadiosModel {
  async getAll() {
    const [results] = await db.query('SELECT * FROM `radios`');
    return results
  }

  async getOne(code){
    const [results] = await db.query('SELECT * FROM `radios` WHERE `code`=?', [code]);
    return results
  }
}

module.exports = new RadiosModel();
