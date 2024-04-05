const { db } = require("../config/database");

class BilansModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `bilans`");
    return results;
  }

  async getByReference(NIN) {
    const [results] = await db.query("SELECT * FROM `bilans` WHERE `reference`=?", [NIN]);
    return results;
  }

  async insert(id, patient, reference, code_bilan, date, remarques){
    await db.execute("INSERT INTO `bilans` (`id`, `patient`, `reference`, `code_bilan`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)", [id, patient, reference, code_bilan, new Date(date), remarques ?? null])
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `bilans` WHERE `id`=?", [id]);
    return results;
  }
}

module.exports = new BilansModel();
