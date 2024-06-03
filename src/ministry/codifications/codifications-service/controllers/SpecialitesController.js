const Model = require("../models/SpecialitesModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class SpecialitesController {
    async select(req, res) {
        try {
            const { search } = req.query;
            const result = await Model.getAll(search);
            return res.status(200).json(result);
        } catch (err) {
            logger.error("database-error: " + err);
            return res
                .status(400)
                .json({ errorCode: "database-error", errorMessage: err.code });
        }
    }
    async selectOne(req, res) {
        try {
            const { specialite } = req.params;
            const result = await Model.getOne(specialite);
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
module.exports = new SpecialitesController();
