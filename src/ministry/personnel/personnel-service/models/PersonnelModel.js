const { db } = require("../config/database");
const logger = require("../utils/logger");

class PersonnelModel {
  validationRules = { sexe: ["required", "in:Homme,Femme"] };
  async selectAllSnippet(search, hopital, service, fonction) {
    try {
      let whereClause = "";
      const params = [];

      if (search) {
        whereClause += "(`NIN` LIKE ? OR CONCAT(`nom`, ' ', `prenom`) LIKE ?)";
        params.push("%" + search + "%", "%" + search + "%");
      }

      if (fonction) {
        whereClause +=
          (whereClause.length > 0 ? " AND " : "") + "`fonction` = ?";
        params.push(fonction);
      }

      if (hopital && service) {
        whereClause +=
          (whereClause.length > 0 ? " AND " : "") +
          "`hopital` = ? AND `service` = ?";
        params.push(hopital, service);
      }
      // Construct the final SQL statement
      const sql =
        "SELECT `NIN`, `nom`, `prenom` FROM personnel" +
        (whereClause.length > 0 ? ` WHERE ${whereClause}` : "");
      console.log(sql, params);

      // Execute the query and return results
      const [results] = await db.query(sql, params);
      return results;
    } catch (error) {
      logger.error("Error fetching personnel:", error);
      throw error;
    }
  }

  async selectAll(hopital) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `personnel` WHERE hopital=?",
        [hopital]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching personnel:", error);
      throw error;
    }
  }

  async selectOne(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `personnel` WHERE `NIN`=?",
        [NIN]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching personnel:", error);
      throw error;
    }
  }

  async insert(
    NIN,
    nom,
    prenom,
    date_de_naissance,
    lieu_de_naissance,
    sexe,
    email,
    telephone,
    fonction,
    specialite,
    grade,
    adresse,
    code_postale,
    commune,
    wilaya,
    hopital,
    service
  ) {
    try {
      await db.execute(
        "INSERT INTO personnel(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email,telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          NIN,
          nom,
          prenom,
          new Date(date_de_naissance),
          lieu_de_naissance,
          sexe,
          email,
          telephone,
          fonction,
          specialite,
          grade,
          adresse,
          code_postale,
          commune,
          wilaya,
          hopital,
          service,
        ]
      );
    } catch (error) {
      logger.error("Error inserting personnel:", error);
      throw error;
    }
  }

  async update(
    NIN,
    nom,
    prenom,
    date_de_naissance,
    lieu_de_naissance,
    sexe,
    email,
    telephone,
    fonction,
    specialite,
    grade,
    adresse,
    code_postale,
    commune,
    wilaya,
    hopital,
    service
  ) {
    try {
      await db.query(
        "UPDATE personnel SET nom=?, prenom=?, date_de_naissance=?, lieu_de_naissance=?, sexe=?, email=?, telephone=? , fonction=?, specialite=?, grade=?, adresse=?, code_postale=?, commune=?, wilaya=?, hopital=?, service=? WHERE NIN=?",
        [
          nom,
          prenom,
          new Date(date_de_naissance),
          lieu_de_naissance,
          sexe,
          email,
          telephone,
          fonction,
          specialite,
          grade,
          adresse,
          code_postale,
          commune,
          wilaya,
          hopital,
          service,
          NIN,
        ]
      );
    } catch (error) {
      logger.error("Error updating personnel:", error);
      throw error;
    }
  }

  async remove(NIN) {
    try {
      // TODO: do soft-delete
      await db.query("DELETE FROM `personnel` WHERE NIN=?", [NIN]);
    } catch (error) {
      logger.error("Error deleting personnel:", error);
      throw error;
    }
  }

  async countByHopital(hopital) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `personnel` WHERE `hopital`=?",
        [hopital]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting personnel:", error);
      throw error;
    }
  }

  async countByService(hopital, service) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `personnel` WHERE `hopital`=? AND `service`=?",
        [hopital, service]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting personnel:", error);
      throw error;
    }
  }
  async countGroupBySexe(hopital) {
    try {
      const [results] = await db.query(
        "SELECT `sexe`, COUNT(*) AS count FROM `personnel` WHERE `hopital`=? GROUP BY `sexe` ORDER BY `count` DESC",
        [hopital]
      );
      return results;
    } catch (error) {
      logger.error("Error counting personnel:", error);
      throw error;
    }
  }
  async countGroupByService(hopital) {
    try {
      const [results] = await db.query(
        "SELECT `service`, COUNT(*) AS count FROM `personnel` WHERE `hopital`=? GROUP BY `service` ORDER BY `count` DESC",
        [hopital]
      );
      return results;
    } catch (error) {
      logger.error("Error counting personnel:", error);
      throw error;
    }
  }

  // PRIVATE VERSIONS
  async selectByNINs(NINs) {
    try {
      const [results] = await db.query(
        "SELECT NIN, nom, prenom, sexe, date_de_naissance, lieu_de_naissance, email, telephone, hopital, service FROM `personnel` WHERE `NIN` IN (?)",
        [NINs]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching personnel:", error);
      throw error;
    }
  }

  async selectByNIN(NIN) {
    try {
      const [results] = await db.query(
        "SELECT NIN, nom, prenom, sexe, date_de_naissance, lieu_de_naissance, email, telephone, hopital, service FROM `personnel` WHERE `NIN`= ?",
        [NIN]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching patients:", error);
      throw error;
    }
  }
}

module.exports = new PersonnelModel();
