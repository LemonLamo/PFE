const Model = require("../models/RadiosModel");
const { fetchPatients, fetchRadios } = require("../utils/communication");
const { genID } = require("../utils");
const path = require("path");
const RabbitConnection = require("../config/amqplib");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RadiosController {
  async select(req, res) {
    try {
      const { reference } = req.query;
      if (reference) {
        const data = await Model.getByReference(reference);
        const [patients, radios] = await Promise.all([
          fetchPatients(data),
          fetchRadios(data),
        ]);

        const result = data.map((x) => ({
          ...x,
          patient: patients.get(x.patient),
          designation: radios.get(x.code_radio).designation,
        }));
        return res.status(200).json(result);
      } else {
        let data = await Model.getAll();
        const [patients, radios] = await Promise.all([
          fetchPatients(data),
          fetchRadios(data),
        ]);

        const result = data.map((x) => ({
          ...x,
          patient: patients.get(x.patient),
          designation: radios.get(x.code_radio).designation,
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

  async insert(req, res) {
    try {
      const { patient, radios, reference } = req.body;
      await Promise.all(
        radios.map((r) =>
          Model.insert(
            genID(),
            patient,
            reference,
            r.code_radio,
            r.date,
            r.remarques
          )
        )
      );
      return res.status(200).json({ success: 1 });
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
      const result = await Model.getResults(id);
      return res.status(200).json(result);
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
        headers: { "Content-Type": "image/jpeg" },
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
      const result = await Model.mark_as_done(id, req.files, req.observations);

      // notify
      const radio = await Model.getOne(id);
      const payload = {
        notification_type: "RADIO_READY",
        NIN: radio.patient,
        notified_type: "patient",
        delivery_method: 1,
        data: { radio: radio.id },
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
}

/******** EXPORTS ********/
module.exports = new RadiosController();
