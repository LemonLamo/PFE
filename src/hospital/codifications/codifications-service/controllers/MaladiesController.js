const Model = require('../models/MaladiesModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class MaladiesController {
    async select(req, res){
        const result = await Model.getAll();
        return res.status(200).json(result)
    }
    async selectChroniques(req, res){
        const result = await Model.getAllChronique();
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new MaladiesController();