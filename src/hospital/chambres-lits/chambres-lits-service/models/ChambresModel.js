const { db } = require("../config/database");
const logger = require("../utils/logger");

class ChambresService {
  validationRules = {};
  async select() {
    try {
      const [results] = await db.query("SELECT * FROM chambres");
      return results;
    } catch (error) {
      logger.error("Error selecting chambres: " + error.message);
      throw new Error("Error selecting chambres: " + error.message);
    }
  }
  async selectOne(num) {
    try {
      const [results] = await db.query("SELECT * FROM `chambres` WHERE `num`=?", [num]);
      return results;
    } catch (error) {
      logger.error("Error selecting chambres: " + error.message);
      throw new Error("Error selecting chambres: " + error.message);
    }
  }

  async selectLits(num) {
    try {
      const [results] = await db.query("SELECT * FROM `lits` WHERE `numChambre`=?", [num]);
      return results;
    } catch (error) {
      logger.error("Error selecting chambres: " + error.message);
      throw new Error("Error selecting chambres: " + error.message);
    }
  }

  async insert(num, etage, description, nombre_lits, nombre_lits_occupe) {
    try {
      await db.execute(
        "INSERT INTO chambres(num, etage, description, nombre_lits, nombre_lits_occupe) VALUES (?, ?, ?, ?, ?)",
        [num, etage, description, nombre_lits, nombre_lits_occupe]
      );
    } catch (error) {
      logger.error("Error inserting chambre: " + error.message);
      throw new Error("Error inserting chambre: " + error.message);
    }
  }

  async update(num, nombre_lits, nombre_lits_occupe) {
    try {
      await db.query(
        "UPDATE chambres SET nombre_lits=?, nombre_lits_occupe=? WHERE num=?",
        [nombre_lits, nombre_lits_occupe, num]
      );
    } catch (error) {
      logger.error("Error updating chambre: " + error.message);
      throw new Error("Error updating chambre: " + error.message);
    }
  }

  async remove(num) {
    try {
      await db.query("DELETE FROM `chambres` WHERE num=?", [num]);
    } catch (error) {
      logger.error("Error removing chambre: " + error.message);
      throw new Error("Error removing chambre: " + error.message);
    }
  }
}

module.exports = new ChambresService();
