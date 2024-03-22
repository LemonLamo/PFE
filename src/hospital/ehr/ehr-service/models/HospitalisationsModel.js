const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `hospitalisations`");
    return results;
  }

  async getByPatient(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `hospitalisations` WHERE `patient`=? ORDER BY `date_entree` DESC",
      [NIN]
    );
    return results;
  }

  async getActiveByMedecin(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `hospitalisations` WHERE `medecin`=? and `date_sortie` IS NULL ORDER BY `date_entree` DESC",
      [NIN]
    );
    console.log(
      "SELECT * FROM `hospitalisations` WHERE `medecin`=" +
        NIN +
        " and `date_sortie` IS NULL ORDER BY `date_entree` DESC"
    );
    return results;
  }
}

module.exports = new ConsultationsModel();
