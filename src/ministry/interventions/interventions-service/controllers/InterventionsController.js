const Model = require('../models/InterventionsModel');
const { fetchInterventions, fetchPatients } = require('../utils/communication');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
    async select(req, res){
        const { patient } = req.query
        if(patient){
            const data = await Model.getByPatient(patient);
            const interventions = await fetchInterventions(data)

            const result = data.map((x) => ({ ...x, designation: interventions.get(x.code_intervention).designation }))
            return res.status(200).json(result);
        }
        return res.status(400).json({errorCode: "", errorMessage: ""})
    }
    async selectByMedecin(req, res) {
        const data = await Model.getActiveByMedecin(req.jwt.NIN);
        const patients = await fetchPatients(data)
        
        const result = data.map((x) => ({ ...x, patient: patients.get(x.patient) }))
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

    async timeline(req, res){
        const { hopital, medecin, duree } = req.query;
        if(hopital && medecin){
            const array = await Model.getTimelinePerMedecin(hopital, medecin, duree);
            const results = Object.fromEntries(array.map(({ date_key, interventions }) => [date_key, interventions]));
            return res.status(200).json(results);
        }else if(hopital){
            const array = await Model.getTimelinePerHopital(hopital, duree);
            const results = Object.fromEntries(array.map(({ date_key, interventions }) => [date_key, interventions]));
            return res.status(200).json(results);
        }
    }
}

/******** EXPORTS ********/
module.exports = new InterventionsController();