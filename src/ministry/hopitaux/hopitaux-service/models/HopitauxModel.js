const { db } = require("../config/database");

class Hopitaux {
  validationRules = {};
  
  async select() {
    const [results] = await db.query("SELECT * FROM `hopitaux`;");
    return results;
  }

  async selectOne(hopital) {
    const [results] = await db.query("SELECT * FROM `hopitaux` WHERE `hopital`=?", [hopital]);
    return results;
  }

  async selectServices(hopital) {
    const [results] = await db.query("SELECT * FROM `services` WHERE `hopital`=?", [hopital]);
    return results;
  }
}

module.exports = new Hopitaux();
