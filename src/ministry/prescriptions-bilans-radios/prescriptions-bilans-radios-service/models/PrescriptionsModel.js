const { db } = require("../config/database");

class PrescriptionsModel {
  validationRules = {};
  async getAll() {
    try {
      const [results] = await db.query("SELECT * FROM `prescriptions`");
      return results;
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      throw error;
    }
  }

  async getByReference(reference) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `prescriptions` WHERE `reference`=?",
        [reference]
      );
      return results;
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      throw error;
    }
  }

  async insert(
    id,
    patient,
    reference,
    code_medicament,
    posologie,
    frequence,
    duree,
    remarques
  ) {
    try {
      await db.execute(
        "INSERT INTO `prescriptions` (`id`, `patient`, `reference`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          reference,
          code_medicament,
          posologie,
          frequence,
          duree,
          remarques ?? null,
        ]
      );
    } catch (error) {
      console.error("Error inserting prescriptions:", error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `prescriptions` WHERE `id`=?",
        [id]
      );
      return results;
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      throw error;
    }
  }
}

module.exports = new PrescriptionsModel();
