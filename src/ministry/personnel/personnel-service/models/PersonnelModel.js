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

  async insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service) {
    await db.execute(
      "INSERT INTO personnel(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email,telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service]
    );
  }

  async update(NIN, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service) {
    await db.query(
      "UPDATE personnel SET email=?, telephone=? , fonction=?, specialite=?, grade=?, adresse=?, code_postale=?, commune=?, wilaya=?, nom_hopital=?, service=? WHERE NIN=?",
      [email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service, NIN]
    );
  }

  async remove(NIN) {
    // TODO: do soft-delete
    await db.query("DELETE FROM `personnel` WHERE NIN=?", [NIN]);
  }
}

module.exports = new PersonnelModel();
