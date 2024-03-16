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
  async selectOne(id) {
    try {
      const [results] = await db.query("SELECT * FROM `lits` WHERE `id`=?", [
        id,
      ]);
      return results;
    } catch (error) {
      logger.error("Error selecting lits: " + error.message);
      throw new Error("Error selecting lits: " + error.message);
    }
  }

  async insert(id, etat, occupation, chambre_id, unité) {
    try {
      await db.execute(
        "INSERT INTO lits(id, etat, occupation, chambre_id, unité) VALUES (?, ?, ?, ?, ?)",
        [id, etat, occupation, chambre_id, unité]
      );
    } catch (error) {
      logger.error("Error inserting lit: " + error.message);
      throw new Error("Error inserting lit: " + error.message);
    }
  }

  async update(id, etat, occupation, chambre_id, unité) {
    try {
      await db.query(
        "UPDATE lits SET id=?, etat=?, occupation=?, chambre_id=?, unité=? WHERE id=?",
        [id, etat, occupation, chambre_id, unité]
      );
    } catch (error) {
      logger.error("Error updating lit: " + error.message);
      throw new Error("Error updating lit: " + error.message);
    }
  }

  async remove(id) {
    try {
      await db.query("DELETE FROM lits WHERE id=?", [id]);
    } catch (error) {
      logger.error("Error removing lit: " + error.message);
      throw new Error("Error removing lit: " + error.message);
    }
  }
}

module.exports = new LitsService();
