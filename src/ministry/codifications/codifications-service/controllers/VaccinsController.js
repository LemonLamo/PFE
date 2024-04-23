const Model = require("../models/VaccinsModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class VaccinsController {
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
      const { code_vaccin } = req.params;
      const result = await Model.getOne(code_vaccin);
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
      const { codes_vaccins } = req.body;
      const result = await Model.selectByCodes(codes_vaccins);
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
module.exports = new VaccinsController();
