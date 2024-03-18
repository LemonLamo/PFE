const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query('SELECT * FROM `hospitalisations`');
    return results
  }
  async getByPatient(NIN){
    const [results] = await db.query('SELECT * FROM `hospitalisations` WHERE `patient`=? ORDER BY `date_entree` DESC', [NIN]);
    return results
  }
  async getByMedecin(NIN){
    const [results] = await db.query('SELECT * FROM `hospitalisations` WHERE `medecin`=? and `date_sortie`=NULL ORDER BY `date_entree` DESC', [NIN]);
    return results
  }
}

module.exports = new ConsultationsModel();
