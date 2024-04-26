const { db } = require("../config/database");
const moment = require("moment");
const logger = require("../utils/logger");

class ConsultationsModel {
  validationRules = {};
  async selectAll() {
    try {
      const [results] = await db.query("SELECT * FROM `hospitalisations`");
      return results;
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }

  async selectOne(id) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hospitalisations` WHERE `id`=?",
        [id]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }

  async selectByPatient(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hospitalisations` WHERE `patient`=? ORDER BY `date_entree` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }
  async selectByMedecin(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hospitalisations` WHERE `medecin`=? ORDER BY `date_entree` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }

  async selectActiveByMedecin(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hospitalisations` WHERE `medecin`=? and `date_sortie` IS NULL ORDER BY `date_entree` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }

  async insert(
    id,
    patient,
    medecin,
    hopital,
    service,
    date_entree,
    mode_entree,
    motif_hospitalisation,
    chambre,
    lit,
    resume_hospitalisation
  ) {
    try {
      await db.execute(
        "INSERT INTO hospitalisations(id, patient, medecin, hopital, service, date_entree, mode_entree, motif_hospitalisation, chambre, lit, resume_hospitalisation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          medecin,
          hopital,
          service,
          new Date(date_entree),
          mode_entree,
          motif_hospitalisation,
          chambre,
          lit,
          resume_hospitalisation ?? null,
        ]
      );
    } catch (error) {
      logger.error("Error inserting hospitalisations:", error);
      throw error;
    }
  }

  async countByHopital(hopital) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `hospitalisations` WHERE `hopital`=?",
        [hopital]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting hospitalisations:", error);
      throw error;
    }
  }

  async countByMedecin(hopital, medecin) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `hospitalisations` WHERE `hopital`=? AND `medecin`=?",
        [hopital, medecin]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting hospitalisations:", error);
      throw error;
    }
  }

  async addRemarque(id, remarque) {
    if (remarque) {
      remarque =
        "[" + moment(new Date()).format("DD/MM/YYYY HH:mm") + "]: " + remarque;
      await db.execute(
        "UPDATE hospitalisations SET `resume_hospitalisation`=CONCAT_WS(CHAR(10 using utf8),`resume_hospitalisation`, ?) WHERE `id`=?",
        [remarque, id]
      );
    }
  }

  async addSortie(id, mode_sortie, date_sortie) {
    try {
      await db.execute(
        "UPDATE hospitalisations SET `mode_sortie`=?, `date_sortie`=? WHERE `id`=?",
        [mode_sortie, new Date(date_sortie), id]
      );
    } catch (error) {
      logger.error("Error updating hospitalisations:", error);
      throw error;
    }
  }

  async selectTimelinePerMedecin(hopital, medecin, duree) {
    try {
      const [results] = await db.query(
        `SELECT DATE_FORMAT(date_entree, '%Y-%m') AS date_key,
    COUNT(id) AS hospitalisations
    FROM hospitalisations 
    WHERE hopital = ?
    AND medecin = ?
    AND date_entree >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`,
        [hopital, medecin, duree]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }

  async selectTimelinePerHopital(hopital, duree) {
    try {
      const [results] = await db.query(
        `SELECT DATE_FORMAT(date_entree, '%Y-%m') AS date_key,
    COUNT(id) AS hospitalisations
    FROM hospitalisations 
    WHERE hopital = ?
    AND date_entree >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`,
        [hopital, duree]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }

  async selectByIDs(IDs) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hospitalisations` WHERE `id` IN (?)",
        [IDs]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hospitalisations:", error);
      throw error;
    }
  }
}

module.exports = new ConsultationsModel();
