const Model = require("../models/ConsultationsModel");
const PrescriptionsModel = require("../models/PrescriptionsModel");
const BilansModel = require("../models/BilansModel");
const RadiosModel = require("../models/RadiosModel");
const ExamensCliniquesModel = require("../models/ExamensCliniquesModel");
const { genID } = require("../utils");
const { fetchPatients } = require("../utils/communication");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ConsultationsController {
  async select(req, res) {
    const { patient } = req.query;
    if (patient) {
      const result = await Model.getByPatient(patient);
      return res.status(200).json(result);
    }
    return res.status(400).json({ errorCode: "", errorMessage: "" });
  }
  async selectByMedecin(req, res) {
    const consultations = await Model.getActiveByMedecin(req.jwt.NIN);
    const result = await fetchPatients(consultations);
    return res.status(200).json(result);
  }
  async insert(req, res) {
    const id = genID();
    const {
      patient,
      date,
      type,
      motif,
      symptomes,
      resume,
      diagnostique,
      diagnostique_details,
      prochaine_consultation,
    } = req.body;
    const {
      examens_cliniques,
      prescriptions,
      radios,
      bilans,
      duree_arret_de_travail,
    } = req.body;
    const { NIN: medecin, hopital } = req.jwt;

    await Model.insert(
      id,
      patient,
      medecin,
      hopital,
      date,
      type,
      motif,
      symptomes,
      resume,
      diagnostique,
      diagnostique_details,
      prochaine_consultation,
      duree_arret_de_travail
    );

    // examens_cliniques
    if (examens_cliniques)
      for (let e of examens_cliniques)
        await ExamensCliniquesModel.insert(
          genID(),
          patient,
          e.code_examen_clinique,
          e.resultat,
          e.remarques
        );

    // prescriptions
    if (prescriptions)
      for (let p of prescriptions)
        await PrescriptionsModel.insert(
          genID(),
          patient,
          p.code_medicament,
          p.posologie,
          p.frequence,
          p.duree,
          p.remarques
        );

    // radios
    if (radios)
      for (let r of radios)
        await RadiosModel.insert(
          genID(),
          patient,
          r.code_radio,
          r.date,
          r.remarques
        );

    // bilans
    if (bilans)
      for (let b of bilans)
        await BilansModel.insert(
          genID(),
          patient,
          b.code_bilan,
          b.date,
          b.remarques
        );

    return res.status(200).json({ success: true });
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
}

/******** EXPORTS ********/
module.exports = new ConsultationsController();
