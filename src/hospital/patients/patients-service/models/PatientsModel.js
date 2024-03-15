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

exports.selectAllergies = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `allergies` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
    return results
}
exports.selectVaccinations = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `vaccinations` WHERE `patient`=? ORDER BY `date` DESC', [NIN]);
    return results
}
