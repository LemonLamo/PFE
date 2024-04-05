const Model = require("../models/RendezVousModel");
const { genID } = require("../utils");
const { fetchPatients } = require("../utils/communication");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RendezVousController {
  async select(req, res) {
    const data = await Model.getActiveByMedecin(req.jwt.NIN);
    const patients = await fetchPatients(data);
    
    const result = data.map((x) => ({ ...x, patient: patients.get(x.patient) }))
    return res.status(200).json(result);
  }

  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }

  async insert(req, res) {
    const id = genID();
    const { patient, type, title, date, details, duree } = req.body;
    const { NIN: medecin, hopital } = req.jwt;

    await Model.insert(id, patient, medecin, type, title, details, date, duree);
    return res.status(200).json({ success: true });
  }
}

/******** EXPORTS ********/
module.exports = new RendezVousController();
