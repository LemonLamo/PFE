const Model = require("../models/ConsultationsModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ConsultationsController {
  async select(req, res) {
    const { patient } = req.query;
    if (patient) {
      const result = await Model.getByPatient(patient);
      return res.status(200).json(result);
    }
    return res.status(400).json({ errorCode: "", errorMessage: "" });
  }
}

/******** EXPORTS ********/
module.exports = new ConsultationsController();
