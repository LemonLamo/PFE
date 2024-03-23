const { db } = require("../config/database");
const logger = require("../utils/logger");

class SoinsModel {
  validationRules = {};
  async select() {
    try {
      const [results] = await db.query("SELECT * FROM `soins`");
      return results;
    } catch (error) {
      logger.error("Error selecting soin: " + error.message);
      throw new Error("Error selecting soin: " + error.message);
    }
  }
  async selectOne(code_soin) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `soins` WHERE `code_soin`=?",
        [code_soin]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting soin: " + error.message);
      throw new Error("Error selecting soin: " + error.message);
    }
  }
  async getActiveByHospitalisation(code_hospitalisation) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `soins` WHERE `hospitalisation`=? ORDER BY `date_soin` DESC",
        [code_hospitalisation]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting hospitalisation: " + error.message);
      throw new Error("Error selecting hospitalisation: " + error.message);
    }
  }

  async insert(code_soin, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait) {
    try {
      await db.execute(
        "INSERT INTO soin(code_soin, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [code_soin, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait]
      );
    } catch (error) {
      logger.error("Error inserting soin: " + error.message);
      throw new Error("Error inserting soin: " + error.message);
    }
  }

  async update(code_soin) {
    try {
      await db.query(
        "UPDATE soin SET fait=1 WHERE code_soin=?", [code_soin]
      );
    } catch (error) {
      logger.error("Error updating soin: " + error.message);
      throw new Error("Error updating soin: " + error.message);
    }
  }
}

module.exports = new SoinsModel();
