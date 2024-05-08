const EHRAuthModel = require("../models/EHRAuthModel");
const { fetchMedecins } = require("../utils/communication");
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
  
  isAuthorized = async (req, res) => {
    const { medecin, patient } = req.body;
    const result = await EHRAuthModel.isAuthorized(medecin, patient)
    if(result)
      return res.status(200).json(result)
    else
      return res.status(401).json()
  };

  authorize = async (req, res) => {
    const { medecin, patient, motif } = req.body;
    try{
      switch(motif){
        case 'Consultation':
          await EHRAuthModel.authorize(medecin, patient, motif, 60)
          break;
        case 'Intervention':
          await EHRAuthModel.authorize(medecin, patient, motif, 60)
          break;
        case 'Hospitalisation':
          await EHRAuthModel.authorize(medecin, patient, motif, -1)
          break;
      }
      return res.status(200).json({success: 1})
    }catch(err){
      logger.error(err)
      return res.status(400).json()
    }
  };

  expire = async (req, res) => {
    const { medecin, patient } = req.query;
    const { NIN: initiator } = req.jwt;
    console.log(initiator, medecin, patient)
    if(initiator != medecin && initiator != patient)
      return res.status(400).json();
    
    try{
      await EHRAuthModel.expire(medecin, patient);
      return res.status(200).json({success: 1})
    }catch(err){
      logger.error(err)
    }
  }
}

/******** EXPORTS ********/
module.exports = new AuthController();
