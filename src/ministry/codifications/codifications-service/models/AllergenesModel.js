const { db } = require("../config/database");
const logger = require("../utils/logger");

class AllergenesModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `allergenes` WHERE CONCAT(`code_allergene`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching allergenes:", error);
      throw error;
    }
  }

  async getOne(code_allergene) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `allergenes` WHERE `code_allergene`=?",
        [code_allergene]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching allergenes:", error);
      throw error;
    }
  }

  async selectByCodes(codes_allergenes) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `allergenes` WHERE `code_allergene` IN (?)",
        [codes_allergenes]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching allergenes:", error);
      throw error;
    }
  }
}

module.exports = new AllergenesModel();
