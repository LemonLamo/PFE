const { db } = require("../config/database");
const logger = require("../utils/logger");

class RadiosModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `radios` WHERE CONCAT(`code_radio`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching radios:", error);
      throw error;
    }
  }

  async getOne(code_radio) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `radios` WHERE `code_radio`=?",
        [code_radio]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching radios:", error);
      throw error;
    }
  }

  async selectByCodes(codes_radios) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `radios` WHERE `code_radio` IN (?)",
        [codes_radios]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching radios:", error);
      throw error;
    }
  }
}

module.exports = new RadiosModel();
