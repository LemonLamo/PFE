const Model = require('../models/MedicamentsModel');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
async function getAll(req, res){
    const result = await Model.select();
    return res.status(200).json(result)
}
async function insert(req, res){
    const {code, nom, quantity} = req.body;
    
    try {
        await Model.insert(code, nom, quantity);
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
}
async function update(req, res){
    const { code, quantity } = req.body;
    try {
        await Model.update(code, quantity);
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }

}
async function remove (req, res){
    const { code } = req.body;
    try {
        await Model.remove(code);
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
}

/******** EXPORTS ********/
module.exports = {
    getAll,
    insert,
    update,
    remove
}