const Model = require('../models/VaccinsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class VaccinsController {
    async select(req, res){
        const result = await Model.getAll();
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new VaccinsController();