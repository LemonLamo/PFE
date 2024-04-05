const { db } = require("../config/database");

class ChambresService {
  validationRules = {};
  async select() {
    const [results] = await db.query("SELECT * FROM chambres");
    return results;
  }
  async selectOne(num) {
    const [results] = await db.query("SELECT * FROM `chambres` WHERE `num`=?", [num]);
    return results;
  }

  async selectLits(num) {
    const [results] = await db.query("SELECT * FROM `lits` WHERE `numChambre`=?", [num]);
    return results;
  }
  async selectLitsOccupe(num) {
    const [results] = await db.query("SELECT * FROM `lits` WHERE `numChambre`=? AND occupe=1", [num]);
    return results;
  }
  async selectLitsDisponible(num) {
    const [results] = await db.query("SELECT * FROM `lits` WHERE `numChambre`=? AND occupe=0", [num]);
    return results;
  }

  async insert(num, etage, description, nombre_lits) {
    await db.execute("INSERT INTO chambres(num, etage, description, nombre_lits, nombre_lits_occupe) VALUES (?, ?, ?, ?, 0)", [num, etage, description, nombre_lits]);
  }

  async update(num, etage, nombre_lits, description) {
    await db.query("UPDATE chambres SET etage=?, nombre_lits=?, description=? WHERE num=?", [etage, nombre_lits, description, num]);
  }

  async remove(num) {
    //TODO: replace with soft-delete
    await db.query("DELETE FROM `chambres` WHERE num=?", [num]);
  }
}

module.exports = new ChambresService();
