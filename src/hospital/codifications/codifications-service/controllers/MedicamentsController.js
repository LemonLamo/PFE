const Model = require('../models/MedicamentsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class MedicamentsController {
    async select(req, res){
        const result = await Model.getAll();
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new MedicamentsController();