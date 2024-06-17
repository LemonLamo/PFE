const { db } = require("../config/database");
const logger = require("../utils/logger");

class RadiosModel {
  validationRules = {};
  async getAll(hopital, fait, NIN) {
    try {
      const [results] = !fait?
                        await db.query("SELECT * FROM `radios` WHERE `hopital`=? ORDER BY `date` DESC", [hopital]):
                        (fait == 1)?
                        await db.query("SELECT * FROM `radios` WHERE `hopital`=? AND `date_fait` IS NOT NULL AND `fait_par`=? ORDER BY `date` DESC", [hopital, NIN]):
                        await db.query("SELECT * FROM `radios` WHERE `hopital`=? AND `date_fait` IS NULL ORDER BY `date` DESC", [hopital]);
      return results;
    } catch (error) {
      logger.error("Error fetching radios:", error);
      throw error;
    }
  }

  async getByReference(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `radios` WHERE `reference`=?",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching radios:", error);
      throw error;
    }
  }

  async insert(id, patient, medecin, service, hopital, reference, code_radio, date, remarques) {
    try {
      await db.execute(
        "INSERT INTO `radios` (`id`, `patient`, `medecin`, `service`, `hopital`, `reference`, `code_radio`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, patient, medecin, service, hopital, reference, code_radio, new Date(date), remarques ?? null]
      );
    } catch (error) {
      logger.error("Error inserting radios:", error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const [results] = await db.query("SELECT * FROM `radios` WHERE `id`=?", [
        id,
      ]);
      return results[0];
    } catch (error) {
      logger.error("Error fetching radios:", error);
      throw error;
    }
  }

  async mark_as_done(id, NIN, files, observations) {
    try {
      const [results] = await db.query(
        "UPDATE `radios` SET `date_fait`=NOW(), `observations`=?, `fait_par`=? WHERE `id`=?",
        [observations, NIN, id]
      );
      for (let file of files)
        await db.query("INSERT `radios_files`(`id`, `file`) VALUES (?, ?)", [
          id,
          file.path,
        ]);
      return results;
    } catch (error) {
      logger.error("Error updating radios:", error);
      throw error;
    }
  }

  async getResults(id) {
    try {
      const [results] = await db.query("SELECT * FROM `radios_files` WHERE `id`=?", [id]);
      return results;
    } catch (error) {
      logger.error("Error fetching radios files:", error);
      throw error;
    }
  }

  async getResultOne(id, num) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `radios_files` WHERE `id`=? LIMIT 1 OFFSET ?",
        [id, num - 1]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching radios files:", error);
      throw error;
    }
  }

  async countToday(hopital) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `radios` WHERE `hopital`=? AND date >= CURDATE() AND date < CURDATE() + INTERVAL 1 DAY",
        [hopital]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting consultations:", error);
      throw error;
    }
  }
}

module.exports = new RadiosModel();
