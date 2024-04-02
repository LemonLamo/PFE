const Model = require("../models/PersonnelModel");
const logger = require("../utils/logger");

class PersonnelController {
  async getAll(req, res) {
    try {
      const { search, fonction } = req.query
      const result = await Model.select(search, fonction);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400)
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
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async insert(req, res) {
    let { NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service } = req.body;
    date_de_naissance = new Date(date_de_naissance).toISOString().slice(0,19).replace('T', '');
    // TODO: Send (NIN, email) to auth-service to create an account.

    try {
      await Model.insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service );
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res .status(400) .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async update(req, res) {
    const { NIN, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service, } = req.body;
    try {
      await Model.update( NIN, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, nom_hopital, service );
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async remove(req, res) {
    const { NIN } = req.params;
    try {
      await Model.remove(NIN);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err.code);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectCount(req, res){
    const { hopital, service } = req.query;
    if(hopital && service){
      const result = await Model.countByService(hopital, service);
      return res.status(200).json(result);
    }else if(hopital){
      const result = await Model.countByHopital(hopital);
      return res.status(200).json(result);
    }
    return res.status(403).json({});
  }
  async selectCountGroupBySexe(req, res){
    const { hopital } = req.jwt;
    const result = await Model.countGroupBySexe(hopital);
    return res.status(200).json(result);
  }
  async selectCountGroupByService(req, res){
    const { hopital } = req.jwt;
    const result = await Model.countGroupByService(hopital);
    return res.status(200).json(result);
  }
}

module.exports = new PersonnelController();
