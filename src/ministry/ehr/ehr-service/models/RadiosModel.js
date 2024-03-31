const { db } = require("../config/database");

class RadiosModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `radios`");
    return results;
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
