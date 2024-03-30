const axios = require("axios");
const Model = require("../models/PatientsModel");
//const validator = require('../middlewares/validation');

class PatientsController{
  async insert(req, res) {
    let { NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, situation_familiale, email, telephone, adresse, code_postale, commune, wilaya, groupage, taille, poids, donneur_organe } = req.body;
    // TODO: Send (NIN, email, role) to auth-service to create an account.
    const result = await Model.insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, situation_familiale, email, telephone, adresse, code_postale, commune, wilaya, groupage, taille, poids, donneur_organe);
    return res.status(200).json(result);
  }
  async getAll(req, res) {
    const { search } = req.query
    const result = await Model.select(search);
    return res.status(200).json(result);
  }
  async getOne(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectOne(NIN);
    return res.status(200).json(result);
  }
  async getMaladiesChroniques(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectMaladiesChroniques(NIN);
    return res.status(200).json(result);
  }
  async getAllergies(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectAllergies(NIN);
    return res.status(200).json(result);
  }
  async getAntecedentsMedicals(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectAntecedentsMedicals(NIN);
    return res.status(200).json(result);
  }
  async getAntecedentsFamiliaux(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectAntecedentsFamiliaux(NIN);
    return res.status(200).json(result);
  }
  async getMedicaments(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectMedicaments(NIN);
    return res.status(200).json(result);
  }
  async getVaccinations(req, res) {
    const { NIN } = req.params;
    const result = await Model.selectVaccinations(NIN);
    return res.status(200).json(result);
  }
  async getHistorique(req, res) {
    const { NIN } = req.params;
    const consultations = (await axios.get(`http://ehr-service/api/ehr/consultations?patient=${NIN}`)).data;
    const hospitalisations = (await axios.get(`http://ehr-service/api/ehr/hospitalisations?patient=${NIN}`)).data;
    const interventions = (await axios.get(`http://ehr-service/api/ehr/interventions?patient=${NIN}`)).data;
    return res.status(200).json([...consultations, ...hospitalisations, ...interventions].sort((a, b) => new Date(b.date_consultation ?? b.date_entree ?? b.date) - new Date(a.date_consultation ?? a.date_entree ?? a.date)));
  }

  async getByNINs(req, res){
    const { NINs } = req.body;
    const result = await Model.selectByNINs(NINs);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new PatientsController();
