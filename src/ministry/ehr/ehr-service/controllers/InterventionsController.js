const Model = require('../models/InterventionsModel');
const { fetchInterventions } = require('../utils/communication');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class InterventionsController {
    async select(req, res){
        const { patient } = req.query
        if(patient){
            let interventions = await Model.getByPatient(patient);
            interventions = await fetchInterventions(interventions)
            return res.status(200).json(interventions)
        }
        return res.status(400).json({errorCode: "", errorMessage: ""})
    }
}

/******** EXPORTS ********/
module.exports = new InterventionsController();