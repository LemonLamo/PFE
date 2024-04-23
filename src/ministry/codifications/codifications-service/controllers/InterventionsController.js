const Model = require("../models/InterventionsModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
  async select(req, res) {
    try {
      const { search } = req.query;
      const result = await Model.getAll(search);
      return res.status(200).json(result);
    } catch (error) {
      logger.error("database-error: " + err);
      console.log(err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectOne(req, res) {
    try {
      const { code_intervention } = req.params;
      const result = await Model.getOne(code_intervention);
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
      const { codes_interventions } = req.body;
      const result = await Model.selectByCodes(codes_interventions);
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
module.exports = new InterventionsController();
