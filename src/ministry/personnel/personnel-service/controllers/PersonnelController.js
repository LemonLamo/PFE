const Model = require("../models/PersonnelModel");
const RabbitConnection = require("../config/amqplib");
const logger = require("../utils/logger");

class PersonnelController {
  async getAllSnippet(req, res){
    const { search, hopital, service, fonction } = req.query
    const result = await Model.selectAllSnippet(search, hopital, service, fonction);
    return res.status(200).json(result);
  }
  async getAll(req, res) {
    try {
      const { role, hopital } = req.jwt

      const result = await Model.selectAll(hopital);
      return res.status(200).json(result);
        
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async getOne(req, res) {
    try {
      const { role, hopital } = req.jwt
      const { NIN } = req.params;
      const result = await Model.selectOne(NIN);

      if(result.hopital == hopital)
        return res.status(200).json(result);

    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async serveAvatar(req, res) {
    try {
      const { NIN } = req.params;
      return res.status(200).sendFile(`/mnt/data/${NIN}`, {
        headers: { "Content-Type": "image/jpeg" },
      });
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    const { role, hopital } = req.jwt
    try {
      const { NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, service } = req.body;
      const exists = await Model.selectOne(NIN);
      if(exists && !exists.hopital && !exists.service){
        await Model.changeHopital(NIN, hopital, service, grade);
        return res.status(200).json({ success: true });
      }else{
        RabbitConnection.sendMsg("account_create", {NIN, role:fonction, email})
        await Model.insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service );
        return res.status(200).json({ success: true });
      }
    } catch (err) {
      logger.error("database-error: " + err);
      return res .status(400) .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async update(req, res) {
    const { role, hopital } = req.jwt
    const { NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, service } = req.body;
    
    try {
      const precheck = await Model.selectOne(NIN);

      if(!precheck || precheck.hopital != hopital)
        return res.status(400).json();

      await Model.update( NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, email, telephone, fonction, specialite, grade, adresse, code_postale, commune, wilaya, hopital, service );
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async remove(req, res) {
    const { role, hopital } = req.jwt
    const { NIN } = req.params;

    try {
      const precheck = await Model.selectOne(NIN);
      if(!precheck || precheck.hopital != hopital)
        return res.status(400).json();

      await Model.remove(NIN);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectCount(req, res){
    // TODO: secure this!
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
    // TODO: secure this!
    const { hopital } = req.jwt;
    const result = await Model.countGroupBySexe(hopital);
    return res.status(200).json(result);
  }
  async selectCountGroupByService(req, res){
    // TODO: secure this!
    const { hopital } = req.jwt;
    const result = await Model.countGroupByService(hopital);
    return res.status(200).json(result);
  }

  // PRIVATE ROUTES
  async selectByNINs(req, res){
    const { NINs } = req.body;
    const result = await Model.selectByNINs(NINs);
    return res.status(200).json(result);
  }
  
  async selectByNIN(req, res){
    const { NIN } = req.params;
    const result = await Model.selectByNIN(NIN);
    return res.status(200).json(result);
  }
}

module.exports = new PersonnelController();
