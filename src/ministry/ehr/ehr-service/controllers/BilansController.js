const Model = require("../models/BilansModel");
const { fetchPatients, fetchBilans } = require("../utils/communication");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class BilansController {
  async select(req, res) {
    let bilans = await Model.getAll();
    bilans = await fetchPatients(bilans);
    bilans = await fetchBilans(bilans);

    return res.status(200).json(bilans);
  }
  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new BilansController();
