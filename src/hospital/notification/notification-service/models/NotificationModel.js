const db = require('../config/database').db;

exports.validationRules = {
    'type': ['required', 'string'],
    'notifiable_id': ['required', 'digits:18'],
    'notifiable_type': ['required', 'string'],
    'notifiable_destination': ['required', 'string'],
}
exports.selectByID = async (ID) => {
    const [results] = await db.query('SELECT * FROM `notifications` WHERE `id`=?', [ID]);
    return results.length > 0 ? results[0] : {}
}
exports.selectByNIN = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `notifications` WHERE `notifiable_id`=?', [NIN]);
    return results
}
exports.insert = async (id, type, notifiable_id, notifiable_type, notifiable_destination, data) => {
    await db.execute('INSERT INTO `notifications`(`id`, `type`, `notifiable_id`, `notifiable_type`, `notifiable_destination`, `data`) VALUES(?, ?, ?, ?, ?, ?)', [id, type, notifiable_id, notifiable_type, notifiable_destination, data]);
}
exports.mark_as_read = async (id) => {
    const [results] = await db.query('UPDATE `notifications` SET `read_at`=CURRENT_TIMESTAMP WHERE `id`=?', [id]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}

