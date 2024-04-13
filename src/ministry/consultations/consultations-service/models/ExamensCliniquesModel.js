const { db } = require("../config/database");

class ExamensCliniquesModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `examens_cliniques`");
    return results;
  }

  async getByReference(reference) {
    const [results] = await db.query("SELECT * FROM `examens_cliniques` WHERE `reference`=?", [reference]);
    return results;
  }

  async insert(id, patient, reference, code_examen_clinique, resultat, remarques){
    await db.execute("INSERT INTO `examens_cliniques` (`id`, `patient`, `reference`, `code_examen_clinique`, `resultat`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)", [id, patient, reference, code_examen_clinique, resultat, remarques ?? null])
  }
}

module.exports = new ExamensCliniquesModel();
