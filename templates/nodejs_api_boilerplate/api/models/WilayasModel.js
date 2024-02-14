const db = require('../../config/database').db;

exports.validationRules = {
    code: ['required', 'integer'],
    nom: ['required', 'string']
}

exports.count = async (data) => {
    return 1
}

exports.select = async (data) =>{
    const [results, fields] = await db.query('SELECT * FROM `wilayas`');
    return results
}

exports.insert = async (data) => {
    return 1
}

exports.update = async (data) => {
    return 1
}

exports.delete = async (data) => {
    return 1
}