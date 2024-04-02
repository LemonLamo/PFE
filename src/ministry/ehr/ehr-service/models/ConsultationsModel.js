const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `consultations`");
    return results;
  }

  async insert(id, patient, medecin, hopital, date, type, motif, symptomes, resume, diagnostique, diagnostique_details, prochaine_consultation, duree_arret_de_travail){
    await db.execute(
      "INSERT INTO consultations(id, patient, medecin, hopital, date, type, motif, symptomes, resume, diagnostique, diagnostique_details, prochaine_consultation, duree_arret_de_travail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, patient, medecin, hopital, new Date(date), type, motif, symptomes, resume, diagnostique, diagnostique_details, new Date(prochaine_consultation), duree_arret_de_travail ?? null]);
  }

  async getActiveByMedecin(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `consultations` WHERE `medecin`=? ORDER BY `date` DESC",
      [NIN]
    );
    return results;
  }

  async getByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `consultations` WHERE `patient`=? ORDER BY `date` DESC", [NIN]);
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

  async countByHopital(hopital){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `consultations` WHERE `hopital`=?", [hopital]);
    return results[0];
  }
  
  async countByMedecin(hopital, medecin){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `consultations` WHERE `hopital`=? AND `medecin`=?", [hopital, medecin]);
    return results[0];
  }
}

module.exports = new ConsultationsModel();
