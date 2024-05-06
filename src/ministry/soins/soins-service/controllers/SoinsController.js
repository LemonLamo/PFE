const Model = require("../models/SoinsModel");
const { genID } = require("../utils");
const { fetchPatients, fetchHospitalisations, fetchMedecins } = require("../utils/communication");
const logger = require("../utils/logger");

class SoinsController {
  async getAll(req, res) {
    try {
        const { reference, fait } = req.query;
        if (reference) {
          const data = await Model.selectByReference(reference, fait);
          const [patients, hospitalisations, medecins] = await Promise.all([fetchPatients(data), fetchHospitalisations(data), fetchMedecins(data)])
          const result = data.map((x) => ({ ...x, patient: patients.get(x.patient), medecin: medecins.get(x.medecin), hospitalisation: hospitalisations.get(x.hospitalisation) }))
          return res.status(200).json(result);
        }else{
          const { NIN } = req.jwt
          const data = await Model.select(NIN, fait);
          const [patients, hospitalisations, medecins] = await Promise.all([fetchPatients(data), fetchHospitalisations(data), fetchMedecins(data)])
          const result = data.map((x) => ({ ...x, patient: patients.get(x.patient), medecin: medecins.get(x.medecin), hospitalisation: hospitalisations.get(x.hospitalisation) }))
          return res.status(200).json(result);
        }
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.selectOne(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    const id = "soin-"+genID()
    const date_soin = new Date()
    const { hospitalisation, acte, details } = req.body;
    const patient = req.body.patient.NIN;
    const infirmier = req.body.infirmier.NIN;
    const { NIN: medecin, hopital } = req.jwt;

    try {
      await Model.insert(id, patient, medecin, infirmier, hospitalisation, hopital, acte, date_soin, details);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async executer(req, res) {
    const { id } = req.params;
    const { remarque } = req.body;
    try {
      await Model.executer(id, remarque);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new SoinsController();
