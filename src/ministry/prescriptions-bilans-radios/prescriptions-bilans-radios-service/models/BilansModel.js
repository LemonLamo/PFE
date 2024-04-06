const { db } = require("../config/database");

class BilansModel {
  validationRules = {};
  async getAll() {
    const [results] = await db.query("SELECT * FROM `bilans`");
    return results;
  }

  async getByReference(NIN) {
    const [results] = await db.query("SELECT * FROM `bilans` WHERE `reference`=?", [NIN]);
    return results;
  }

  async insert(id, patient, reference, code_bilan, date, remarques){
    await db.execute("INSERT INTO `bilans` (`id`, `patient`, `reference`, `code_bilan`, `date`, `remarques`) VALUES (?, ?, ?, ?, ?, ?)", [id, patient, reference, code_bilan, new Date(date), remarques ?? null])
  }

  async getOne(id) {
    const [results] = await db.query("SELECT * FROM `bilans` WHERE `id`=?", [id]);
    return results;
  }

  async mark_as_done(id, files){
    const [results] = await db.query("UPDATE `bilans` SET `date_fait`=NOW() WHERE `id`=?", [id]);
    for (let file of files)
      await db.query("INSERT `bilans_files`(`id`, `file`) VALUES (?, ?)", [id, file.path]);
    return results;
  }

  async getResults(id){
    const [results] = await db.query("SELECT * FROM `bilans_files` WHERE `id`=?", [id]);
    return results;
  }

  async getResultOne(id, num){
    const [results] = await db.query("SELECT * FROM `bilans_files` WHERE `id`=? LIMIT 1 OFFSET ?", [id, (num-1)]);
    return results[0];
  }
}

module.exports = new BilansModel();
