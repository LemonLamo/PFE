const Model = require("../models/ChambresModel");
const logger = require("../utils/logger");

class ChambresController {
  async getAll(req, res) {
    try {
      const { service } = req.jwt;
      const result = await Model.select(service);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async getOne(req, res) {
    try {
      const { num } = req.params;
      const { service } = req.jwt;
      const result = await Model.selectOne(service, num);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async occuper(req, res) {
    const { num, numChambre } = req.params;
    const { service } = req.jwt;
    try {
      await Model.occuper(service, numChambre, num);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async liberer(req, res) {
    const { num, numChambre } = req.params;
    const { service } = req.jwt;
    try {
      await Model.liberer(service, numChambre, num);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async getLits(req, res){
    try {
      const { num } = req.params;
      const { occupe } = req.query;
      const { service } = req.jwt;

      const result = (occupe == 1)? await Model.selectLitsOccupe(service, num):
                     (occupe == 0)? await Model.selectLitsDisponible(service, num):
                     await Model.selectLits(num)
                      
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async insert(req, res) {
    const { num, etage, description, nombre_lits } = req.body;
    const { lits } = req.body;
    const { service } = req.jwt;
    try {
      const insertLits = lits.map((lit, i) => Model.insertLit(service, i+1, num, lit.type, lit.remarques))
      await Model.insert(service, num, etage, description, nombre_lits);
      await Promise.all(insertLits);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async update(req, res) {
    const { num, etage, nombre_lits, description } = req.body;
    const { service } = req.jwt;
    try {
      await Model.update(service, num, etage, nombre_lits, description);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async remove(req, res) {
    const { num } = req.params;
    const { service } = req.jwt;
    try {
      await Model.remove(service, num);
      return res.status(200).json({ success: true });
    }catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new ChambresController();
