const Model = require('../models/PatientsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
async function getAll(req, res){
    const result = await Model.select();
    return res.status(200).json(result)
}
async function getOne(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectOne(NIN);
    return res.status(200).json(result)
}
async function getAllergies(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectAllergies(NIN);
    return res.status(200).json(result)
}
async function getVaccinations(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectVaccinations(NIN);
    return res.status(200).json(result)
}

/******** EXPORTS ********/
module.exports = {
    getAll,
    getOne,
    getAllergies,
    getVaccinations,
}