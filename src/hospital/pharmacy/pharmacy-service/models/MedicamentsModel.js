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

exports.insert = async (code, nom, quantity) => {
  await db.execute(
    "INSERT INTO `medicaments`(`code`, `nom`, `quantity`) VALUES (?, ?, ?)",
    [code, nom, quantity]
  );
};
exports.update = async (code, quantity) => {
  await db.query("UPDATE `medicaments` SET `quantity`=? WHERE `code`=?", [
    quantity,
    code,
  ]);
};
exports.remove = async (code) => {
  await db.query("DELETE FROM `medicaments` WHERE code=?", [code]);
};
