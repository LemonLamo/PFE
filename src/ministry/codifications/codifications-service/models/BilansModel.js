const { db } = require("../config/database");

class BilansModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `bilans` WHERE CONCAT(`code_bilan`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }
  
  async getOne(code_bilan){
    const [results] = await db.query('SELECT * FROM `bilans` WHERE `code_bilan`=?', [code_bilan]);
    return results
  }

  async selectByCodes(codes_bilans){
    const [results] = await db.query('SELECT * FROM `bilans` WHERE `code_bilan` IN (?)', [codes_bilans]);
    return results
  }
}

module.exports = new BilansModel();
