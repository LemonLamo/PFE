const Model = require('../models/MedicamentsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
async function getAll(req, res){
    const result = await Model.select();

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "database-error", errorMessage: "Contact developer" });
}
async function insert(req, res){
    const {code, nom, quantity} = req.body;
    const result = await Model.insert(code, nom, quantity);

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "database-error", errorMessage: "Contact developer" });
}
async function update(req, res){
    const { code, quantity } = req.body;
    const result = await Model.update(code, quantity);

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "database-error", errorMessage: "Contact developer" });

}
async function remove (req, res){
    const { code } = req.body;
    const result = await Model.remove(code);

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "database-error", errorMessage: "Contact developer" });
}

/******** EXPORTS ********/
module.exports = {
    getAll,
    insert,
    update,
    remove
}