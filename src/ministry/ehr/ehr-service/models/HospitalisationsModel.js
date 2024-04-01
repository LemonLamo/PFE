const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `hospitalisations`");
    return results;
  }

  async getByPatient(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `hospitalisations` WHERE `patient`=? ORDER BY `date_entree` DESC",
      [NIN]
    );
    return results;
  }

  async getActiveByMedecin(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `hospitalisations` WHERE `medecin`=? and `date_sortie` IS NULL ORDER BY `date_entree` DESC",
      [NIN]
    );
    return results;
  }

  async insert(
    id,
    patient,
    medecin,
    hopital,
    date_entree,
    mode_entree,
    motif_hospitalisation,
    chambre,
    lit,
    date_sortie,
    mode_sortie,
    resume_hospitalisation
  ) {
    await db.execute(
      "INSERT INTO hospitalisations(id, patient, medecin, hopital, date_entree, mode_entree, motif_hospitalisation, chambre, lit, date_sortie, mode_sortie, resume_hospitalisation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        patient,
        medecin,
        hopital,
        new Date(date_entree),
        mode_entree,
        motif_hospitalisation,
        chambre,
        lit,
        new Date(date_sortie),
        mode_sortie,
        resume_hospitalisation,
      ]
    );
  }
}

module.exports = new ConsultationsModel();
