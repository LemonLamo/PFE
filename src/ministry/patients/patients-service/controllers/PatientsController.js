const axios = require("axios");
const Model = require("../models/PatientsModel");
const { fetchMaladies, fetchAllergies, fetchVaccinations } = require("../utils/communication");
//const validator = require('../middlewares/validation');

class PatientsController{
  async insert(req, res) {
    const { NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, situation_familiale, email, telephone, adresse, commune, code_postale, wilaya, groupage, taille, poids, donneur_organe, NIN_pere, NIN_mere } = req.body;
    const { maladies_chroniques, allergies, antecedents_medicaux, antecedents_familiaux} = req.body

    const result = await Model.insert(NIN, nom, prenom, date_de_naissance, lieu_de_naissance, sexe, situation_familiale, email, telephone, adresse, commune, code_postale, wilaya, groupage, taille, poids, donneur_organe, NIN_pere, NIN_mere);
    if(maladies_chroniques)
      for(let maladie of maladies_chroniques)
        Model.insertMaladieChronique(NIN, maladie.code_maladie, maladie.date, maladie.remarques, req.jwt.NIN)
    
    if(allergies)
      for(let allergie of allergies)
        Model.insertAllergie(NIN, allergie.code_allergene, allergie.date, allergie.remarques, req.jwt.NIN)
    
    if(antecedents_medicaux)
      for(let antecedent_medical of antecedents_medicaux)
        Model.insertAntecedentMedical(NIN, antecedent_medical.designation, antecedent_medical.date, antecedent_medical.remarques, req.jwt.NIN)
    
    if(antecedents_familiaux)
      for(let antecedent_familial of antecedents_familiaux)
        Model.insertAntecedentFamilial(NIN, antecedent_familial.designation, antecedent_familial.date, antecedent_familial.remarques, req.jwt.NIN)

    // TODO: Send (NIN, email, role) to auth-service to create an account.
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
    const data = await Model.selectMaladiesChroniques(NIN);
    const maladies_chroniques = await fetchMaladies(data);

    const result = data.map((x) => ({ ...x, designation: maladies_chroniques.get(x.code_maladie).designation }));
    return res.status(200).json(result);
  }
  async getAllergies(req, res) {
    const { NIN } = req.params;
    const data = await Model.selectAllergies(NIN);
    const allergies = await fetchAllergies(data);

    const result = data.map((x) => ({ ...x, designation: allergies.get(x.code_allergene).designation }));
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
    const data = await Model.selectVaccinations(NIN);
    const vaccinations = await fetchVaccinations(data);
    
    const result = data.map((x) => ({ ...x, designation: vaccinations.get(x.code_vaccin).designation }));
    return res.status(200).json(result);
  }
  async getHistorique(req, res) {
    const { NIN } = req.params;
    const consultations = (await axios.get(`http://consultations-service/api/consultations?patient=${NIN}`)).data;
    const hospitalisations = (await axios.get(`http://hospitalisations-service/api/hospitalisations?patient=${NIN}`)).data;
    const interventions = (await axios.get(`http://interventions-service/api/interventions?patient=${NIN}`)).data;
    return res.status(200).json([...consultations, ...hospitalisations, ...interventions].sort((a, b) => new Date(b.date_entree ?? b.date) - new Date(a.date_entree ?? a.date)));
  }

  async getByNINs(req, res){
    const { NINs } = req.body;
    const result = await Model.selectByNINs(NINs);
    return res.status(200).json(result);
  }

  async insertMaladieChronique(req, res){
    const { NIN } = req.params;
    const { code_maladie, date, remarques } = req.body;
    const medecin = req.jwt.NIN;
    const result = await Model.insertMaladieChronique(NIN, code_maladie, date, remarques, medecin);
    return res.status(200).json(result);
  }

  async insertAllergie(req, res){
    const { NIN } = req.params;
    const { code_allergene, date, remarques } = req.body;
    const medecin = req.jwt.NIN;
    const result = await Model.insertAllergie(NIN, code_allergene, date, remarques, medecin);
    return res.status(200).json(result);
  }

  async insertAntecedentMedical(req, res){
    const { NIN } = req.params;
    const { designation, date, remarques } = req.body;
    const medecin = req.jwt.NIN;
    const result = await Model.insertAntecedentMedical(NIN, designation, date, remarques, medecin);
    return res.status(200).json(result);
  }

  async insertAntecedentFamilial(req, res){
    const { NIN } = req.params;
    const { designation, date, remarques } = req.body;
    const medecin = req.jwt.NIN;
    const result = await Model.insertAntecedentFamilial(NIN, designation, date, remarques, medecin);
    return res.status(200).json(result);
  }

  async insertVaccination(req, res){
    const { NIN } = req.params;
    const { code_vaccin, date, remarques, date_de_prochaine_dose } = req.body;
    const medecin = req.jwt.NIN;
    const result = await Model.insertVaccination(NIN, code_vaccin, date, remarques, date_de_prochaine_dose, medecin);
    return res.status(200).json(result);
  }
}

/******** EXPORTS ********/
module.exports = new PatientsController();
