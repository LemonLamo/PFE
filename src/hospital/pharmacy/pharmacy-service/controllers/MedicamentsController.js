const Model = require("../models/MedicamentsModel");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
async function getAll(req, res) {
  const result = await Model.select();
  return res.status(200).json(result);
}
async function getOne(req, res) {
  const { code_medicament } = req.params;
  const result = await Model.selectOne(code_medicament);
  return res.status(200).json(result);
}
async function getTransactions(req, res) {
  const { code_medicament } = req.params;
  const result = await Model.selectTransactions(code_medicament);
  return res.status(200).json(result);
}
async function insert(req, res) {
  const { code_medicament, nom, quantite } = req.body;

  try {
    await Model.insert(code_medicament, nom, quantite);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ errorCode: "database-error", errorMessage: err.code });
  }
}
async function update(req, res) {
  const { code_medicament, quantite } = req.body;
  try {
    await Model.update(code_medicament, quantite);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err)
    return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
  }
}
async function remove(req, res) {
  const { code_medicament } = req.params;
  try {
    await Model.remove(code_medicament);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
  }
}

/******** EXPORTS ********/
module.exports = {
  getAll,
  getOne,
  getTransactions,
  insert,
  update,
  remove,
};
