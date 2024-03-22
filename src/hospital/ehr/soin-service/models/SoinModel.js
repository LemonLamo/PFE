const { db } = require("../config/database");
const logger = require("../utils/logger");

class SoinService {
  validationRules = {};
  async select() {
    try {
      const [results] = await db.query("SELECT * FROM `soin`");
      return results;
    } catch (error) {
      logger.error("Error selecting soin: " + error.message);
      throw new Error("Error selecting soin: " + error.message);
    }
  }
  async selectOne(code_soin) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `soin` WHERE `code_soin`=?",
        [code_soin]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting soin: " + error.message);
      throw new Error("Error selecting soin: " + error.message);
    }
  }
  async getByPatient(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `soin` WHERE `patient`=? ORDER BY `date_soin` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting patient: " + error.message);
      throw new Error("Error selecting patient: " + error.message);
    }
  }

  async getActiveByMedecin(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `soin` WHERE `medecin`=? ORDER BY `date_soin` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting medecin: " + error.message);
      throw new Error("Error selecting medecin: " + error.message);
    }
  }

  async getActiveByInfermier(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `soin` WHERE `infirmier`=? ORDER BY `date_soin` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting infirmier: " + error.message);
      throw new Error("Error selecting infirmier: " + error.message);
    }
  }

  async getActiveByHospitalisation(code_hospitalisation) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `soin` WHERE `hospitalisation`=? ORDER BY `date_soin` DESC",
        [code_hospitalisation]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting hospitalisation: " + error.message);
      throw new Error("Error selecting hospitalisation: " + error.message);
    }
  }

  async insert(
    code_soin,
    patient,
    medecin,
    infirmier,
    hospitalisation,
    nom_hopital,
    acte,
    date_soin,
    details,
    fait
  ) {
    try {
      await db.execute(
        "INSERT INTO soin(code_soin, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin,details, fait) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          code_soin,
          patient,
          medecin,
          infirmier,
          hospitalisation,
          nom_hopital,
          acte,
          date_soin,
          details,
          fait,
        ]
      );
    } catch (error) {
      logger.error("Error inserting soin: " + error.message);
      throw new Error("Error inserting soin: " + error.message);
    }
  }

  async update(
    code_soin,
    medecin,
    infirmier,
    hospitalisation,
    nom_hopital,
    acte,
    date_soin,
    details,
    fait
  ) {
    try {
      await db.query(
        "UPDATE soin SET medecin=?, infirmier=? , hospitalisation=?, nom_hopital=?, acte=?, date_soin=?, details=?, fait=? WHERE code_soin=?",
        [
          medecin,
          infirmier,
          hospitalisation,
          nom_hopital,
          acte,
          date_soin,
          details,
          fait,
          code_soin,
        ]
      );
    } catch (error) {
      logger.error("Error updating soin: " + error.message);
      throw new Error("Error updating soin: " + error.message);
    }
  }

  async remove(code_soin) {
    try {
      await db.query("DELETE FROM `soin` WHERE code_soin=?", [code_soin]);
    } catch (error) {
      logger.error("Error removing soin: " + error.message);
      throw new Error("Error removing soin: " + error.message);
    }
  }
}

module.exports = new SoinService();
