const Model = require("../models/RadiosModel");
const { fetchPatients, fetchRadios } = require('../utils/communication');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RadiosController {
  async select(req, res) {
    let radios = await Model.getAll();
    radios = await fetchPatients(radios);
    radios = await fetchRadios(radios);

    return res.status(200).json(radios);
  }
  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new RadiosController();
