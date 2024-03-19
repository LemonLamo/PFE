const { db } = require("../config/database");

class MaladiesModel {
  async getAll() {
    const [results] = await db.query('SELECT * FROM `maladies`');
    return results
  }

  async getAllChronique(){
    const [results] = await db.query('SELECT * FROM `maladies` WHERE `chronqiue`=1');
    return results
  }

  async getOne(code){
    const [results] = await db.query('SELECT * FROM `maladies` WHERE `code`=?', [code]);
    return results
  }
}

module.exports = new MaladiesModel();
