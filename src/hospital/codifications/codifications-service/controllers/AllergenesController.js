const Model = require('../models/AllergenesModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class AllergenesController {
    async select(req, res){
        const result = await Model.getAll();
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new AllergenesController();