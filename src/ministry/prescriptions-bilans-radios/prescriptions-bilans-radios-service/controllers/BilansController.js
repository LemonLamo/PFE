const Model = require("../models/BilansModel");
const { fetchPatients, fetchBilans } = require("../utils/communication");
const { genID } = require('../utils');
const path = require("path");
const RabbitConnection = require('../config/amqplib')
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class BilansController {
  async select(req, res) {
    const { reference } = req.query
    if(reference){
      const data = await Model.getByReference(reference);
      const [patients, bilans] = await Promise.all([fetchPatients(data), fetchBilans(data)]);

      const result = data.map((x) => ({ ...x, patient: patients.get(x.patient), designation: bilans.get(x.code_bilan).designation }))
      return res.status(200).json(result);
    }
    else{
      let data = await Model.getAll();
      const [patients, bilans] = await Promise.all([fetchPatients(data), fetchBilans(data)]);

      const result = data.map((x) => ({ ...x, patient: patients.get(x.patient), designation: bilans.get(x.code_bilan).designation }))
      return res.status(200).json(result);
    }
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

  async getResultsList(req, res) {
    const { id } = req.params;
    const result = await Model.getResults(id);
    return res.status(200).json(result);
  }

  async getResultOne(req, res) {
    const { id, num } = req.params;
    const result = await Model.getResultOne(id, num);
    return res.status(200).sendFile(path.resolve(result.file), {headers: {'Content-Type': 'application/pdf'}})
  }

  async addResults(req, res){
    const { id } = req.params;
    const result = await Model.mark_as_done(id, req.files, req.observations);

    // notify
    const bilan = await Model.getOne(id);
    const payload = {notification_type: "BILAN_READY", NIN: bilan.patient, notified_type:"patient", delivery_method: 1, data: {bilan: bilan.id}}
    RabbitConnection.sendMsg("notification", payload);

    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new BilansController();
