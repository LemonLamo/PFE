const Model = require("../models/HandicapsModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class HandicapsController {
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
    }
  }
  async selectOne(req, res) {
    try {
      const { code_handicap } = req.params;
      const result = await Model.getOne(code_handicap);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async getByCodes(req, res) {
    try {
      const { codes_handicaps } = req.body;
      const result = await Model.selectByCodes(codes_handicaps);
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
module.exports = new HandicapsController();
