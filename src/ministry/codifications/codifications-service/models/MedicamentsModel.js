const { db } = require("../config/database");

class MedicamentsModel {
  async getAll(search) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `medicaments` WHERE CONCAT(`code_medicament`, ' - ', `DCI`) LIKE ? LIMIT 20",
        ["%" + search + "%"]
      );
      return results;
    } catch (error) {
      console.error("Error fetching medicaments:", error);
      throw error;
    }
  }

  async getOne(code_medicament) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `medicaments` WHERE `code_medicament`=?",
        [code_medicament]
      );
      return results;
    } catch (error) {
      console.error("Error fetching medicaments:", error);
      throw error;
    }
  }

  async selectByCodes(codes_medicaments) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `medicaments` WHERE `code_medicament` IN (?)",
        [codes_medicaments]
      );
      return results;
    } catch (error) {
      console.error("Error fetching medicaments:", error);
      throw error;
    }
  }
}

module.exports = new MedicamentsModel();
