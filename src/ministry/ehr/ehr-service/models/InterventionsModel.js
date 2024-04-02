const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `interventions`");
    return results;
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE `id`=?", [id]);
    return results;
  }

  async getByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE `patient`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }

  async getByMedecin(NIN) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE `medecin`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }
  
  async countByHopital(hopital){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `interventions` WHERE `hopital`=?", [hopital]);
    return results[0];
  }

  async countByMedecin(hopital, medecin){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `interventions` WHERE `hopital`=? AND `medecin`=?", [hopital, medecin]);
    return results[0];
  }

  async getActiveByMedecin(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `interventions` WHERE `medecin`=? ORDER BY `date` DESC",
      [NIN]
    );
    return results;
  }
}

module.exports = new ConsultationsModel();
