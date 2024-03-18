const Model = require('../models/InterventionsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
    async select(req, res){
        const { patient, medecin } = req.query
        if(patient){
            const result = await Model.getByPatient(patient);
            return res.status(200).json(result)
        }else if(medecin){
            const result = await Model.getByMedecin(medecin);
            return res.status(200).json(result)
        }

        return res.status(400).json({errorCode: "", errorMessage: ""})
    }
}

/******** EXPORTS ********/
module.exports = new InterventionsController();