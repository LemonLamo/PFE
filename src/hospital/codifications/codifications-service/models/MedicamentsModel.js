const { db } = require("../config/database");

class MedicamentsModel {
  async getAll() {
    const [results] = await db.query('SELECT * FROM `consultations`');
    return results
  }
  
  async getOne(code){
    const [results] = await db.query('SELECT * FROM `consultations` WHERE `codeConsultation`=?', [code]);
    return results
  }
}

module.exports = new MedicamentsModel();
