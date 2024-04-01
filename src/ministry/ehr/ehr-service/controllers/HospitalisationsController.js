const axios = require("axios");
const Model = require("../models/HospitalisationsModel");
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
  async selectByMedecin(req, res) {
    const hospitalisations = await Model.getActiveByMedecin(req.jwt.NIN);
    const NINs = hospitalisations.map((x) => x.patient);
    const patients = (
      await axios.post("http://patients-service/private/patientsByNINs", {
        NINs: NINs,
      })
    ).data;

    const patientsMap = new Map();
    patients.map((x) => patientsMap.set(x.NIN, { ...x }));

    const result = hospitalisations.map((x, i) => ({
      ...x,
      patient: patientsMap.get(x.patient),
    }));
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
      date_sortie,
      mode_sortie,
      resume_hospitalisation
    );
    return res.status(200).json({ success: true });
  }
}

/******** EXPORTS ********/
module.exports = new HospitalisationsController();
