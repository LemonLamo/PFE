const { db } = require("../config/database");

class Hopitaux {
  validationRules = {};
  
  async select() {
    const [results] = await db.query("SELECT * FROM `hopitaux`;");
    return results;
  }

  async selectOne(nom_hopital) {
    const [results] = await db.query("SELECT * FROM `hopitaux` WHERE `nom_hopital`=?", [nom_hopital]);
    return results;
  }

  async selectServices(nom_hopital) {
    const [results] = await db.query("SELECT * FROM `services` WHERE `nom_hopital`=?", [nom_hopital]);
    return results;
  }

  async selectByNomHopitaux(nom_hopitaux) {
    const [results] = await db.query("SELECT * FROM `hopitaux` WHERE `nom_hopital` IN (?)", [nom_hopitaux]);
    return results;
  }

  async selectByNomHopital(nom_hopital) {
    const [results] = await db.query("SELECT * FROM `hopitaux` WHERE `nom_hopital`=?", [nom_hopital]);
    return results[0];
  }
}

module.exports = new Hopitaux();
