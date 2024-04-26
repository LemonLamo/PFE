const { db } = require("../config/database");
const logger = require("../utils/logger");

class SoinsModel {
  validationRules = {};

  async select() {
    try {
      const [results] = await db.query("SELECT * FROM `soins`;");
      return results;
    } catch (error) {
      logger.error("Error fetching soins:", error);
      throw error;
    }
  }

  async selectOne(id) {
    try {
      const [results] = await db.query("SELECT * FROM `soins` WHERE `id`=?", [
        id,
      ]);
      return results;
    } catch (error) {
      logger.error("Error fetching soins:", error);
      throw error;
    }
  }

  async insert(
    id,
    patient,
    medecin,
    infirmier,
    hospitalisation,
    hopital,
    acte,
    date_soin,
    details
  ) {
    try {
      await db.execute(
        "INSERT INTO soins(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          medecin,
          infirmier,
          hospitalisation,
          hopital,
          acte,
          date_soin,
          details,
        ]
      );
    } catch (error) {
      logger.error("Error inserting soins:", error);
      throw error;
    }
  }

  async executer(id, remarque) {
    try {
      await db.execute(
        "UPDATE soins SET fait=1, date_fait=NOW(), details_fait=? WHERE id=?",
        [remarque ?? null, id]
      );
    } catch (error) {
      logger.error("Error updating soins:", error);
      throw error;
    }
  }
}

module.exports = new SoinsModel();
