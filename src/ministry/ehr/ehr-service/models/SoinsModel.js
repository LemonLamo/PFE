const { db } = require("../config/database");

class SoinsModel {
  validationRules = {};
  
  async select() {
    const [results] = await db.query("SELECT soins.id, soins.patient, soins.medecin, soins.infirmier, hospitalisation, soins.hopital, acte, date_soin, details, fait, hospitalisations.chambre AS chambre, hospitalisations.lit AS lit FROM `soins` LEFT JOIN `hospitalisations` ON `soins`.`hospitalisation`=`hospitalisations`.`id`");
    return results;
  }

  async selectOne(id) {
    const [results] = await db.query("SELECT * FROM `soins` WHERE `id`=?", [id]);
    return results;
  }

  async insert(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details, fait) {
    await db.execute("INSERT INTO soin(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details, fait) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details, fait]);
  }

  async executer(id) {
    await db.query("UPDATE soin SET fait=1 WHERE id=?", [id]);
  }
}

module.exports = new SoinsModel();
