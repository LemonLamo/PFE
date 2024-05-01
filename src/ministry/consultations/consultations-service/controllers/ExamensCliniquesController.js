const Model = require("../models/ExamensCliniquesModel");
const { fetchExamensCliniques } = require("../utils/communication");
const logger = require("../utils/logger");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ExamensCliniquesController {
  async selectByReference(req, res) {
    try {
      const { id } = req.params;
      const data = await Model.getByReference(id);
      const examens_cliniques = await fetchExamensCliniques(data);
      const result = data.map((x) => ({
        ...x,
        designation: examens_cliniques.get(x.code_examen_clinique).designation,
      }));
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
