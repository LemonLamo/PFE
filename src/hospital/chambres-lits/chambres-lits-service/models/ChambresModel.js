const { db } = require("../config/database");

class ChambresService {
  validationRules = {};
  async select(service) {
    const [results] = await db.query("SELECT * FROM chambres WHERE `service`=?", [service]);
    return results;
  }
  async selectOne(service, num) {
    const [results] = await db.query("SELECT * FROM `chambres` WHERE `service`=? AND `num`=?", [service, num]);
    return results;
  }

  async selectLits(service, num) {
    const [results] = await db.query("SELECT * FROM `lits` WHERE service=? AND `numChambre`=?", [service, num]);
    return results;
  }
  async selectLitsOccupe(service, num) {
    const [results] = await db.query("SELECT * FROM `lits` WHERE service=? AND `numChambre`=? AND occupe=1", [service, num]);
    return results;
  }
  async selectLitsDisponible(service, num) {
    const [results] = await db.query("SELECT * FROM `lits` WHERE service=? AND `numChambre`=? AND occupe=0", [service, num]);
    return results;
  }

  async insert(service, num, etage, description, nombre_lits) {
    await db.execute("INSERT INTO chambres(service, num, etage, description, nombre_lits, nombre_lits_occupe) VALUES (?, ?, ?, ?, ?, 0)", [service, num, etage, description ?? null, nombre_lits]);
  }
  
  async insertLit(service, num, numChambre, type, remarques) {
    await db.execute("INSERT INTO lits(service, num, numChambre, type, remarques) VALUES (?, ?, ?, ?, ?)", [service, num, numChambre, type, remarques ?? null]);
  }

  async update(service, num, etage, nombre_lits, description) {
    await db.query("UPDATE chambres SET etage=?, nombre_lits=?, description=? WHERE service=? AND num=?", [etage, nombre_lits, description, serivce, num]);
  }

  async remove(service, num) {
    //TODO: replace with soft-delete
    await db.query("DELETE FROM `chambres` WHERE service=? AND num=?", [service, num]);
  }
}

module.exports = new ChambresService();
