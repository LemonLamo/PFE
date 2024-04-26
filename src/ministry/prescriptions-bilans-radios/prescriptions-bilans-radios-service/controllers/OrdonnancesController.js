//const validator = require('../middlewares/validation');

const path = require("path");
const logger = require("../utils/logger");

/******** ACTIONS ********/
class OrdonnancesController {
  async select(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).sendFile(`/mnt/data/ordonnance_${id}.pdf`, {
        headers: { "Content-Type": "application/pdf" },
      });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async select2(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).sendFile(`/mnt/data/arret_de_travail_${id}.pdf`, {
        headers: { "Content-Type": "application/pdf" },
      });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

/******** EXPORTS ********/
module.exports = new OrdonnancesController();
