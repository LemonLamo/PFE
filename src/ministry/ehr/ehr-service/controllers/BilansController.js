const axios = require('axios')
const Model = require("../models/BilansModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class BilansController {
  async select(req, res) {
    const bilans = await Model.getAll();
    const NINs = bilans.map((x) => x.patient)
    const patients = (await axios.post('http://patients-service/private/patientsByNINs', {NINs: NINs})).data
    
    const patientsMap = new Map();
    patients.map(x => patientsMap.set(x.NIN, {...x}));

    const result = bilans.map ((x, i) => ({...x, patient: patientsMap.get(x.patient)}));
    return res.status(200).json(result);
  }
  async selectOne(req, res) {
    const { id } = req.params;
    const result = await Model.getOne(id);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new BilansController();
