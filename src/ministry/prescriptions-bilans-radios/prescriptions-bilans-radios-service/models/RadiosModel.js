const { db } = require("../config/database");

class RadiosModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `radios`");
    return results;
  }

  async getByReference(NIN) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE `reference`=?", [NIN]);
    return results;
  }

  async insert(id, patient, reference, code_radio, date, remarques){
    await db.execute("INSERT INTO `radios` (`id`, `patient`, `reference`, `code_radio`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)", [id, patient, reference, code_radio, new Date(date), remarques ?? null])
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE `id`=?", [id]);
    return results;
  }
}

module.exports = new RadiosModel();
