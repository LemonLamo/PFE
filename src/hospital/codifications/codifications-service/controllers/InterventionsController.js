const Model = require('../models/InterventionsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
    async select(req, res){
        const result = await Model.getAll();
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new InterventionsController();