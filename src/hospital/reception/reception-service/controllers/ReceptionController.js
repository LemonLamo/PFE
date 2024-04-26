const Model = require("../models/ReceptionModel");
const logger = require("../utils/logger");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
async function getAll(req, res) {
  const { service, medecin } = req.query;
  const result = await Model.select(service, medecin);
  
  return res.status(200).json(result);
}

async function getOne(req, res) {
  const { patient } = req.params;
  const result = await Model.selectOne(patient);
  return res.status(200).json(result);
}

async function insert(req, res) {
  const { service, patient, medecin, remarques } = req.body;

  try {
    await Model.insert(service, patient, medecin, remarques);
    return res.status(200).json({ success: true });
  } catch (err) {
    logger.error(err)
    return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
  }
}

async function remove(req, res) {
  const { patient } = req.params;
  try {
    await Model.remove(patient);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
  }
}

/******** EXPORTS ********/
module.exports = {
  getAll,
  getOne,
  insert,
  remove,
};
