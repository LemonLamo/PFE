const Model = require('../models/InterventionsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }

    async selectOne(req, res){
        const { code_intervention } = req.params
        const result = await Model.getOne(code_intervention);
        return res.status(200).json(result)
    }

    async getByCodes(req, res){
        const { codes_interventions } = req.body;
        const result = await Model.selectByCodes(codes_interventions);
        return res.status(200).json(result);
    }
}

/******** EXPORTS ********/
module.exports = new InterventionsController();