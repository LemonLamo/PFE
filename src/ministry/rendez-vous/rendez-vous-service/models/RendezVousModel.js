const { db } = require("../config/database");

class RendezVousModel {
  validationRules = {};
  
  async getActiveByMedecin(medecin){
    const [results] = await db.query("SELECT * FROM `rendezvous` WHERE `medecin`=?", [medecin]);
    return results;
  }

  async selectOne(id) {
    const [results] = await db.query("SELECT * FROM `rendezvous` WHERE `id`=?", [id]);
    return results;
  }

  async insert(id, patient, medecin, type, title, details, date, duree) {
    await db.execute(
      "INSERT INTO rendezvous(id, patient, medecin, type, title, details, date, duree) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, patient, medecin, type, title, details ?? null, new Date(date), duree]);
  }
}

module.exports = new RendezVousModel();
