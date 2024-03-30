const Model = require('../models/MaladiesModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class MaladiesController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }
    async selectOne(req, res){
        const { code_maladie } = req.params
        const result = await Model.getOne(code_maladie);
        return res.status(200).json(result)
    }
    async selectChroniques(req, res){
        const { search } = req.query;
        const result = await Model.getAllChronique(search);
        return res.status(200).json(result)
    }
    async selectOneChronique(req, res){
        const { code_maladie } = req.params
        const result = await Model.getOneChronique(code_maladie);
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new MaladiesController();