const { db } = require("../config/database");
const logger = require("../utils/logger");

class AllergenesModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `examens_cliniques` WHERE CONCAT(`code_examen_clinique`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching examens clinique:", error);
      throw error;
    }
  }

  async getOne(code_examen_clinique) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `examens_cliniques` WHERE `code_examen_clinique`=?",
        [code_examen_clinique]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching examens clinique:", error);
      throw error;
    }
  }

  async selectByCodes(codes_examens_cliniques) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `examens_cliniques` WHERE `code_examen_clinique` IN (?)",
        [codes_examens_cliniques]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching examens clinique:", error);
      throw error;
    }
  }
}

module.exports = new AllergenesModel();
