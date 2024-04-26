const { db } = require("../config/database");
const logger = require("../utils/logger");

class Hopitaux {
  validationRules = {};

  async select() {
    try {
      const [results] = await db.query("SELECT * FROM `hopitaux`;");
      return results;
    } catch (error) {
      logger.error("Error fetching hopitaux:", error);
      throw error;
    }
  }

  async selectOne(nom_hopital) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hopitaux` WHERE `nom_hopital`=?",
        [nom_hopital]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hopitaux:", error);
      throw error;
    }
  }

  async selectServices(nom_hopital) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `services` WHERE `nom_hopital`=?",
        [nom_hopital]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching services:", error);
      throw error;
    }
  }

  async selectByNomHopitaux(nom_hopitaux) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hopitaux` WHERE `nom_hopital` IN (?)",
        [nom_hopitaux]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching hopitaux:", error);
      throw error;
    }
  }

  async selectByNomHopital(nom_hopital) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `hopitaux` WHERE `nom_hopital`=?",
        [nom_hopital]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching hopitaux:", error);
      throw error;
    }
  }
}

module.exports = new Hopitaux();
