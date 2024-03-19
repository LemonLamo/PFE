const Model = require('../models/HospitalisationsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class HospitalisationsController {
    async select(req, res){
        const { patient } = req.query
        if(patient){
            const result = await Model.getByPatient(patient);
            return res.status(200).json(result)
        }
        return res.status(400).json({errorCode: "", errorMessage: ""})
    }
    async selectActiveByMedecin(req, res){
        const result = await Model.getActiveByMedecin(req.jwt.NIN);
        return res.status(200).json(result)
    }
}

/******** EXPORTS ********/
module.exports = new HospitalisationsController();