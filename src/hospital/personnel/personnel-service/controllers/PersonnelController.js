const Model = require("../models/PersonnelModel");
const logger = require("../utils/logger");

class PersonnelController {
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
      const { NIN } = req.params;
      const result = await Model.selectOne(NIN);
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
      NIN,
      nom,
      prenom,
      nom_user,
      date_de_naissance,
      lieu_de_naissance,
      sexe,
      email,
      telephone,
      fonction,
      specialite,
      grade,
      adresse,
      code_postal,
      commune,
      wilaya,
      nom_hopital,
      service,
    } = req.body;
    const date = new Date(date_de_naissance);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const new_date_de_naissance = `${year}-${month}-${day}`;

    try {
      await Model.insert(
        NIN,
        nom,
        prenom,
        nom_user,
        new_date_de_naissance,
        lieu_de_naissance,
        sexe,
        email,
        telephone,
        fonction,
        specialite,
        grade,
        adresse,
        code_postal,
        commune,
        wilaya,
        nom_hopital,
        service
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
      NIN,
      email,
      telephone,
      fonction,
      specialite,
      grade,
      adresse,
      code_postal,
      commune,
      wilaya,
      nom_hopital,
      service,
    } = req.body;
    try {
      await Model.update(
        NIN,
        email,
        telephone,
        fonction,
        specialite,
        grade,
        adresse,
        code_postal,
        commune,
        wilaya,
        nom_hopital,
        service
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
    const { NIN } = req.params;
    try {
      await Model.remove(NIN);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

module.exports = new PersonnelController();
