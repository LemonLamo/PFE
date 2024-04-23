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
  }

  async selectByPatient(patient) {
    const [results] = await db.query(
      "SELECT * FROM `medicaments` WHERE `patient`= ?",
      [patient]
    );
    return results;
  }
}
module.exports = new MedicamentsModal();
