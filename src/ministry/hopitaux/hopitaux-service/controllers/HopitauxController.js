const Model = require("../models/HopitauxModel");
const logger = require("../utils/logger");

class HopitauxController {
  async getAll(req, res) {
    try {
      const data = await Model.select();
      return res.status(200).json(data);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async getOne(req, res) {
    try {
      const { nom_hopital } = req.params;
      const result = await Model.selectOne(nom_hopital);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async getServices(req, res) {
    try {
      const { nom_hopital } = req.params;
      const result = await Model.selectServices(nom_hopital);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectByNomHopitaux(req, res) {
    try {
      const { nom_hopitaux } = req.body;
      const result = await Model.selectByNomHopitaux(nom_hopitaux);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectByNomHopital(req, res) {
    try {
      const { nom_hopital } = req.params;
      const result = await Model.selectByNomHopital(nom_hopital);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new HopitauxController();
