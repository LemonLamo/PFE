const { db } = require("../config/database");

class RadiosModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `radios`");
    return results;
  }

  async getByReference(NIN) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE `reference`=?", [NIN]);
    return results;
  }

  async insert(id, patient, reference, code_radio, date, remarques){
    await db.execute("INSERT INTO `radios` (`id`, `patient`, `reference`, `code_radio`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)", [id, patient, reference, code_radio, new Date(date), remarques ?? null])
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE `id`=?", [id]);
    return results[0];
  }

  async mark_as_done(id, files){
    const [results] = await db.query("UPDATE `radios` SET `date_fait`=NOW() WHERE `id`=?", [id]);
    for (let file of files)
      await db.query("INSERT `radios_files`(`id`, `file`) VALUES (?, ?)", [id, file.path]);
    return results;
  }

  async getResults(id){
    const [results] = await db.query("SELECT * FROM `radios_files` WHERE `id`=?", [id]);
    return results;
  }

  async getResultOne(id, num){
    const [results] = await db.query("SELECT * FROM `radios_files` WHERE `id`=? LIMIT 1 OFFSET ?", [id, (num-1)]);
    return results[0];
  }
}

module.exports = new RadiosModel();
