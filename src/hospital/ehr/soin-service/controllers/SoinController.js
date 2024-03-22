const Model = require("../models/PersonnelModel");
const logger = require("../utils/logger");

class SoinController {
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
      const { code_soin } = req.params;
      const result = await Model.selectOne(code_soin);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    const {
      code_soin,
      patient,
      medecin,
      infirmier,
      hospitalisation,
      nom_hopital,
      acte,
      date_soin,
      details,
      fait,
    } = req.body;

    try {
      await Model.insert(
        code_soin,
        patient,
        medecin,
        infirmier,
        hospitalisation,
        nom_hopital,
        acte,
        date_soin,
        details,
        fait
      );
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async update(req, res) {
    const {
      code_soin,
      medecin,
      infirmier,
      hospitalisation,
      nom_hopital,
      acte,
      date_soin,
      details,
      fait,
    } = req.body;
    try {
      await Model.update(
        code_soin,
        medecin,
        infirmier,
        hospitalisation,
        nom_hopital,
        acte,
        date_soin,
        details,
        fait
      );
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async remove(req, res) {
    const { code_soin } = req.params;
    try {
      await Model.remove(code_soin);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new SoinController();
