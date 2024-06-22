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

exports.selectOne = async (code_medicament) => {
  const [results] = await db.query("SELECT * FROM `medicaments` WHERE `code_medicament`=?", [code_medicament]);
  return results[0];
};

exports.selectTransactions = async (code_medicament) => {
  const [results] = await db.query("SELECT * FROM `transactions` WHERE `code_medicament`=? ORDER BY `date` DESC", [code_medicament]);
  return results;
};

exports.insert = async (code_medicament, quantite) => {
  await db.execute("INSERT INTO `medicaments`(`code_medicament`, `quantite`) VALUES (?, ?)", [code_medicament, quantite]);
};
exports.update = async (code_medicament, quantite) => {
  let [avant] = await db.execute("SELECT quantite FROM `medicaments` WHERE `code_medicament`=?",[code_medicament]);
  let results = await db.query("UPDATE `medicaments` SET `quantite`=`quantite`+? WHERE `code_medicament`=?",[quantite, code_medicament]);

  if (results[0].affectedRows < 1)
    throw new Error({ code: "ER_UPDATE_FAIL" });

  await db.execute("INSERT INTO `transactions`(`code_medicament`, `avant`, `difference`) VALUES (?, ?, ?)",[code_medicament, avant[0].quantite, quantite]);
};
exports.remove = async (code_medicament) => {
  let results = await db.query("DELETE FROM `medicaments` WHERE code_medicament=?", [code_medicament]);
  if (results[0].affectedRows < 1)
    throw new Error({ code: "ER_DELETE_FAIL" });
};
