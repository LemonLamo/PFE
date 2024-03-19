const Model = require('../models/RadiosModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RadiosController {
    async select(req, res){
        const result = await Model.getAll();
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new RadiosController();