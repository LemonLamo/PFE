const db = require('../config/database').db;

exports.validationRules = {
    NIN: ['required', 'digits:18'],
    email: ['required', 'email'],
    password: ['required', 'string']
}

exports.select = async () => {
    const [results, fields] = await db.query('SELECT * FROM `medicaments`');
    return results
}

exports.insert = async (code, nom, quantity) => {
    const [results, fields] = await db.query('INSERT INTO `medicaments`(`code`, `nom`, `quantity`) VALUES (?, ?, ?)', [code, nom, quantity]);
    return results
}
exports.update = async (code, quantity) => {
    const [results, fields] = await db.query('UPDATE `medicaments` SET `quantity`=? WHERE `code`=?', [quantity, code]);
    return results
}
exports.remove = async (code) => {
    const [results, fields] = await db.query('DELETE FROM `medicaments` WHERE code=?', [code]);
    return results
}
