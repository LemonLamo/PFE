const db = require("../config/database").db;

exports.validationRules = {};
exports.selectByID = async (ID) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM `notifications` WHERE `id`=?",
      [ID]
    );
    return results.length > 0 ? results[0] : {};
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
exports.selectPatientNotifsByNIN = async (NIN) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM `notifications` WHERE `NIN`=? AND `notified_type`='patient' ORDER BY `created_at` DESC",
      [NIN]
    );
    return results;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
exports.selectPersonnelNotifsByNIN = async (NIN) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM `notifications` WHERE `NIN`=? AND `notified_type`!='patient' ORDER BY `created_at` DESC",
      [NIN]
    );
    return results;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
exports.insert = async (
  notification_type,
  NIN,
  notified_type,
  delivery_method,
  email,
  telephone,
  summary,
  data
) => {
  try {
    await db.execute(
      "INSERT INTO `notifications`(`notification_type`, `NIN`, `notified_type`, `delivery_method`, `email`, `telephone`, `summary`, `data`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        notification_type,
        NIN,
        notified_type,
        delivery_method,
        email,
        telephone,
        summary,
        data,
      ]
    );
  } catch (error) {
    console.error("Error inserting notifications:", error);
    throw error;
  }
};
exports.mark_as_read = async (id) => {
  try {
    const [results] = await db.query(
      "UPDATE `notifications` SET `read_at`=CURRENT_TIMESTAMP WHERE `id`=?",
      [id]
    );
    if (results.affectedRows < 1) throw new Error({ code: "ER_UPDATE_FAIL" });
  } catch (error) {
    console.error("Error updating notifications:", error);
    throw error;
  }
};
