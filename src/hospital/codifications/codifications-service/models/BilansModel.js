const { db } = require("../config/database");

class BilansModel {
  async getAll() {
    const [results] = await db.query('SELECT * FROM `bilans`');
    return results
  }
  
  async getOne(code){
    const [results] = await db.query('SELECT * FROM `bilans` WHERE `code`=?', [code]);
    return results
  }
}

module.exports = new BilansModel();
