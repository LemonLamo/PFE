const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query('SELECT * FROM `consultations`');
    return results
  }

  async getByPatient(NIN){
    const [results] = await db.query('SELECT * FROM `consultations` WHERE `patient`=? ORDER BY `date_consultation` DESC', [NIN]);
    return results
  }

  async getOne(codeConsultation){
    const [results] = await db.query('SELECT * FROM `consultations` WHERE `codeConsultation`=?', [codeConsultation]);
    return results
  }
}

module.exports = new ConsultationsModel();
