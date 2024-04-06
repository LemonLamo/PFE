const Model = require("../models/HopitauxModel");
const logger = require("../utils/logger");

class HopitauxController {
  async getAll(req, res) {
    const data = await Model.select();
    return res.status(200).json(data);
  }
  async getOne(req, res) {
    const { hopital } = req.params;
    const result = await Model.selectOne(hopital);
    return res.status(200).json(result);
  }
  async getServices(req, res) {
    const { hopital } = req.params;
    const result = await Model.selectServices(hopital);
    return res.status(200).json(result);
  }
}

module.exports = new HopitauxController();
