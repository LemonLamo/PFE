const db = require("../config/database").db;

exports.validationRules = {
};

exports.select = async (service, medecin) => {
  const [results] = await db.query("SELECT * FROM `urgences` WHERE `service`=? AND (`medecin`=? OR `medecin` IS NULL OR `medecin`='') ORDER BY created_at DESC", [service, medecin]);
  return results;
};

exports.selectOne = async (patient) => {
  const [results] = await db.query("SELECT * FROM `urgences` WHERE `patient`=?", [patient]);
  return results;
};

exports.insert = async (service, patient, medecin, remarques) => {
  await db.execute("INSERT INTO `urgences`(`service`, `patient`, `medecin`, `remarques`) VALUES (?, ?, ?, ?)", [service, patient, medecin ?? null, remarques ?? null]);
};

exports.remove = async (patient) => {
  await db.execute("DELETE FROM `urgences` WHERE patient=?", [patient]);
};
