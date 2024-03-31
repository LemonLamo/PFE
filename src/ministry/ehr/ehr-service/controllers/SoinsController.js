const Model = require("../models/SoinsModel");
const logger = require("../utils/logger");
const axios = require('axios');

class SoinsController {
  async getAll(req, res) {
    try {
        let soins = await Model.select();
        soins = soins.map(({hospitalisation, chambre, lit, ...rest}) => (hospitalisation? {hospitalisation:{chambre, lit}, ...rest}: {...rest}))

        const NINs = soins.map((x) => x.patient)
        const patients = (await axios.post('http://patients-service/private/patientsByNINs', {NINs: NINs})).data
        const patientsMap = new Map();
        patients.map(x => patientsMap.set(x.NIN, {...x}));

        const result = soins.map ((x, i) => ({...x, patient: patientsMap.get(x.patient)}));
        return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
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
    const { id, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait } = req.body;

    try {
      await Model.insert( id, patient, medecin, infirmier, hospitalisation, nom_hopital, acte, date_soin, details, fait);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async executer(req, res) {
    const { id } = req.body;
    try {
      await Model.executer(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new SoinsController();
