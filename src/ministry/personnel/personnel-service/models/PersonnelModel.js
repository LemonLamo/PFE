const { db } = require("../config/database");
const logger = require("../utils/logger");

class PersonnelModel {
  validationRules = { sexe: ["required", "in:Homme,Femme"] };
  async select(search, fonction) {
    let s = '%'+(search ?? '')+'%'
    const sql = fonction?
      "SELECT * FROM `personnel` WHERE `NIN` LIKE ? OR CONCAT(`nom`, ' ', `prenom`) LIKE ? AND `fonction`=?":
      "SELECT * FROM `personnel` WHERE `NIN` LIKE ? OR CONCAT(`nom`, ' ', `prenom`) LIKE ?"
    const [results] = await db.query(sql, [s, s, fonction]);
    return results;
  }
  async selectOne(NIN) {
    const [results] = await db.query("SELECT * FROM `personnel` WHERE `NIN`=?", [NIN]);
    return results[0];
  }

  async insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service) {
    await db.execute(
      "INSERT INTO personnel(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email,telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [NIN, nom, prenom, new Date(date_de_naissance), lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service]
    );
  }

  async update(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service) {
    await db.query(
      "UPDATE personnel SET nom=?, prenom=?, date_de_naissance=?, lieu_de_naissance=?, sexe=?, email=?, telephone=? , fonction=?, specialite=?, grade=?, adresse=?, code_postale=?, commune=?, wilaya=?, hopital=?, service=? WHERE NIN=?",
      [nom, prenom, new Date(date_de_naissance), lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service, NIN]
    );
  }

  async remove(NIN) {
    // TODO: do soft-delete
    await db.query("DELETE FROM `personnel` WHERE NIN=?", [NIN]);
  }

  async countByHopital(hopital){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `personnel` WHERE `hopital`=?", [hopital]);
    return results[0];
  }
  
  async countByService(hopital, service){
    const [results] = await db.query("SELECT COUNT(*) AS count FROM `personnel` WHERE `hopital`=? AND `service`=?", [hopital, service]);
    return results[0];
  }
  async countGroupBySexe(hopital){
    const [results] = await db.query("SELECT `sexe`, COUNT(*) AS count FROM `personnel` WHERE `hopital`=? GROUP BY `sexe` ORDER BY `count` DESC", [hopital]);
    return results;
  }
  async countGroupByService(hopital){
    const [results] = await db.query("SELECT `service`, COUNT(*) AS count FROM `personnel` WHERE `hopital`=? GROUP BY `service` ORDER BY `count` DESC", [hopital]);
    return results;
  }
}

module.exports = new PersonnelModel();
