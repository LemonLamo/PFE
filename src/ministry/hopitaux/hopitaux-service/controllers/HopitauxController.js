const Model = require("../models/HopitauxModel");
const logger = require("../utils/logger");

class HopitauxController {
  async getAll(req, res) {
    const data = await Model.select();
    return res.status(200).json(data);
  }
  async getOne(req, res) {
    const { nom_hopital } = req.params;
    const result = await Model.selectOne(nom_hopital);
    return res.status(200).json(result);
  }
  async getServices(req, res) {
    const { nom_hopital } = req.params;
    const result = await Model.selectServices(nom_hopital);
    return res.status(200).json(result);
  }

  async selectByNomHopitaux(req, res){
    const { nom_hopitaux } = req.body;
    const result = await Model.selectByNomHopitaux(nom_hopitaux);
    return res.status(200).json(result);
  }

  async selectByNomHopital(req, res){
    const { nom_hopital } = req.params;
    const result = await Model.selectByNomHopital(nom_hopital);
    return res.status(200).json(result);
  }
}

module.exports = new HopitauxController();
