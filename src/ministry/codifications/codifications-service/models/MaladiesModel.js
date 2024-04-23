const { db } = require("../config/database");

class MaladiesModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `maladies` WHERE CONCAT(`code_maladie`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      console.error("Error fetching maladies:", error);
      throw error;
    }
  }

  async getOne(code_maladie) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `maladies` WHERE `code_maladie`=?",
        [code_maladie]
      );
      return results;
    } catch (error) {
      console.error("Error fetching maladies:", error);
      throw error;
    }
  }

  async getAllChronique(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `maladies` WHERE `chronique`=1 AND CONCAT(`code_maladie`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      console.error("Error fetching maladies:", error);
      throw error;
    }
  }

  async getOneChronique(code_maladie) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `maladies` WHERE `code_maladie`=? AND `chronqiue`=1",
        [code_maladie]
      );
      return results;
    } catch (error) {
      console.error("Error fetching maladies:", error);
      throw error;
    }
  }

  async selectByCodes(codes_maladies) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `maladies` WHERE `code_maladie` IN (?)",
        [codes_maladies]
      );
      return results;
    } catch (error) {
      console.error("Error fetching maladies:", error);
      throw error;
    }
  }
}

module.exports = new MaladiesModel();
