const logger = require("../utils/logger");

const db = require("../config/database").db;

class MedicamentsModal {
  validationRules = {};

  async insert(
    id,
    patient,
    reference,
    code_medicament,
    posologie,
    frequence,
    duree,
    remarques,
    date_debut
  ) {
    try {
      await db.execute(
        "INSERT INTO medicaments (`id`, `patient`, `reference`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`, `date_debut`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          reference,
          code_medicament,
          posologie,
          frequence,
          duree,
          remarques ?? null,
          new Date(date_debut),
        ]
      );
    } catch (error) {
      logger.error("Error fetching medicaments:", error);
      throw error;
    }
  }

  async selectByPatient(patient) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `medicaments` WHERE `patient`= ?",
        [patient]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching medicaments:", error);
      throw error;
    }
  }
}
module.exports = new MedicamentsModal();
