const { db } = require("../config/database");

class AllergenesModel {
  async getAll() {
    const [results] = await db.query('SELECT * FROM `allergenes`');
    return results
  }

  async getOne(codeConsultation){
    const [results] = await db.query('SELECT * FROM `allergenes` WHERE `code`=?', [codeConsultation]);
    return results
  }
}

module.exports = new AllergenesModel();
