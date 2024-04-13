const Model = require("../models/ExamensCliniquesModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ExamensCliniquesController {
  async selectByReference(req, res){
    const { id } = req.params;
    const result = await Model.getByReference(id);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new ExamensCliniquesController();
