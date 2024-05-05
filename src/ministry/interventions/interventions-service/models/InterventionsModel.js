const { db } = require("../config/database");
const logger = require("../utils/logger");

class ConsultationsModel {
  validationRules = {};
  async selectAll() {
    try {
      const [results] = await db.query("SELECT * FROM `interventions`");
      return results;
    } catch (error) {
      logger.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async selectOne(id) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `interventions` WHERE `id`=?",
        [id]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async selectByPatient(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `interventions` WHERE `patient`=? ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async selectByMedecin(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `interventions` WHERE `medecin`=? ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async selectInactiveByMedecin(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `interventions` WHERE `medecin`=? AND (`protocole_operatoire`='' OR `protocole_operatoire` IS NULL) ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async insert(
    id,
    patient,
    medecin,
    hopital,
    service,
    date,
    code_intervention,
    remarques,
    protocole_operatoire
  ) {
    try {
      await db.execute(
        "INSERT INTO interventions(id, patient, medecin, hopital, service, date, code_intervention, remarques, protocole_operatoire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          medecin,
          hopital,
          service,
          new Date(date),
          code_intervention,
          remarques ?? null,
          protocole_operatoire ?? null,
        ]
      );
    } catch (error) {
      logger.error("Error inserting interventions:", error);
      throw error;
    }
  }

  async executer(id, protocole_operatoire) {
    try {
      await db.execute(
        "UPDATE interventions SET protocole_operatoire=? WHERE id=?",
        [protocole_operatoire, id]
      );
    } catch (error) {
      logger.error("Error updating interventions:", error);
      throw error;
    }
  }

  async countByHopital(hopital) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `interventions` WHERE `hopital`=?",
        [hopital]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting interventions:", error);
      throw error;
    }
  }

  async countToday(hopital) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `interventions` WHERE `hopital`=? AND date >= CURDATE() AND date < CURDATE() + INTERVAL 1 DAY",
        [hopital]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting consultations:", error);
      throw error;
    }
  }

  async countByService(hopital) {
    try {
      const [results] = await db.query(
        "SELECT service, COUNT(*) AS count FROM `interventions` WHERE `hopital`=? GROUP BY service",
        [hopital]
      );
      return results;
    } catch (error) {
      logger.error("Error counting consultations:", error);
      throw error;
    }
  }

  async countByMedecin(hopital, medecin) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `interventions` WHERE `hopital`=? AND `medecin`=?",
        [hopital, medecin]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting interventions:", error);
      throw error;
    }
  }

  async selectTimelinePerMedecin(hopital, medecin, duree) {
    try {
      const [results] = await db.query(
        `SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
    COUNT(id) AS interventions
    FROM interventions 
    WHERE hopital = ?
    AND medecin = ?
    AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`,
        [hopital, medecin, duree]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching interventions:", error);
      throw error;
    }
  }

  async selectTimelinePerHopital(hopital, duree) {
    try {
      const [results] = await db.query(
        `SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
    COUNT(id) AS interventions
    FROM interventions 
    WHERE hopital = ?
    AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
    GROUP BY date_key ORDER BY date_key;`,
        [hopital, duree]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching interventions:", error);
      throw error;
    }
  }
}

module.exports = new ConsultationsModel();
