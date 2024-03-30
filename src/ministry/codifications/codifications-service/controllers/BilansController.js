const Model = require('../models/BilansModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class BilansController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }

    async selectOne(req, res){
        const { code_bilan } = req.params
        const result = await Model.getOne(code_bilan);
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new BilansController();