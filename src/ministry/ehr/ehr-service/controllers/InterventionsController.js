const Model = require('../models/InterventionsModel');
const { fetchInterventions, fetchPatients } = require('../utils/communication');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
    async select(req, res){
        const { patient } = req.query
        if(patient){
            let interventions = await Model.getByPatient(patient);
            interventions = await fetchInterventions(interventions)
            return res.status(200).json(interventions)
        }
        return res.status(400).json({errorCode: "", errorMessage: ""})
    }
    async selectByMedecin(req, res) {
        const interventions = await Model.getActiveByMedecin(req.jwt.NIN);
        const result = await fetchPatients(interventions);
        return res.status(200).json(result);
    }
    async selectOne(req, res) {
        const { id } = req.params;
        const result = await Model.getOne(id);
        return res.status(200).json(result);
    }
    async selectCount(req, res){
        const { hopital, medecin } = req.query;
        if(hopital && medecin){
            const result = await Model.countByMedecin(hopital, medecin);
            return res.status(200).json(result);
        }else if(hopital){
            const result = await Model.countByHopital(hopital);
            return res.status(200).json(result);
        }
        return res.status(403).json({});
    }
}

/******** EXPORTS ********/
module.exports = new InterventionsController();