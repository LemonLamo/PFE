const { db } = require("../config/database");

class ConsultationsModel {
  validationRules = {};
  async selectAll() {
    const [results] = await db.query("SELECT * FROM `interventions`");
    return results;
  }

  async selectOne(id) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE `id`=?", [id]);
    return results;
  }

  async selectByPatient(NIN) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE `patient`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }

  async selectByMedecin(NIN) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE `medecin`=? ORDER BY `date` DESC", [NIN]);
    return results;
  }

  async selectInactiveByMedecin(NIN) {
    const [results] = await db.query("SELECT * FROM `interventions` WHERE `medecin`=? AND (`protocole_operatoire`='' OR `protocole_operatoire` IS NULL) ORDER BY `date` DESC", [NIN]);
    return results;
  }

  async insert(id, patient, medecin, hopital, service, date, code_intervention, remarques, protocole_operatoire){
    await db.execute(
      "INSERT INTO interventions(id, patient, medecin, hopital, service, date, code_intervention, remarques, protocole_operatoire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, patient, medecin, hopital, service, new Date(date), code_intervention, remarques ?? null, protocole_operatoire?? null]);
  }

  async executer(id, protocole_operatoire) {
    await db.execute("UPDATE interventions SET protocole_operatoire=? WHERE id=?", [protocole_operatoire, id]);
  }
  
  async countByHopital(hopital){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `interventions` WHERE `hopital`=?", [hopital]);
    return results[0];
  }

  async countByMedecin(hopital, medecin){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `interventions` WHERE `hopital`=? AND `medecin`=?", [hopital, medecin]);
    return results[0];
  }

  async selectTimelinePerMedecin(hopital, medecin, duree){
    const [results] = await db.query(`SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
    COUNT(id) AS interventions
    FROM interventions 
    WHERE hopital = ?
    AND medecin = ?
    AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`, [hopital, medecin, duree]);
    return results;
  }

  async selectTimelinePerHopital(hopital, duree){
    const [results] = await db.query(`SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
    COUNT(id) AS interventions
    FROM interventions 
    WHERE hopital = ?
    AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`, [hopital, duree]);
    return results;
  }
}

module.exports = new ConsultationsModel();
