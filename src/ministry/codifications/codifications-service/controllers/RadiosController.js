const Model = require('../models/RadiosModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RadiosController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }

    async selectOne(req, res){
        const { code_radio } = req.params
        const result = await Model.getOne(code_radio);
        return res.status(200).json(result)
    }

    async getByCodes(req, res){
        const { codes_radios } = req.body;
        const result = await Model.selectByCodes(codes_radios);
        return res.status(200).json(result);
    }
}

/******** EXPORTS ********/
module.exports = new RadiosController();