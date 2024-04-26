const Model = require("../models/ExamensCliniquesModel");
const logger = require("../utils/logger");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ExamensCliniquesController {
  async selectByReference(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.getByReference(id);
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
module.exports = new ExamensCliniquesController();
