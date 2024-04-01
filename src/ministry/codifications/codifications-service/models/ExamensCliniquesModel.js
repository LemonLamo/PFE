const { db } = require("../config/database");

class AllergenesModel {
  async getAll(search) {
    const [results] = await db.query("SELECT * FROM `examens_cliniques` WHERE CONCAT(`code_examen_clinique`, ' - ', `designation`) LIKE ? LIMIT 20", ['%'+search+'%']);
    return results
  }

  async getOne(code_examen_clinique){
    const [results] = await db.query("SELECT * FROM `examens_cliniques` WHERE `code_examen_clinique`=?", [code_examen_clinique]);
    return results
  }

  async selectByCodes(codes_examens_cliniques){
    const [results] = await db.query('SELECT * FROM `examens_cliniques` WHERE `code_examen_clinique` IN (?)', [codes_examens_cliniques]);
    return results
  }
}

module.exports = new AllergenesModel();
