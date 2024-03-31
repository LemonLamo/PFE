const { db } = require("../config/database");

class BilansModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `bilans`");
    return results;
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
