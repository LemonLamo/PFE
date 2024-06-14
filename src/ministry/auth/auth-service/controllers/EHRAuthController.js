const EHRAuthModel = require("../models/EHRAuthModel");
const { fetchMedecins, fetchPatients } = require("../utils/communication");
const RabitConnection = require('../config/amqplib');
const axios = require('axios');
const logger = require("../utils/logger");

class AuthController {
  getAuths = async (req, res) => {
    const { NIN: patient } = req.jwt;
    const { actif } = req.query;
    const data = await EHRAuthModel.getAuths(patient, actif)
    const medecins = await fetchMedecins(data)
    const result = data.map((x) => ({
      ...x,
      medecin: medecins.get(x.medecin),
    }));

    return res.status(200).json(result)
  };

  getHospitalAuths = async (req, res) => {
    const { hopital } = req.jwt;
    const data = await EHRAuthModel.getHospitalAuths(hopital)
    const [medecins, patients] = await Promise.all([fetchMedecins(data), fetchPatients(data)]);
    const result = data.map((x) => ({
      ...x,
      medecin: medecins.get(x.medecin),
      patient: patients.get(x.patient)
    }));

    return res.status(200).json(result)
  };
  
  isAuthorized = async (req, res) => {
    const { medecin, patient } = req.body;
    const { NIN: initiator } = req.jwt;
    if(initiator != medecin && initiator != patient)
      return res.status(400).json();

    const result = await EHRAuthModel.isAuthorized(medecin, patient)
    if(result)
      return res.status(200).json(result)
    else
      return res.status(401).json()
  };

  validate = async (req, res) => {
    const { id } = req.params;
    const { legit } = req.body;
    
    if(legit == -1)
      await EHRAuthModel.expireByID(id);

    const result = await EHRAuthModel.validate(medecin, patient, legit)
    if (result)
      return res.status(200).json(result)
    else
      return res.status(401).json()
  };

  authorize = async (req, res) => {
    const { medecin, patient, motif } = req.body;
    const { hopital } = req.jwt;
    if(!hopital)
      return res.status(400).json();

    try{
      switch(motif){
        case 'Consultation':
          await EHRAuthModel.authorize(hopital, medecin, patient, motif, 60)
          break;
        case 'Dossier':
          await EHRAuthModel.authorize(hopital, medecin, patient, motif, 5)
          break;
        case 'Intervention':
          await EHRAuthModel.authorize(hopital, medecin, patient, motif, 60)
          break;
        case 'Hospitalisation':
          await EHRAuthModel.authorize(hopital, medecin, patient, motif, -1)
          break;
        case 'Urgence':
          await EHRAuthModel.authorize(hopital, medecin, patient, motif, -1)
          break;
      }

      // NOTIFY PATIENT
      const medecin_profile = (await axios.get(`http://personnel-service/private/personnel/${medecin}`)).data;
      const medecin_formatted = `Dr. ${medecin_profile.prenom[0]}. ${medecin_profile.nom}`;
      const payload = {
        notification_type: "EHR_ACCESS",
        NIN: patient,
        notified_type: "patient",
        delivery_method: 1,
        data: { medecin: medecin_formatted },
      };
      await RabitConnection.sendMsg('notification', payload)
      return res.status(200).json({success: 1})
    }catch(err){
      logger.error(err)
      return res.status(400).json()
    }
  };

  expire = async (req, res) => {
    const { medecin, patient, urgence } = req.body;
    const { NIN: initiator } = req.jwt;
    if(initiator != medecin && initiator != patient)
      return res.status(400).json();
    
    try{
      await EHRAuthModel.expire(medecin, patient, urgence);
      return res.status(200).json({success: 1})
    }catch(err){
      logger.error(err)
      return res.status(400).json();
    }
  }
  expireByID = async (req, res) => {
    const { id } = req.params;
    const { NIN: initiator } = req.jwt;
    if (initiator != medecin && initiator != patient)
      return res.status(400).json();

    try {
      await EHRAuthModel.expireByID(id);
      return res.status(200).json({ success: 1 })
    } catch (err) {
      logger.error(err)
      return res.status(400).json();
    }
  }
}

/******** EXPORTS ********/
module.exports = new AuthController();
