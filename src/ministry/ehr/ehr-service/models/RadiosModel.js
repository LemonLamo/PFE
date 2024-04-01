const { db } = require("../config/database");

class RadiosModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `radios`");
    return results;
  }

  async insert(id, patient, code_radio, date, remarques){
    await db.execute("INSERT INTO `radios` (`id`, `patient`, `code_radio`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?)", [id, patient, code_radio, new Date(date), remarques ?? null])
  }

  async getByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE `patient`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE `id`=?", [id]);
    return results;
  }
}

module.exports = new RadiosModel();
