const Model = require("../models/AllergenesModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class AllergenesController {
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
      const { code_allergene } = req.params;
      const result = await Model.getOne(code_allergene);
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
      const { codes_allergenes } = req.body;
      const result = await Model.selectByCodes(codes_allergenes);
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
module.exports = new AllergenesController();
