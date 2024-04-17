const db = require('../config/database').db;

exports.validationRules = {

}
exports.selectByID = async (ID) => {
    const [results] = await db.query('SELECT * FROM `notifications` WHERE `id`=?', [ID]);
    return results.length > 0 ? results[0] : {}
}
exports.selectPatientNotifsByNIN = async (NIN) => {
    const [results] = await db.query("SELECT * FROM `notifications` WHERE `NIN`=? AND `notified_type`='patient' ORDER BY `created_at` DESC", [NIN]);
    return results
}
exports.selectPersonnelNotifsByNIN = async (NIN) => {
    const [results] = await db.query("SELECT * FROM `notifications` WHERE `NIN`=? AND `notified_type`!='patient' ORDER BY `created_at` DESC", [NIN]);
    return results
}
exports.insert = async (notification_type, NIN, notified_type, delivery_method, email, telephone, summary, data) => {
    await db.execute('INSERT INTO `notifications`(`notification_type`, `NIN`, `notified_type`, `delivery_method`, `email`, `telephone`, `summary`, `data`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [notification_type, NIN, notified_type, delivery_method, email, telephone, summary, data]);
}
exports.mark_as_read = async (id) => {
    const [results] = await db.query('UPDATE `notifications` SET `read_at`=CURRENT_TIMESTAMP WHERE `id`=?', [id]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}

