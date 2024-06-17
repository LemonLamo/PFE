const Model = require("../models/BilansModel");
const { fetchPatients, fetchBilans, fetchMedecins } = require("../utils/communication");
const path = require("path");
const RabbitConnection = require("../config/amqplib");
const logger = require("../utils/logger");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class BilansController {
  async select(req, res) {
    try {
      const { reference } = req.query;
      if (reference) {
        const data = await Model.getByReference(reference);
        const [patients, bilans, medecins] = await Promise.all([
          fetchPatients(data),
          fetchBilans(data),
          fetchMedecins(data)
        ]);

        const result = data.map((x) => ({
          ...x,
          patient: patients.get(x.patient),
          medecin: medecins.get(x.medecin),
          designation: bilans.get(x.code_bilan).designation,
        }));
        return res.status(200).json(result);
      } else {
        const { NIN, hopital } = req.jwt;
        const { fait } = req.query;
        let data = await Model.getAll(hopital, fait, NIN);
        const [patients, bilans, medecins] = await Promise.all([
          fetchPatients(data),
          fetchBilans(data),
          fetchMedecins(data)
        ]);

        console.log(data);

        const result = data.map((x) => ({
          ...x,
          patient: patients.get(x.patient),
          medecin: medecins.get(x.medecin),
          designation: bilans.get(x.code_bilan).designation,
        }));
        return res.status(200).json(result);
      }
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectOne(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.getOne(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async getResultsList(req, res) {
    try {
      const { id } = req.params;
      const bilan = await Model.getOne(id);
      const result = await Model.getResults(id);
      return res.status(200).json({observations: bilan.observations, results: result});
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async getResultOne(req, res) {
    try {
      const { id, num } = req.params;
      const result = await Model.getResultOne(id, num);
      return res.status(200).sendFile(path.resolve(result.file), {
        headers: { "Content-Type": "application/pdf" },
      });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async addResults(req, res) {
    try {
      const { id } = req.params;
      const { NIN } = req.jwt
      const result = await Model.mark_as_done(id, NIN, req.files, req.body.observations);

      // notify
      const bilan = await Model.getOne(id);
      const payload = {
        notification_type: "BILAN_READY",
        NIN: bilan.patient,
        notified_type: "patient",
        delivery_method: 1,
        data: { bilan: bilan.id },
      };
      RabbitConnection.sendMsg("notification", payload);

      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectCountToday(req, res) {
    // TODO: secure this
    const { hopital } = req.jwt;
    try {
      const result = await Model.countToday(hopital);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

/******** EXPORTS ********/
module.exports = new BilansController();
