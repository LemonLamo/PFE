const { db } = require("../config/database");

class MaladiesModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `maladies` WHERE CONCAT(`code_maladie`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }

  async getOne(code_maladie){
    const [results] = await db.query("SELECT * FROM `maladies` WHERE `code_maladie`=?", [code_maladie]);
    return results
  }

  async getAllChronique(search){
    const [results] = await db.query("SELECT * FROM `maladies` WHERE `chronique`=1 AND CONCAT(`code_maladie`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }

  async getOneChronique(code_maladie){
    const [results] = await db.query("SELECT * FROM `maladies` WHERE `code_maladie`=? AND `chronqiue`=1", [code_maladie]);
    return results
  }

  async selectByCodes(codes_maladies){
    const [results] = await db.query('SELECT * FROM `maladies` WHERE `code_maladie` IN (?)', [codes_maladies]);
    return results
  }
}

module.exports = new MaladiesModel();
