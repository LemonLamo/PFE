const { db } = require("../config/database");

class InterventionsModel {
  async getAll() {
    const [results] = await db.query('SELECT * FROM `interventions`');
    return results
  }
  
  async getOne(code){
    const [results] = await db.query('SELECT * FROM `interventions` WHERE `code`=?', [code]);
    return results
  }
}

module.exports = new InterventionsModel();
