const { db } = require("../config/database");

class SoinsModel {
  validationRules = {};
  
  async select() {
    const [results] = await db.query("SELECT * FROM `soins`;");
    return results;
  }

  async selectOne(id) {
    const [results] = await db.query("SELECT * FROM `soins` WHERE `id`=?", [id]);
    return results;
  }

  async insert(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details) {
    await db.execute(
      "INSERT INTO soins(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details]);
  }

  async executer(id, remarque) {
    await db.execute("UPDATE soins SET fait=1, date_fait=NOW(), details_fait=? WHERE id=?", [remarque, id]);
  }
}

module.exports = new SoinsModel();
