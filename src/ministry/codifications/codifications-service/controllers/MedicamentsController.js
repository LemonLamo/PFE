const Model = require('../models/MedicamentsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class MedicamentsController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }

    async selectOne(req, res){
        const { code_medicament } = req.params
        const result = await Model.getOne(code_medicament);
        return res.status(200).json(result)
    }

    async getByCodes(req, res){
        const { codes_medicaments } = req.body;
        const result = await Model.selectByCodes(codes_medicaments);
        return res.status(200).json(result);
    }
}

/******** EXPORTS ********/
module.exports = new MedicamentsController();