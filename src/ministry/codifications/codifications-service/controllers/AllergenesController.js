const Model = require('../models/AllergenesModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class AllergenesController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }
    async selectOne(req, res){
        const { code_allergene } = req.params
        const result = await Model.getOne(code_allergene);
        return res.status(200).json(result)
    }

    async getByCodes(req, res){
        const { codes_allergenes } = req.body;
        const result = await Model.selectByCodes(codes_allergenes);
        return res.status(200).json(result);
    }
}

/******** EXPORTS ********/
module.exports = new AllergenesController();