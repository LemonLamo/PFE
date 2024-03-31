const { db } = require("../config/database");

class PrescriptionsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `prescriptions`");
    return results;
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
