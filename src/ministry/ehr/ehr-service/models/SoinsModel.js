const { db } = require("../config/database");

class SoinsModel {
  validationRules = {};
  
  async select() {
    const [results] = await db.query("SELECT code_soin, soins.patient, soins.medecin, soins.infirmier, hospitalisation, soins.nom_hopital, acte, date_soin, details, fait, hospitalisations.chambre AS chambre, hospitalisations.lit AS lit FROM `soins` LEFT JOIN `hospitalisations` ON `soins`.`hospitalisation`=`hospitalisations`.`code_hospitalisation`");
    return results;
  }

  async selectOne(code_soin) {
    const [results] = await db.query("SELECT * FROM `soins` WHERE `code_soin`=?", [code_soin]);
    return results;
  }

  async insert(code_soin, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait) {
    await db.execute("INSERT INTO soin(code_soin, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [code_soin, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait]);
  }

  async executer(code_soin) {
    await db.query("UPDATE soin SET fait=1 WHERE code_soin=?", [code_soin]);
  }
}

module.exports = new SoinsModel();
