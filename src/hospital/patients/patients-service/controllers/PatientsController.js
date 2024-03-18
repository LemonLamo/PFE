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
async function getMaladiesChroniques(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectMaladiesChroniques(NIN);
    return res.status(200).json(result)
}
async function getAllergies(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectAllergies(NIN);
    return res.status(200).json(result)
}
async function getAntecedentsMedicals(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectAntecedentsMedicals(NIN);
    return res.status(200).json(result)
}
async function getAntecedentsFamiliaux(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectAntecedentsFamiliaux(NIN);
    return res.status(200).json(result)
}
async function getMedicaments(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectMedicaments(NIN);
    return res.status(200).json(result)
}
async function getVaccinations(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectVaccinations(NIN);
    return res.status(200).json(result)
}
async function getHistorique(req, res) {
    const { NIN } = req.params;
    const result1 = await Model.selectConsultations(NIN);
    const result2 = await Model.selectHospitalisations(NIN);
    const result3 = await Model.selectInterventions(NIN);
    return res.status(200).json([...result1, ...result2, ...result3].sort((a, b) => new Date(a.date_consultation ?? a.date_entree ?? a.date) - new Date(b.date_consultation ?? b.date_entree ?? b.date)))
}

/******** EXPORTS ********/
module.exports = {
    getAll,
    getOne,
    getMaladiesChroniques,
    getAllergies,
    getAntecedentsMedicals,
    getAntecedentsFamiliaux,
    getMedicaments,
    getVaccinations,
    getHistorique,
}