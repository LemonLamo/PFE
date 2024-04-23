const { db } = require("../config/database");

class ExamensCliniquesModel {
  validationRules = {};
  async getAll() {
    try {
      const [results] = await db.query("SELECT * FROM `examens_cliniques`");
      return results;
    } catch (error) {
      console.error("Error fetching examens cliniques:", error);
      throw error;
    }
  }

  async getByReference(reference) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `examens_cliniques` WHERE `reference`=?",
        [reference]
      );
      return results;
    } catch (error) {
      console.error("Error fetching examens cliniques:", error);
      throw error;
    }
  }

  async insert(
    id,
    patient,
    reference,
    code_examen_clinique,
    resultat,
    remarques
  ) {
    try {
      await db.execute(
        "INSERT INTO `examens_cliniques` (`id`, `patient`, `reference`, `code_examen_clinique`, `resultat`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          reference,
          code_examen_clinique,
          resultat,
          remarques ?? null,
        ]
      );
    } catch (error) {
      console.error("Error inserting examens cliniques:", error);
      throw error;
    }
  }
}

module.exports = new ExamensCliniquesModel();
