const { db } = require("../config/database");
const moment = require('moment');

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

  async addRemarque(id, remarque){
    if(remarque){
      remarque = '['+moment(new Date()).format("DD/MM/YYYY HH:mm")+']: ' + remarque
      await db.execute("UPDATE hospitalisations SET `resume_hospitalisation`=CONCAT_WS(CHAR(10 using utf8),`resume_hospitalisation`, ?) WHERE `id`=?", [remarque, id])
    }
  }
  
  async addSortie(id, mode_sortie, date_sortie){
    await db.execute("UPDATE hospitalisations SET `mode_sortie`=?, `date_sortie`=? WHERE `id`=?", [mode_sortie, new Date(date_sortie), id])
  }

  async getTimelinePerMedecin(hopital, medecin, duree){
    const [results] = await db.query(`SELECT DATE_FORMAT(date_entree, '%Y-%m') AS date_key,
    COUNT(id) AS hospitalisations
    FROM hospitalisations 
    WHERE hopital = ?
    AND medecin = ?
    AND date_entree >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`, [hopital, medecin, duree]);
    return results;
  }

  async getTimelinePerHopital(hopital, duree){
    const [results] = await db.query(`SELECT DATE_FORMAT(date_entree, '%Y-%m') AS date_key,
    COUNT(id) AS hospitalisations
    FROM hospitalisations 
    WHERE hopital = ?
    AND date_entree >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`, [hopital, duree]);
    return results;
  }

  async selectByIDs(IDs){
    const [results] = await db.query('SELECT * FROM `hospitalisations` WHERE `id` IN (?)', [IDs]);
    return results
  }
}

module.exports = new ConsultationsModel();
