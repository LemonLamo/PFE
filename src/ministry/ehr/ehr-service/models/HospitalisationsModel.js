const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `hospitalisations`");
    return results;
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `hospitalisations` WHERE `id`=?", [id]);
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
    resume_hospitalisation
  ) {
    await db.execute(
      "INSERT INTO hospitalisations(id, patient, medecin, hopital, date_entree, mode_entree, motif_hospitalisation, chambre, lit, resume_hospitalisation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        resume_hospitalisation ?? null,
      ]
    );
  }
  
  async countByHopital(hopital){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `hospitalisations` WHERE `hopital`=?", [hopital]);
    return results[0];
  }

  async countByMedecin(hopital, medecin){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `hospitalisations` WHERE `hopital`=? AND `medecin`=?", [hopital, medecin]);
    return results[0];
  }
}

module.exports = new ConsultationsModel();
