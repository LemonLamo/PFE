const db = require("../config/database").db;

exports.validationRules = {
  NIN: ["required", "digits:18"],
  email: ["required", "email"],
  password: ["required", "string"],
};

exports.select = async () => {
  const [results] = await db.query("SELECT * FROM `medicaments`");
  return results;
};

exports.selectOne = async (code) => {
  const [results] = await db.query(
    "SELECT * FROM `medicaments` WHERE `code`=?",
    [code]
  );
  return results;
};

exports.selectTransactions = async (code) => {
  const [results] = await db.query(
    "SELECT * FROM `transactions` WHERE `code`=? ORDER BY `date` DESC",
    [code]
  );
  return results;
};

exports.insert = async (code, nom, quantite) => {
  await db.execute(
    "INSERT INTO `medicaments`(`code`, `nom`, `quantite`) VALUES (?, ?, ?)",
    [code, nom, quantite]
  );
};
exports.update = async (code, quantite) => {
  let [avant] = await db.execute(
    "SELECT quantite FROM `medicaments` WHERE `code`=?",
    [code]
  );
  let results = await db.query(
    "UPDATE `medicaments` SET `quantite`=`quantite`+? WHERE `code`=?",
    [quantite, code]
  );
  if (results[0].affectedRows < 1) throw new Error({ code: "ER_UPDATE_FAIL" });
  await db.execute(
    "INSERT INTO `transactions`(`code`, `avant`, `difference`) VALUES (?, ?, ?)",
    [code, avant[0].quantite, quantite]
  );
};
exports.remove = async (code) => {
  let results = await db.query("DELETE FROM `medicaments` WHERE code=?", [
    code,
  ]);
  if (results[0].affectedRows < 1) throw new Error({ code: "ER_DELETE_FAIL" });
};
