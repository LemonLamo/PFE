const Model = require('../models/VaccinsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class VaccinsController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }

    async selectOne(req, res){
        const { code_vaccin } = req.params
        const result = await Model.getOne(code_vaccin);
        return res.status(200).json(result)
    }

    async getByCodes(req, res){
        const { codes_vaccins } = req.body;
        const result = await Model.selectByCodes(codes_vaccins);
        return res.status(200).json(result);
    }
}

/******** EXPORTS ********/
module.exports = new VaccinsController();