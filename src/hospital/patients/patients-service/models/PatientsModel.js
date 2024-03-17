const db = require('../config/database').db;

exports.validationRules = {
}

exports.select = async () => {
    const [results] = await db.query('SELECT * FROM `patients`');
    return results
}

exports.selectOne = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `patients` WHERE `NIN`=?', [NIN]);
    return results[0]
}

exports.selectMaladiesChroniques = async (NIN) => {
    return [{code_maladie:"AS531", date_diagonstic:"2024-02-16 08:00", remarques: "Sévère"}]
}

exports.selectAllergies = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `allergies` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
    return results
}

exports.selectAntecedentsMedicals = async (NIN) => {
    return [{ code_antecedent: "AS531", description: "Appendicectomie" }]
}

exports.selectAntecedentsFamiliaux = async (NIN) => {
    return [{ code_antecedent: "AS531", description: "Diabète Type 2" }]
}

exports.selectMedicaments = async (NIN) => {
    return [{ code_medicament: "AS531", date_debut: "2024-02-16 08:00", posologie: 1000, frequence: 3, duree: 7, remarques: "R.A.S" }]
}

exports.selectVaccinations = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `vaccinations` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
    return results
}

exports.selectConsultations = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `consultations` WHERE `patient`=? ORDER BY `date_consultation` DESC', [NIN]);
    return results
}

exports.selectHospitalisations = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `hospitalisations` WHERE `patient`=? ORDER BY `date_entree` DESC', [NIN]);
    return results
}

exports.selectInterventions = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `interventions` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
    return results
}
