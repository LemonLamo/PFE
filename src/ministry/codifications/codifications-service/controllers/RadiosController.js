const Model = require("../models/RadiosModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RadiosController {
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
      const { code_radio } = req.params;
      const result = await Model.getOne(code_radio);
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
      const { codes_radios } = req.body;
      const result = await Model.selectByCodes(codes_radios);
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
module.exports = new RadiosController();
