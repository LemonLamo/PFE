const Model = require("../models/ChambresModel");
const logger = require("../utils/logger");

class ChambresController {
  async getAll(req, res) {
    try {
      const result = await Model.select();
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async getOne(req, res) {
    try {
      const { num } = req.params;
      const result = await Model.selectOne(num);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async getLits(req, res){
    try {
      const { num } = req.params;
      const result = await Model.selectLits(num);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async insert(req, res) {
    const { num, etage, description, nombre_lits, nombre_lits_occupe } =
      req.body;
    try {
      await Model.insert(num, etage, description, nombre_lits, nombre_lits_occupe);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async update(req, res) {
    const { num, nombre_lits, nombre_lits_occupe } = req.body;
    try {
      await Model.update(num, nombre_lits, nombre_lits_occupe);
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
    try {
      await Model.remove(num);
      return res.status(200).json({ success: true });
    }catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new ChambresController();
