const { db } = require("../config/database");
const logger = require("../utils/logger");

class ConsultationsModel {
  validationRules = {};

  async selectByMedecin(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `consultations` WHERE `medecin`=? ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching consultations:", error);
      throw error;
    }
  }

  async selectByPatient(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `consultations` WHERE `patient`=? ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching consultations:", error);
      throw error;
    }
  }

  async selectOne(id) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `consultations` WHERE `id`=?",
        [id]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching consultations:", error);
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
    type,
    motif,
    symptomes,
    resume,
    diagnostique,
    diagnostique_details,
    duree_arret_de_travail
  ) {
    try {
      await db.execute(
        "INSERT INTO consultations(id, patient, medecin, hopital, service, date, type, motif, symptomes, resume, diagnostique, diagnostique_details, duree_arret_de_travail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          medecin,
          hopital,
          service,
          new Date(date),
          type,
          motif,
          symptomes,
          resume,
          diagnostique,
          diagnostique_details,
          duree_arret_de_travail ?? null,
        ]
      );
    } catch (error) {
      logger.error("Error inserting consultations:", error);
      throw error;
    }
  }

  async countByHopital(hopital) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `consultations` WHERE `hopital`=?",
        [hopital]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting consultations:", error);
      throw error;
    }
  }

  async countToday(hopital) {
    try {
      const [results] = await db.query(
        "SELECT COUNT(*) AS count FROM `consultations` WHERE `hopital`=? AND date >= CURDATE() AND date < CURDATE() + INTERVAL 1 DAY",
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
        "SELECT service, COUNT(*) AS count FROM `consultations` WHERE `hopital`=? GROUP BY service",
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
        "SELECT COUNT(*) AS count FROM `consultations` WHERE `hopital`=? AND `medecin`=?",
        [hopital, medecin]
      );
      return results[0];
    } catch (error) {
      logger.error("Error counting consultations:", error);
      throw error;
    }
  }

  async selectTimelinePerMedecin(hopital, medecin, duree) {
    try {
      const [results] = await db.query(
        `SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
        COUNT(id) AS consultations
        FROM consultations 
        WHERE hopital = ?
        AND medecin = ?
        AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
        GROUP BY date_key ORDER BY date_key;`,
        [hopital, medecin, duree]
      );

      return results;
    } catch (error) {
      logger.error("Error fetching consultations:", error);
      throw error;
    }
  }
  async selectTimelinePerHopital(hopital, duree) {
    try {
      const [results] = await db.query(
        `SELECT DATE_FORMAT(date, '%Y-%m') AS date_key,
          COUNT(id) AS consultations
          FROM consultations 
          WHERE hopital = ?
          AND date >= DATE_SUB(NOW(), INTERVAL ? MONTH)
          GROUP BY date_key ORDER BY date_key;`,
        [hopital, duree]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching consultations:", error);
      throw error;
    }
  }
}

module.exports = new ConsultationsModel();
