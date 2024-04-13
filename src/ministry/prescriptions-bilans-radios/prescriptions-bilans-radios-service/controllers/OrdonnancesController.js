//const validator = require('../middlewares/validation');

const path = require("path");

/******** ACTIONS ********/
class OrdonnancesController {
  async select(req, res) {
    const { id } = req.params;
    return res.status(200).sendFile(`/mnt/data/ordonnance_${id}.pdf`, {headers: {'Content-Type': 'application/pdf'}})
  }
  async select2(req, res) {
    const { id } = req.params;
    return res.status(200).sendFile(`/mnt/data/arret_de_travail_${id}.pdf`, {headers: {'Content-Type': 'application/pdf'}})
  }
}


/******** EXPORTS ********/
module.exports = new OrdonnancesController();
