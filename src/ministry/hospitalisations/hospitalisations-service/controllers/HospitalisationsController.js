const Model = require("../models/HospitalisationsModel");
const { genID } = require("../utils");
const { fetchPatients } = require("../utils/communication");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class HospitalisationsController {
  async select(req, res) {
    const { patient } = req.query;
    if (patient) {
      const result = await Model.getByPatient(patient);
      return res.status(200).json(result);
    }
    return res.status(400).json({ errorCode: "", errorMessage: "" });
  }

  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }

  async selectByMedecin(req, res) {
    const data = await Model.getActiveByMedecin(req.jwt.NIN);
    const patients = await fetchPatients(data);
    const result = data.map((x) => ({ ...x, patient: patients.get(x.patient) }))
    return res.status(200).json(result);
  }

  async insert(req, res) {
    const id = genID();
    const { patient, date_entree, mode_entree, motif_hospitalisation, chambre, lit, resume_hospitalisation } = req.body;
    const { NIN: medecin, hopital } = req.jwt;
    await Model.insert(id, patient, medecin, hopital, date_entree, mode_entree, motif_hospitalisation, chambre, lit, resume_hospitalisation);
    return res.status(200).json({ success: true });
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

  async addRemarque(req, res){
    const { id } = req.params;
    const { remarque } = req.body;

    const result = await Model.addRemarque(id, remarque);
    return res.status(200).json(result);
  }

  async addSortie(req, res){
    const { id } = req.params;
    const { mode_sortie, date_sortie } = req.body;

    const result = await Model.addSortie(id, mode_sortie, date_sortie);
    return res.status(200).json(result);
  }
  
  async timeline(req, res){
    const { hopital, medecin, duree } = req.query;
    if(hopital && medecin){
      const array = await Model.getTimelinePerMedecin(hopital, medecin, duree);
      const results = Object.fromEntries(array.map(({ date_key, hospitalisations }) => [date_key, hospitalisations]));
      return res.status(200).json(results);
    }else if(hopital){
      const array = await Model.getTimelinePerHopital(hopital, duree);
      const results = Object.fromEntries(array.map(({ date_key, hospitalisations }) => [date_key, hospitalisations]));
      return res.status(200).json(results);
    }
  }

  async hospitalisationsByIDs(req, res){
    const { IDs } = req.body;
    const result = await Model.selectByIDs(IDs);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new HospitalisationsController();
