const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};

  async selectByMedecin(NIN) {
    const [results] = await db.query("SELECT * FROM `consultations` WHERE `medecin`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }
  
  async selectByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `consultations` WHERE `patient`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }

  async selectOne(id) {
    const [results] = await db.query("SELECT * FROM `consultations` WHERE `id`=?", [id]);
    return results;
  }

  async insert(id, patient, medecin, hopital, service, date, type, motif, symptomes, resume, diagnostique, diagnostique_details, duree_arret_de_travail){
    await db.execute("INSERT INTO consultations(id, patient, medecin, hopital, service, date, type, motif, symptomes, resume, diagnostique, diagnostique_details, duree_arret_de_travail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, patient, medecin, hopital, service, new Date(date), type, motif, symptomes, resume, diagnostique, diagnostique_details, duree_arret_de_travail ?? null]);
  }

  async countByHopital(hopital){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `consultations` WHERE `hopital`=?", [hopital]);
    return results[0];
  }
  
  async countByMedecin(hopital, medecin){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `consultations` WHERE `hopital`=? AND `medecin`=?", [hopital, medecin]);
    return results[0];
  }
  
  async selectTimelinePerMedecin(hopital, medecin, duree){
    const [results] = await db.query(`SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
    COUNT(id) AS consultations
    FROM consultations 
    WHERE hopital = ?
    AND medecin = ?
    AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`, [hopital, medecin, duree]);

    return results;
  }
  async selectTimelinePerHopital(hopital, duree){
    const [results] = await db.query(`SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
    COUNT(id) AS consultations
    FROM consultations 
    WHERE hopital = ?
    AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`, [hopital, duree]);
    return results;
  }
}

module.exports = new ConsultationsModel();
