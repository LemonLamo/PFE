const Model = require('../models/InterventionsModel');
const { fetchInterventions, fetchPatients, fetchMedecins } = require('../utils/communication');
const { genID } = require('../utils');
const RabbitConnection = require('../config/amqplib')
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
    async select(req, res){
        const { NIN, role } = req.jwt;

        // If patient, reply with history for that patient.
        if(role == undefined){
            const data = await Model.selectByPatient(NIN);
            const [interventions] = await Promise.all([fetchInterventions(data)])
            const result = data.map((x) => ({ ...x, patient: patients.get(x.patient), designation: interventions.get(x.code_intervention).designation }))
            return res.status(200).json(result);
        }

        // If doctor, reply with history for that doctor.
        else{
            const { patient, fait } = req.query
            const data = patient?
                        await Model.selectByPatient(patient):
                        fait == 0?
                        await Model.selectInactiveByMedecin(NIN):
                        await Model.selectByMedecin(NIN);
            const [interventions, patients, medecins] = await Promise.all([fetchInterventions(data), fetchPatients(data), fetchMedecins(data)])
            const result = data.map((x) => ({ ...x, medecin: medecins.get(x.medecin), patient: patients.get(x.patient), designation: interventions.get(x.code_intervention).designation }))
            return res.status(200).json(result);
        }
        return res.status(400).json()
    }
    async selectOne(req, res) {
        const { id } = req.params;
        const result = await Model.getOne(id);

        if(result.medecin == NIN || result.patient == NIN)
            return res.status(200).json(result);

        return res.status(400).json()
    }

    async insert(req, res){
        const { NIN: medecin, role, hopital, service } = req.jwt;
  
        const id = genID();
        const { patient, date, code_intervention, remarques, protocole_operatoire } = req.body;
        await Model.insert(id, patient, medecin, hopital, service, date, code_intervention, remarques, protocole_operatoire);

        if(!protocole_operatoire)
            RabbitConnection.sendMsg("rendez-vous_create", {jwt: req.jwt, patient, type: "Intervention", code_intervention, date, details: remarques})

        return res.status(200).json({ success: true });
    }

    async executer(req, res) {
        const { id } = req.params;
        const { protocole_operatoire } = req.body;
        try {
            await Model.executer(id, protocole_operatoire);
            return res.status(200).json({ success: true });
        } catch (err) {
            logger.error("database-error: " + err);
            return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
        }
    }
    
    async selectCount(req, res){
        // TODO: Secure this!
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
        // TODO: Secure this!
        const { hopital, medecin, duree } = req.query;
        if(hopital && medecin){
            const array = await Model.selectTimelinePerMedecin(hopital, medecin, duree);
            const results = Object.fromEntries(array.map(({ date_key, interventions }) => [date_key, interventions]));
            return res.status(200).json(results);
        }else if(hopital){
            const array = await Model.selectTimelinePerHopital(hopital, duree);
            const results = Object.fromEntries(array.map(({ date_key, interventions }) => [date_key, interventions]));
            return res.status(200).json(results);
        }
    }
}

/******** EXPORTS ********/
module.exports = new InterventionsController();