const { db } = require("../config/database");

class ChambresService {
  validationRules = {};
  async select(service) {
    const [results] = await db.query(`
    SELECT c.service, c.num, c.etage, c.description, COUNT(l.num) AS nombre_lits, SUM(l.occupe) AS nombre_lits_occupe FROM chambres c
    LEFT JOIN lits l ON c.num = l.numChambre AND c.service = l.service GROUP BY
    c.service, c.num, c.etage, c.description;`, [service]);
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

  async occuper(service, numChambre, num) {
    await db.query("UPDATE `lits` SET occupe=1 WHERE service=? AND numChambre=? AND num=?", [service, numChambre, num]);
  }

  async liberer(service, numChambre, num) {
    await db.query("UPDATE `lits` SET occupe=0 WHERE service=? AND numChambre=? AND num=?", [service, numChambre, num]);
  }

  async insert(service, num, etage, description) {
    await db.execute("INSERT INTO chambres(service, num, etage, description) VALUES (?, ?, ?, ?)", [service, num, etage, description ?? null]);
  }
  
  async insertLit(service, num, numChambre, type, remarques) {
    console.log(service, num, numChambre, type, remarques)
    await db.execute("INSERT INTO lits(service, num, numChambre, type, remarques) VALUES (?, ?, ?, ?, ?)", [service, num, numChambre, type, remarques ?? null]);
  }

  async update(service, num, etage, description) {
    await db.query("UPDATE chambres SET etage=?, description=? WHERE service=? AND num=?", [etage, description, service, num]);
  }

  async remove(service, num) {
    //TODO: replace with soft-delete
    await db.query("DELETE FROM `chambres` WHERE service=? AND num=?", [service, num]);
  }
}

module.exports = new ChambresService();
