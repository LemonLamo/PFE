const { db } = require("../config/database");
const logger = require("../utils/logger");

class SoinsModel {
  validationRules = {};

  async select(NIN, fait) {
    try {
      const [results] = !fait?
                        await db.query("SELECT * FROM `soins` WHERE `infirmier`=? ORDER BY `date_soin` DESC", [NIN]):
                        (fait == 1)?
                        await db.query("SELECT * FROM `soins` WHERE `infirmier`=? AND `date_fait` IS NOT NULL ORDER BY `date_soin` DESC", [NIN]):
                        await db.query("SELECT * FROM `soins` WHERE `infirmier`=? AND `date_fait` IS NULL ORDER BY `date_soin` DESC", [NIN]);
      return results;
    } catch (error) {
      logger.error("Error fetching soins:", error);
      throw error;
    }
  }

  async selectByReference(hospitalisation, fait) {
    try {
      const [results] = !fait?
                        await db.query("SELECT * FROM `soins` WHERE `hospitalisation`=? ORDER BY `date_soin` DESC", [hospitalisation]):
                        (fait == 1)?
                        await db.query("SELECT * FROM `soins` WHERE `hospitalisation`=? AND `date_fait` IS NOT NULL ORDER BY `date_soin` DESC", [hospitalisation]):
                        await db.query("SELECT * FROM `soins` WHERE `hospitalisation`=? AND `date_fait` IS NULL ORDER BY `date_soin` DESC", [hospitalisation]);
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

  async insert(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details) {
    try {
      await db.execute(
        "INSERT INTO soins(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details ]
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
