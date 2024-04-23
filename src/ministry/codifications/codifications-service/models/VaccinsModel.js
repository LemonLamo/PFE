const { db } = require("../config/database");

class VaccinsModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `vaccins` WHERE CONCAT(`code_vaccin`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      console.error("Error fetching vaccins:", error);
      throw error;
    }
  }

  async getOne(code_vaccin) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `vaccins` WHERE `code_vaccin`=?",
        [code_vaccin]
      );
      return results;
    } catch (error) {
      console.error("Error fetching vaccins:", error);
      throw error;
    }
  }

  async selectByCodes(codes_vaccins) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `vaccins` WHERE `code_vaccin` IN (?)",
        [codes_vaccins]
      );
      return results;
    } catch (error) {
      console.error("Error fetching vaccins:", error);
      throw error;
    }
  }
}

module.exports = new VaccinsModel();
