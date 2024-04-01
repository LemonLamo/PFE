const { db } = require("../config/database");

class InterventionsModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE CONCAT(`code_intervention`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }
  
  async getOne(code_intervention){
    const [results] = await db.query('SELECT * FROM `interventions` WHERE `code_intervention`=?', [code_intervention]);
    return results
  }

  async selectByCodes(codes_interventions){
    const [results] = await db.query('SELECT * FROM `interventions` WHERE `code_intervention` IN (?)', [codes_interventions]);
    return results
  }
}

module.exports = new InterventionsModel();
