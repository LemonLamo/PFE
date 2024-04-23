const Model = require("../models/ExamensCliniquesModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ExamensCliniquesController {
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
      const { code_examen_clinique } = req.params;
      const result = await Model.getOne(code_examen_clinique);
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
      const { codes_examens_cliniques } = req.body;
      const result = await Model.selectByCodes(codes_examens_cliniques);
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
module.exports = new ExamensCliniquesController();
