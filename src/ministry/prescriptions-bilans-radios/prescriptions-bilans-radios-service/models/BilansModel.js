const { db } = require("../config/database");

class BilansModel {
  validationRules = {};
  async getAll() {
    try {
      const [results] = await db.query("SELECT * FROM `bilans`");
      return results;
    } catch (error) {
      logger.error("Error fetching bilans:", error);
      throw error;
    }
  }

  async getByReference(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `bilans` WHERE `reference`=?",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching bilans:", error);
      throw error;
    }
  }

  async insert(id, patient, reference, code_bilan, date, remarques) {
    try {
      await db.execute(
        "INSERT INTO `bilans` (`id`, `patient`, `reference`, `code_bilan`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)",
        [id, patient, reference, code_bilan, new Date(date), remarques ?? null]
      );
    } catch (error) {
      logger.error("Error inserting bilans:", error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const [results] = await db.query("SELECT * FROM `bilans` WHERE `id`=?", [
        id,
      ]);
      return results[0];
    } catch (error) {
      logger.error("Error fetching bilans:", error);
      throw error;
    }
  }

  async mark_as_done(id, files, observations) {
    try {
      const [results] = await db.query(
        "UPDATE `bilans` SET `date_fait`=NOW(), `observations`=? WHERE `id`=?",
        [observations, id]
      );
      for (let file of files)
        await db.query("INSERT `bilans_files`(`id`, `file`) VALUES (?, ?)", [
          id,
          file.path,
        ]);
      return results;
    } catch (error) {
      logger.error("Error fetching bilans files:", error);
      throw error;
    }
  }

  async getResults(id) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `bilans_files` WHERE `id`=?",
        [id]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching bilans files:", error);
      throw error;
    }
  }

  async getResultOne(id, num) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `bilans_files` WHERE `id`=? LIMIT 1 OFFSET ?",
        [id, num - 1]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching bilans files:", error);
      throw error;
    }
  }
}

module.exports = new BilansModel();
