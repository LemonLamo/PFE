const Model = require("../models/PrescriptionsModel");
const { genID } = require('../utils')
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class PrescriptionsController {
  async select(req, res) {
    const { reference } = req.query
    if(reference){
      const result = await Model.getByReference(reference);
      return res.status(200).json(result);
    }else
      return res.status(404).json({});
  }

  async insert(req, res){
    const { patient, prescriptions, reference } = req.body;
    await Promise.all(prescriptions.map((p) => Model.insert(genID(), patient, reference, p.code_medicament, p.posologie, p.frequence, p.duree, p.remarques)));
    return res.status(200).json({success: 1});
  }

  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new PrescriptionsController();
