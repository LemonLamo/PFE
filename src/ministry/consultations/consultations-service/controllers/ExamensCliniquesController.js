const Model = require("../models/ExamensCliniquesModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ExamensCliniquesController {
  async select(req, res) {
    const result = await Model.getAll();
    return res.status(200).json(result);
  }
  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new ExamensCliniquesController();
