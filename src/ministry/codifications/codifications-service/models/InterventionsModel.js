const { db } = require("../config/database");

class InterventionsModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `interventions` WHERE CONCAT(`code_intervention`, ' - ', `designation`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      console.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async getOne(code_intervention) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `interventions` WHERE `code_intervention`=?",
        [code_intervention]
      );
      return results;
    } catch (error) {
      console.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async selectByCodes(codes_interventions) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `interventions` WHERE `code_intervention` IN (?)",
        [codes_interventions]
      );
      return results;
    } catch (error) {
      console.error("Error fetching interventions:", error);
      throw error;
    }
  }
}

module.exports = new InterventionsModel();
