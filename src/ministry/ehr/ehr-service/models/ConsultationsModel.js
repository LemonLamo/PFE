const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `consultations`");
    return results;
  }

  async getByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `consultations` WHERE `patient`=? ORDER BY `date_consultation` DESC", [NIN]);
    return results;
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `consultations` WHERE `id`=?", [id]);
    return results;
  }

  async getExamensCliniques(id) {
    const [results] = await db.query("SELECT * FROM `consultations` WHERE `id`=?", [id]);
    return results;
  }
}

module.exports = new ConsultationsModel();
