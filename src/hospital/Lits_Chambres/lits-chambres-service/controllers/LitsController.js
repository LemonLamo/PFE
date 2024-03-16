const Model = require("../models/LitsModel");

class LitsController {
  async getAll(req, res) {
    try {
      const result = await Model.select();
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.select(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async insert(req, res) {
    const { id, etat, occupation, chambre_id, unité } = req.body;
    try {
      await Model.insert(id, etat, occupation, chambre_id, unité);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async update(req, res) {
    const { id, etat, occupation, chambre_id, unité } = req.body;
    try {
      await Model.update(id, etat, occupation, chambre_id, unité);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async remove(req, res) {
    const { id } = req.body;
    try {
      await Model.remove(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new LitsController();
