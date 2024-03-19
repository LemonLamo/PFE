const Model = require('../models/BilansModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class BilansController {
    async select(req, res){
        const result = await Model.getAll();
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new BilansController();