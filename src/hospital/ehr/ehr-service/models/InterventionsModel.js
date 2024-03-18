const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query('SELECT * FROM `interventions`');
    return results
  }
  async getByPatient(NIN){
    const [results] = await db.query('SELECT * FROM `interventions` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
    return results
  }
  async getByMedecin(NIN){
    const [results] = await db.query('SELECT * FROM `interventions` WHERE `medecin`=? ORDER BY `date` DESC', [NIN]);
    return results
  }
}

module.exports = new ConsultationsModel();
