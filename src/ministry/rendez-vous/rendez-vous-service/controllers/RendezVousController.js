const Model = require("../models/RendezVousModel");
const { genID } = require("../utils");
const { fetchPatients, fetchInterventions, fetchMedecins } = require("../utils/communication");
const RabbitConnection = require("../config/amqplib");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RendezVousController {
  async select(req, res) {
    const { NIN, role } = req.jwt;
    if(role == undefined){
      const data = await Model.getByPatient(req.jwt.NIN);
      const medecins = await fetchMedecins(data);
      const result = data.map((x) => ({ ...x, medecin: medecins.get(x.patient) }))
      return res.status(200).json(result);
    }
    else{
      const data = await Model.getByMedecin(req.jwt.NIN);
      const patients = await fetchPatients(data);
      const result = data.map((x) => ({ ...x, patient: patients.get(x.patient) }))
      return res.status(200).json(result);
    }
  }

  async selectOne(req, res) {
    const { NIN, role } = req.jwt;
    const { id } = req.params;
    const result = await Model.getOne(id);

    if(role == undefined && result.patient == NIN)
      return res.status(200).json(result);

    else if(result.medecin == NIN)
      return res.status(200).json(result);

    else
      return res.status(400).json();
  }

  async insert(req, res) {
    const { NIN, role } = req.jwt;

    const id = genID();
    const { patient, type, date, details, code_intervention } = req.body;
    const { NIN: medecin, hopital } = req.jwt;

    const title = (type === "Consultation")?
        "Consultation":
        (await fetchInterventions([{code_intervention: code_intervention}])).get(code_intervention).designation
    
    const duree = (type === "Consultation")? 15 : 30

    await Model.insert(id, patient, medecin, type, title, details, date, duree);
    return res.status(200).json({ success: true });
  }
}

/******** EXPORTS ********/
module.exports = new RendezVousController();
