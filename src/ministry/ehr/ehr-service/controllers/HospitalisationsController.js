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
    const hospitalisations = await Model.getActiveByMedecin(req.jwt.NIN);
    const result = await fetchPatients(hospitalisations);
    return res.status(200).json(result);
  }

  async insert(req, res) {
    const id = genID();
    const {
      patient,
      date_entree,
      mode_entree,
      motif_hospitalisation,
      chambre,
      lit,
      resume_hospitalisation,
    } = req.body;
    const { NIN: medecin, hopital } = req.jwt;
    await Model.insert(
      id,
      patient,
      medecin,
      hopital,
      date_entree,
      mode_entree,
      motif_hospitalisation,
      chambre,
      lit,
      resume_hospitalisation
    );
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
}

/******** EXPORTS ********/
module.exports = new HospitalisationsController();
