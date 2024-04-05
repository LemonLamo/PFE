const Model = require("../models/BilansModel");
const { fetchPatients, fetchBilans } = require("../utils/communication");
const { genID } = require('../utils')
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class BilansController {
  async select(req, res) {
    const { reference } = req.query
    if(reference){
      const result = await Model.getByReference(reference);
      return res.status(200).json(result);
    }
    else{
      let data = await Model.getAll();
      const patients = await fetchPatients(data);
      const bilans = await fetchBilans(data);

      const result = data.map((x) => ({ ...x, patient: patients.get(x.patient), designation: bilans.get(x.code_bilan).designation }))
      return res.status(200).json(result);
    }
  }

  async getByReference(NIN) {
    const [results] = await db.query("SELECT * FROM `radios` WHERE `reference`=?", [NIN]);
    return results;
  }

  async insert(req, res){
    const { patient, bilans, reference } = req.body;
    await Promise.all(bilans.map((b) => Model.insert( genID(), patient, reference, b.code_bilan, b.date, b.remarques)));
    return res.status(200).json({success: 1});
  }

  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }

  async addResults(req, res){
    console.log(req.files)

    const result = await Model.mark_as_done(id);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new BilansController();
