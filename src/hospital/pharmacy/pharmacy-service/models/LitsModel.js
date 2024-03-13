const { db } = require("../config/database");
const logger = require("../utils/logger");

class LitsService {
  validationRules = {
    unité: ["required", "in:Homme,Femme"],
    occupation: ["required", "in:occupe,vide"],
  };
  async select() {
    try {
      const [results] = await db.query("SELECT * FROM lits");
      return results;
    } catch (error) {
      logger.error("Error selecting lits: " + error.message);
      throw new Error("Error selecting lits: " + error.message);
    }
  }

  async insert(numero, etat, occupation, chambre_id, unité) {
    try {
      await db.execute(
        "INSERT INTO lits(numero, etat, occupation, chambre_id, unité) VALUES (?, ?, ?, ?, ?)",
        [numero, etat, occupation, chambre_id, unité]
      );
    } catch (error) {
      logger.error("Error inserting lit: " + error.message);
      throw new Error("Error inserting lit: " + error.message);
    }
  }

  async update(numero, etat, occupation, chambre_id, unité) {
    try {
      await db.query(
        "UPDATE lits SET numero=?, etat=?, occupation=?, chambre_id=?, unité=? WHERE numero=?",
        [numero, etat, occupation, chambre_id, unité]
      );
    } catch (error) {
      logger.error("Error updating lit: " + error.message);
      throw new Error("Error updating lit: " + error.message);
    }
  }

  async remove(numero) {
    try {
      await db.query("DELETE FROM lits WHERE numero=?", [numero]);
    } catch (error) {
      logger.error("Error removing lit: " + error.message);
      throw new Error("Error removing lit: " + error.message);
    }
  }
}

module.exports = new LitsService();
