const { default: axios } = require('axios');
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
    const consultations = (await axios.get(`http://ehr-service:8080/api/consultations?patient=${NIN}`, {headers:{Cookie: req.headers.cookie}})).data;
    const hospitalisations = (await axios.get(`http://ehr-service:8080/api/hospitalisations?patient=${NIN}`, {headers:{Cookie: req.headers.cookie}})).data;
    const interventions = (await axios.get(`http://ehr-service:8080/api/interventions?patient=${NIN}`, {headers:{Cookie: req.headers.cookie}})).data;
    return res.status(200).json([...consultations, ...hospitalisations, ...interventions].sort((a, b) => new Date(b.date_consultation ?? b.date_entree ?? b.date) - new Date(a.date_consultation ?? a.date_entree ?? a.date)))
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