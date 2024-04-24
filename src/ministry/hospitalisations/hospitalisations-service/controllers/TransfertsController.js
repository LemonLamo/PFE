const HospitalisationsModel = require("../models/HospitalisationsModel");
const { genID } = require("../utils");
const { fetchPatients, fetchMedecins } = require("../utils/communication");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class TransfertsController {
  async insert(req, res) {
    try {
      const { NIN, role } = req.jwt;
      const { hospitalisation, hopital, service, medecin, remarques } =
        req.body;

      const result = await HospitalisationsModel.addSortie(
        hospitalisation,
        "Transfert",
        new Date()
      );
      // TODO: use hopital, service, medecin to add a demande d'hospitalisation.

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
