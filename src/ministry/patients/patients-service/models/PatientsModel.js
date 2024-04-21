const db = require("../config/database").db;

class PatientsModel {
  validationRules = {};

  async searchAll(search) {
    const s = "%" + (search ?? "") + "%";
    const [results] = await db.query(
      "SELECT `NIN`, `nom`, `prenom` FROM `patients` WHERE `NIN` LIKE ? OR CONCAT(`nom`, ' - ', `prenom`) LIKE ? LIMIT 20",
      [s, s]
    );
    return results;
  }

  async selectAll() {
    const [results] = await db.query("SELECT * FROM `patients`;");
    return results;
  }

  async insert(
    NIN,
    nom,
    prenom,
    date_de_naissance,
    lieu_de_naissance,
    sexe,
    situation_familiale,
    email,
    telephone,
    adresse,
    commune,
    code_postale,
    wilaya,
    groupage,
    taille,
    poids,
    donneur_organe,
    NIN_pere,
    NIN_mere
  ) {
    await db.execute(
      "INSERT INTO patients (`NIN`, `nom`, `prenom`, `date_de_naissance`, `lieu_de_naissance`, `sexe`, `situation_familiale`, `email`, `telephone`, `adresse`, `commune`, `code_postale`, `wilaya`, `groupage`, `taille`, `poids`, `donneur_organe`, `NIN_pere`, `NIN_mere`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        NIN,
        nom,
        prenom,
        new Date(date_de_naissance),
        lieu_de_naissance,
        sexe,
        situation_familiale,
        email,
        telephone,
        adresse,
        commune,
        code_postale,
        wilaya,
        groupage,
        taille,
        poids,
        donneur_organe,
        NIN_pere,
        NIN_mere,
      ]
    );
  }

  async selectOne(NIN) {
    const [results] = await db.query("SELECT * FROM `patients` WHERE `NIN`=?", [
      NIN,
    ]);
    return results[0];
  }

  async selectMaladiesChroniques(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `maladies_chroniques` WHERE `patient`=? ORDER BY `date` DESC",
      [NIN]
    );
    return results;
  }

  async selectAllergies(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `allergies` WHERE `patient`=? ORDER BY `date` DESC",
      [NIN]
    );
    return results;
  }

  async selectAntecedentsMedicals(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `antecedents` WHERE `patient`=? AND `type`='medical' ORDER BY `date` DESC",
      [NIN]
    );
    return results;
  }

  async selectAntecedentsFamiliaux(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `antecedents` WHERE `patient`=? AND `type`='familial' ORDER BY `date` DESC",
      [NIN]
    );
    return results;
  }

  async selectVaccinations(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `vaccinations` WHERE `patient`=? ORDER BY `date` DESC",
      [NIN]
    );
    return results;
  }

  async insertMaladieChronique(NIN, code_maladie, date, remarques, medecin) {
    await db.execute(
      "INSERT INTO maladies_chroniques (`patient`, `code_maladie`, `date`, `remarques`, `medecin`) VALUES (?, ?, ?, ?, ?)",
      [NIN, code_maladie, new Date(date), remarques ?? null, medecin]
    );
  }

  async insertAllergie(NIN, code_allergene, date, remarques, medecin) {
    await db.execute(
      "INSERT INTO allergies (`patient`, `code_allergene`, `date`, `remarques`, `medecin`) VALUES (?, ?, ?, ?, ?)",
      [NIN, code_allergene, new Date(date), remarques ?? null, medecin]
    );
  }

  async insertAntecedentMedical(NIN, designation, date, remarques, medecin) {
    await db.execute(
      "INSERT INTO antecedents (`patient`, `designation`, `date`, `remarques`, `type`, `medecin`) VALUES (?, ?, ?, ?, ?, ?)",
      [NIN, designation, new Date(date), remarques ?? null, "medical", medecin]
    );
  }

  async insertAntecedentFamilial(NIN, designation, date, remarques, medecin) {
    await db.execute(
      "INSERT INTO antecedents (`patient`, `designation`, `date`, `remarques`, `type`, `medecin`) VALUES (?, ?, ?, ?, ?, ?)",
      [NIN, designation, new Date(date), remarques ?? null, "familial", medecin]
    );
  }

  async insertVaccination(
    NIN,
    code_vaccin,
    date,
    remarques,
    date_de_prochaine_dose,
    medecin
  ) {
    await db.execute(
      "INSERT INTO vaccinations (`patient`, `code_vaccin`, `date`, `remarques`, `date_de_prochaine_dose`, `medecin`) VALUES (?, ?, ?, ?, ?, ?)",
      [
        NIN,
        code_vaccin,
        new Date(date),
        remarques ?? null,
        date_de_prochaine_dose ? new Date(date_de_prochaine_dose) : null,
        medecin,
      ]
    );
  }

  // PRIVATE VERSIONS
  async selectByNINs(NINs) {
    const [results] = await db.query(
      "SELECT * FROM `patients` WHERE `NIN` IN (?)",
      [NINs]
    );
    return results;
  }

  async selectByNIN(NIN) {
    const [results] = await db.query(
      "SELECT * FROM `patients` WHERE `NIN`= ?",
      [NIN]
    );
    return results[0];
  }
}
module.exports = new PatientsModel();
