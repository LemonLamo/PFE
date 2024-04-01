const { db } = require("../config/database");

class PrescriptionsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `prescriptions`");
    return results;
  }

  async insert(id, patient, code_medicament, posologie, frequence, duree, remarques){
    await db.execute("INSERT INTO `prescriptions` (`id`, `patient`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`) VALUES (?, ?, ?, ?, ?, ?, ?)", [id, patient, code_medicament, posologie, frequence, duree, remarques ?? null])
  }

  async getByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `prescriptions` WHERE `patient`=? ORDER BY `date_consultation` DESC", [NIN]);
    return results;
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `prescriptions` WHERE `id`=?", [id]);
    return results;
  }
}

module.exports = new PrescriptionsModel();
