const logger = require("../utils/logger");
const db = require("../config/database").db;

class PatientsModel {
  validationRules = {};

  async searchAll(search) {
    try {
      const s = "%" + (search ?? "") + "%";
      const [results] = await db.query(
        "SELECT `NIN`, `nom`, `prenom` FROM `patients` WHERE `NIN` LIKE ? OR CONCAT(`nom`, ' - ', `prenom`) LIKE ? LIMIT 20",
        [s, s]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching patients:", error);
      throw error;
    }
  }

  async selectAll() {
    try {
      const [results] = await db.query("SELECT * FROM `patients`;");
      return results;
    } catch (error) {
      logger.error("Error fetching patients:", error);
      throw error;
    }
  }

  async insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, situation_familiale, email, telephone, adresse, commune, code_postale, wilaya, groupage, taille, poids, donneur_organe, NIN_pere, NIN_mere   ) {
    try {
      await db.execute("INSERT INTO patients (`NIN`, `nom`, `prenom`, `date_de_naissance`, `lieu_de_naissance`, `sexe`, `situation_familiale`, `email`, `telephone`, `adresse`, `commune`, `code_postale`, `wilaya`, `groupage`, `taille`, `poids`, `donneur_organe`, `NIN_pere`, `NIN_mere`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [NIN, nom, prenom, date_de_naissance ? new Date(date_de_naissance) : null, lieu_de_naissance, sexe, situation_familiale, email, telephone, adresse, commune, code_postale, wilaya, groupage, taille, poids, donneur_organe? 1 : 0, NIN_pere, NIN_mere]
      );
    } catch (error) {
      logger.error("Error inserting patients:", error);
      throw error;
    }
  }

  async selectOne(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `patients` WHERE `NIN`=?",
        [NIN]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching patients:", error);
      throw error;
    }
  }

  async selectMaladiesChroniques(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `maladies_chroniques` WHERE `patient`=? ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching maladies chroniques:", error);
      throw error;
    }
  }

  async selectAllergies(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `allergies` WHERE `patient`=? ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching allergies:", error);
      throw error;
    }
  }

  async selectAntecedentsMedicals(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `antecedents` WHERE `patient`=? AND `type`='medical' ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching antecedents:", error);
      throw error;
    }
  }

  async selectAntecedentsFamiliaux(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `antecedents` WHERE `patient`=? AND `type`='familial' ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching antecedents:", error);
      throw error;
    }
  }

  async selectVaccinations(NIN) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `vaccinations` WHERE `patient`=? ORDER BY `date` DESC",
        [NIN]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching vaccinations:", error);
      throw error;
    }
  }

  async insertMaladieChronique(NIN, code_maladie, date, remarques, medecin) {
    try {
      await db.execute(
        "INSERT INTO maladies_chroniques (`patient`, `code_maladie`, `date`, `remarques`, `medecin`) VALUES (?, ?, ?, ?, ?)",
        [NIN, code_maladie, new Date(date), remarques ?? null, medecin]
      );
    } catch (error) {
      logger.error("Error inserting maladies chroniques:", error);
      throw error;
    }
  }

  async insertAllergie(NIN, code_allergene, date, remarques, medecin) {
    try {
      await db.execute(
        "INSERT INTO allergies (`patient`, `code_allergene`, `date`, `remarques`, `medecin`) VALUES (?, ?, ?, ?, ?)",
        [NIN, code_allergene, new Date(date), remarques ?? null, medecin]
      );
    } catch (error) {
      logger.error("Error inserting allergies:", error);
      throw error;
    }
  }

  async insertAntecedentMedical(NIN, designation, date, remarques, medecin) {
    try {
      await db.execute(
        "INSERT INTO antecedents (`patient`, `designation`, `date`, `remarques`, `type`, `medecin`) VALUES (?, ?, ?, ?, ?, ?)",
        [ NIN, designation, new Date(date), remarques ?? null, "medical", medecin ]
      );
    } catch (error) {
      logger.error("Error inserting antecedents:", error);
      throw error;
    }
  }

  async insertAntecedentFamilial(NIN, designation, date, remarques, medecin) {
    try {
      await db.execute(
        "INSERT INTO antecedents (`patient`, `designation`, `date`, `remarques`, `type`, `medecin`) VALUES (?, ?, ?, ?, ?, ?)",
        [NIN, designation, new Date(date), remarques ?? null, "familial", medecin,]
      );
    } catch (error) {
      logger.error("Error inserting antecedents:", error);
      throw error;
    }
  }

  async insertVaccination(NIN, code_vaccin, date, remarques, date_de_prochaine_dose, medecin) {
    try {
      await db.execute(
        "INSERT INTO vaccinations (`patient`, `code_vaccin`, `date`, `remarques`, `date_de_prochaine_dose`, `medecin`) VALUES (?, ?, ?, ?, ?, ?)",
        [ NIN, code_vaccin, new Date(date), remarques ?? null, date_de_prochaine_dose ? new Date(date_de_prochaine_dose) : null, medecin ]
      );
    } catch (error) {
      logger.error("Error inserting vaccinations:", error);
      throw error;
    }
  }

  // PRIVATE VERSIONS
  async selectByNINs(NINs) {
    try {
      const [results] = await db.query(
        "SELECT NIN, nom, prenom, sexe, groupage, date_de_naissance, lieu_de_naissance, email, telephone FROM `patients` WHERE `NIN` IN (?)",
        [NINs]
      );
      return results;
    } catch (error) {
      logger.error("Error fetching patients:", error);
      throw error;
    }
  }

  async selectByNIN(NIN) {
    try {
      const [results] = await db.query(
        "SELECT NIN, nom, prenom, sexe, groupage, date_de_naissance, lieu_de_naissance, email, telephone FROM `patients` WHERE `NIN`= ?",
        [NIN]
      );
      return results[0];
    } catch (error) {
      logger.error("Error fetching patients:", error);
      throw error;
    }
  }
}
module.exports = new PatientsModel();
