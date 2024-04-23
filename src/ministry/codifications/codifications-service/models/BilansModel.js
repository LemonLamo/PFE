const { db } = require("../config/database");

class BilansModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `bilans` WHERE CONCAT(`code_bilan`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      console.error("Error fetching bilans:", error);
      throw error;
    }
  }

  async getOne(code_bilan) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `bilans` WHERE `code_bilan`=?",
        [code_bilan]
      );
      return results;
    } catch (error) {
      console.error("Error fetching bilans:", error);
      throw error;
    }
  }

  async selectByCodes(codes_bilans) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `bilans` WHERE `code_bilan` IN (?)",
        [codes_bilans]
      );
      return results;
    } catch (error) {
      console.error("Error fetching bilans:", error);
      throw error;
    }
  }
}

module.exports = new BilansModel();
