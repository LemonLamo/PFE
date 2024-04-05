const { db } = require("../config/database");

class PrescriptionsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `prescriptions`");
    return results;
  }

  async getByReference(reference) {
    const [results] = await db.query("SELECT * FROM `prescriptions` WHERE `reference`=?", [reference]);
    return results;
  }

  async insert(id, patient, reference, code_medicament, posologie, frequence, duree, remarques){
    await db.execute("INSERT INTO `prescriptions` (`id`, `patient`, `reference`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, patient, reference, code_medicament, posologie, frequence, duree, remarques ?? null])
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `prescriptions` WHERE `id`=?", [id]);
    return results;
  }
}

module.exports = new PrescriptionsModel();
