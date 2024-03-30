const Model = require('../models/ExamensCliniquesModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ExamensCliniquesController {
    async select(req, res){
        const { search } = req.query;
        const result = await Model.getAll(search);
        return res.status(200).json(result)
    }
    async selectOne(req, res){
        const { code_examen_clinique } = req.params
        const result = await Model.getOne(code_examen_clinique);
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new ExamensCliniquesController();