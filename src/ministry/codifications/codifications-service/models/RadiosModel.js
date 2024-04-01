const { db } = require("../config/database");

class RadiosModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE CONCAT(`code_radio`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }

  async getOne(code_radio){
    const [results] = await db.query('SELECT * FROM `radios` WHERE `code_radio`=?', [code_radio]);
    return results
  }

  async selectByCodes(codes_radios){
    const [results] = await db.query('SELECT * FROM `radios` WHERE `code_radio` IN (?)', [codes_radios]);
    return results
  }
}

module.exports = new RadiosModel();
