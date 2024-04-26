const { db } = require("../config/database");

class RadiosModel {
  validationRules = {};
  async getAll() {
    try {
      const [results] = await db.query("SELECT * FROM `radios`");
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

  async insert(id, patient, reference, code_radio, date, remarques) {
    try {
      await db.execute(
        "INSERT INTO `radios` (`id`, `patient`, `reference`, `code_radio`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)",
        [id, patient, reference, code_radio, new Date(date), remarques ?? null]
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

  async mark_as_done(id, files, observations) {
    try {
      const [results] = await db.query(
        "UPDATE `radios` SET `date_fait`=NOW(), `observations`=? WHERE `id`=?",
        [observations, id]
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
      const [results] = await db.query(
        "SELECT * FROM `radios_files` WHERE `id`=?",
        [id]
      );
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
}

module.exports = new RadiosModel();
