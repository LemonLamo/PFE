const Model = require("../models/MaladiesModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class MaladiesController {
  async select(req, res) {
    try {
      const { search } = req.query;
      const result = await Model.getAll(search);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
      //TODO: alert
    }
  }
  async selectOne(req, res) {
    try {
      const { code_maladie } = req.params;
      const result = await Model.getOne(code_maladie);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
      //TODO: alert
    }
  }
  async selectChroniques(req, res) {
    try {
      const { search } = req.query;
      const result = await Model.getAllChronique(search);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
      //TODO: alert
    }
  }
  async selectOneChronique(req, res) {
    try {
      const { code_maladie } = req.params;
      const result = await Model.getOneChronique(code_maladie);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
      //TODO: alert
    }
  }

  async getByCodes(req, res) {
    try {
      const { codes_maladies } = req.body;
      const result = await Model.selectByCodes(codes_maladies);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
      //TODO: alert
    }
  }
}

/******** EXPORTS ********/
module.exports = new MaladiesController();
