const { db } = require("../config/database");

class BilansModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `bilans`");
    return results;
  }

  async insert(id, patient, code_bilan, date, remarques){
    await db.execute("INSERT INTO `bilans` (`id`, `patient`, `code_bilan`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?)", [id, patient, code_bilan, new Date(date), remarques ?? null])
  }

  async getByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `bilans` WHERE `patient`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `bilans` WHERE `id`=?", [id]);
    return results;
  }
}

module.exports = new BilansModel();
