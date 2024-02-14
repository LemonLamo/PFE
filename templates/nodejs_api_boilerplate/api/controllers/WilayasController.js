const router = require('express').Router();
const Model = require('../models/WilayasModel');

/******** MIDDLEWARES ********/
const auth = require('../middlewares/auth');
const validation = require('../middlewares/validation');
const validate = async (req, res, next) => validation.validate(req, res, next, Model.validationRules)

/******** ROUTES ********/
router.get("/", select);
router.post("/", validate, create);
router.put("/:id", validate, update);
router.delete("/:id", destroy);

/******** ACTIONS ********/
async function select(req, res){
    let result = await Model.select(req.body)

    if (result)
        return res.status(200).json(result);
    else
        return res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
}

async function create(req, res) {
    let result = await Model.insert(req.body);

    if (result)
        return res.status(200).json(result);
    else
        return res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
        
}

async function update(req, res) {
    let result = await Model.update(req.body);

    if (result)
        return res.status(200).json(result);
    else
        return res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
}

async function destroy(req, res) {
    let result = await Model.delete(req.body);

    if (result)
        return res.status(200).json(result);
    else
        return res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer." });
}

module.exports = router