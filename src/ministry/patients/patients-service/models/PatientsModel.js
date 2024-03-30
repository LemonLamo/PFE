const db = require('../config/database').db;

class PatientsModel{
    validationRules = {

    }
    async insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, situation_familiale, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, groupage, taille, poids, donneur_organe) {
        await db.execute(
            "INSERT INTO patients (`NIN`, `nom`, `prenom`, `date_de_naissance`, `lieu_de_naissance`, `sexe`, `situation_familiale`, `email`,`telephone`, `adresse`, `code_postale`, `commune`, `wilaya`, `groupage`, `taille`, `poids`, `donneur_organe`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, situation_familiale, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, groupage, taille, poids, donneur_organe]
        );
    }
    async select(search) {
        const s = '%'+(search ?? '')+'%'
        const [results] = await db.query("SELECT * FROM `patients` WHERE `NIN` LIKE ? OR CONCAT(`nom`, ' - ', `prenom`) LIKE ? LIMIT 20", [s, s]);
        return results
    }

    async selectOne (NIN){
        const [results] = await db.query('SELECT * FROM `patients` WHERE `NIN`=?', [NIN]);
        return results[0]
    }

    async selectMaladiesChroniques (NIN) {
        const [results] = await db.query('SELECT * FROM `maladies_chroniques` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
        return results
    }

    async selectAllergies (NIN){
        const [results] = await db.query('SELECT * FROM `allergies` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
        return results
    }

    async selectAntecedentsMedicals(NIN){
        const [results] = await db.query("SELECT * FROM `antecedents` WHERE `patient`=? AND `type`='medical' ORDER BY `date` DESC", [NIN]);
        return results
    }

    async selectAntecedentsFamiliaux (NIN){
        const [results] = await db.query("SELECT * FROM `antecedents` WHERE `patient`=? AND `type`='familial' ORDER BY `date` DESC", [NIN]);
        return results
    }

    async selectMedicaments (NIN){
        return [{ code_medicament: "AS531", date_debut: "2024-02-16 08:00", posologie: 1000, frequence: 3, duree: 7, remarques: "R.A.S" }]
    }

    async selectVaccinations (NIN){
        const [results] = await db.query('SELECT * FROM `vaccinations` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
        return results
    }

    async selectByNINs (NINs){
        const [results] = await db.query('SELECT `NIN`, `nom`, `prenom` FROM `patients` WHERE `NIN` IN (?)', [NINs]);
        return results
    }
}
module.exports = new PatientsModel();