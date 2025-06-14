const HospitalisationsModel = require("../models/HospitalisationsModel");
const logger = require("../utils/logger");
const axios = require('axios');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class TransfertsController {
  async insert(req, res) {
    try {
      const { NIN, role } = req.jwt;
      const { hospitalisation, hopital, service, medecin, remarques } = req.body;
        
      const hosp = await HospitalisationsModel.selectOne(hospitalisation);
      const result = await HospitalisationsModel.addSortie(hospitalisation, "Transfert", new Date());
      
      // Revoque auth
      axios.post("http://auth-service/api/auth/authorisations/expire", { medecin: NIN, patient: hosp.patient, urgence: 0}, { headers: { Authorization: req.headers.authorization } });

      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

/******** EXPORTS ********/
module.exports = new TransfertsController();
