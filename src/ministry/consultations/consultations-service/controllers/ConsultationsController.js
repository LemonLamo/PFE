const Model = require("../models/ConsultationsModel");
const ExamensCliniquesModel = require("../models/ExamensCliniquesModel");
const { genID } = require("../utils");
const { fetchPatients } = require("../utils/communication");
const axios = require('axios')
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ConsultationsController {
  async select(req, res) {
    const { patient } = req.query;
    if (patient) {
      const data = await Model.getByPatient(patient);
      const patients = await fetchPatients(data);
      const result = data.map((x) => ({ ...x, patient: patients.get(x.patient) }))
      return res.status(200).json(result);
    }
    return res.status(400).json({ errorCode: "", errorMessage: "" });
  }

  async selectByMedecin(req, res) {
    const data = await Model.getActiveByMedecin(req.jwt.NIN);
    const patients = await fetchPatients(data);
    
    const result = data.map((x) => ({ ...x, patient: patients.get(x.patient) }))
    return res.status(200).json(result);
  }

  async insert(req, res) {
    try{
      const id = genID();
      const { patient, date, type, motif, symptomes, resume, diagnostique, diagnostique_details } = req.body;
      const { examens_cliniques, prescriptions, radios, bilans, duree_arret_de_travail, prochaine_consultation} = req.body;
      const { NIN: medecin, hopital } = req.jwt;

      await Model.insert(id, patient, medecin, hopital, date, type, motif, symptomes, resume, diagnostique, diagnostique_details, duree_arret_de_travail);

      // Other services
      const insert_examens_cliniques = examens_cliniques.map((e) => ExamensCliniquesModel.insert(genID(), patient, id, e.code_examen_clinique, e.resultat, e.remarques))
      const rdv = {patient, medecin, type: "Consultation", title: "Consultation", details: null, date: prochaine_consultation, duree: 15}
      const promises = [...insert_examens_cliniques, axios.post('http://rendez-vous-service/api/rendez-vous/insert', rdv, {headers: {'Authorization': req.headers.authorization}})]

      if(prescriptions) promises.push(axios.post('http://prescriptions-bilans-radios-service/api/prescriptions', { patient, prescriptions, reference:id }))
      if(radios) promises.push(axios.post('http://prescriptions-bilans-radios-service/api/radios', { patient, radios, reference:id }))
      if(bilans) promises.push(axios.post('http://prescriptions-bilans-radios-service/api/bilans', { patient, bilans, reference:id }))

      Promise.all(promises)

      return res.status(200).json({ success: true });
    }catch(e){
      console.error(e)
    }
  }
  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }
  async selectExamensCliniques(req, res) {
    const { id } = req.params;
    const result = await Model.getExamensCliniques(id);
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
      const results = Object.fromEntries(array.map(({ date_key, consultations }) => [date_key, consultations]));
      return res.status(200).json(results);
    }else if(hopital){
      const array = await Model.getTimelinePerHopital(hopital, duree);
      const results = Object.fromEntries(array.map(({ date_key, consultations }) => [date_key, consultations]));
      return res.status(200).json(results);
    }
  }
}

/******** EXPORTS ********/
module.exports = new ConsultationsController();
