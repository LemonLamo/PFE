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
      const { occupe } = req.query;

      const result = (occupe == 1)? await Model.selectLitsOccupe(num):
                     (occupe == 0)? await Model.selectLitsDisponible(num):
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
    try {
      const insertLits = lits.map((lit, i) => Model.insertLit(i, num, lit.type, lit.remarques))
      await Model.insert(num, etage, description, nombre_lits);
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
    try {
      await Model.update(num, etage, nombre_lits, description);
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
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new ChambresController();
