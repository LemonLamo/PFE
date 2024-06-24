const { db } = require("../config/database");
const logger = require("../utils/logger");

class HandicapsModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `handicaps` WHERE CONCAT(`code_handicap`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching handicaps:", error);
      throw error;
    }
  }

  async getOne(code_handicap) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `handicaps` WHERE `code_handicap`=?",
        [code_handicap]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching handicaps:", error);
      throw error;
    }
  }

  async selectByCodes(codes_handicaps) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `handicaps` WHERE `code_handicap` IN (?)",
        [codes_handicaps]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching handicaps:", error);
      throw error;
    }
  }
}

module.exports = new HandicapsModel();
