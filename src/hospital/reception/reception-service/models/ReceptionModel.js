const db = require("../config/database").db;

exports.validationRules = {
};

exports.select = async (service, medecin) => {
  const [results] = await db.query("SELECT * FROM `reception` WHERE `service`=? AND (`medecin`=? OR `medecin` IS NULL OR `medecin`='')", [service, medecin]);
  return results;
};

exports.selectOne = async (patient) => {
  const [results] = await db.query("SELECT * FROM `reception` WHERE `patient`=?", [patient]);
  return results;
};

exports.insert = async (service, patient, medecin, remarques) => {
  await db.execute("INSERT INTO `reception`(`service`, `patient`, `medecin`, `remarques`) VALUES (?, ?, ?, ?)", [service, patient, medecin ?? null, remarques ?? null]);
};

exports.remove = async (patient) => {
  let results = await db.query("DELETE FROM `reception` WHERE patient=?", [patient]);
  if (results[0].affectedRows < 1)
    throw new Error({ code: "ER_DELETE_FAIL" });
};
