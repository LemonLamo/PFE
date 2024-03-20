const { db } = require("../config/database");
const logger = require("../utils/logger");

class PersonnelService {
  validationRules = { sexe: ["required", "in:Homme,Femme"] };
  async select() {
    try {
      const [results] = await db.query("SELECT * FROM `personnel`");
      return results;
    } catch (error) {
      logger.error("Error selecting personnel: " + error.message);
      throw new Error("Error selecting personnel: " + error.message);
    }
  }
  async selectOne(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `personnel` WHERE `NIN`=?",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error selecting personnel: " + error.message);
      throw new Error("Error selecting personnel: " + error.message);
    }
  }

  async insert(
    NIN,
    nom,
    prenom,
    nom_user,
    date_de_naissance,
    lieu_de_naissance,
    sexe,
    email,
    telephone,
    fonction,
    specialite,
    grade,
    adresse,
    code_postal,
    commune,
    wilaya
  ) {
    try {
      await db.execute(
        "INSERT INTO personnel(NIN, nom, prenom, nom_user, date_de_naissance, lieu_de_naissance, sexe, email,telephone, fonction, specialite, grade, adresse, code_postal, commune, wilaya) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          NIN,
          nom,
          prenom,
          nom_user,
          date_de_naissance,
          lieu_de_naissance,
          sexe,
          email,
          telephone,
          fonction,
          specialite,
          grade,
          adresse,
          code_postal,
          commune,
          wilaya,
        ]
      );
    } catch (error) {
      logger.error("Error inserting personnel: " + error.message);
      throw new Error("Error inserting personnel: " + error.message);
    }
  }

  async update(
    NIN,
    email,
    telephone,
    fonction,
    specialite,
    grade,
    adresse,
    code_postal,
    commune,
    wilaya
  ) {
    try {
      await db.query(
        "UPDATE personnel SET email=?, telephone=? , fonction=?, specialite=?, grade=?, adresse=?, code_postal=?, commune=?, wilaya=? WHERE NIN=?",
        [
          email,
          telephone,
          fonction,
          specialite,
          grade,
          adresse,
          code_postal,
          commune,
          wilaya,
          NIN,
        ]
      );
    } catch (error) {
      logger.error("Error updating personnel: " + error.message);
      throw new Error("Error updating personnel: " + error.message);
    }
  }

  async remove(NIN) {
    try {
      await db.query("DELETE FROM `personnel` WHERE NIN=?", [NIN]);
    } catch (error) {
      logger.error("Error removing personnel: " + error.message);
      throw new Error("Error removing personnel: " + error.message);
    }
  }
}

module.exports = new PersonnelService();
