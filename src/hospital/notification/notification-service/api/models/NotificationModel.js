const db = require('../../config/database').db;

exports.validationRules = {
    'type': ['required', 'string'],
    'notifiable_id': ['required', 'digits:18'],
    'notifiable_type': ['required', 'string'],
    'notifiable_destination': ['required', 'string'],
}

exports.selectByNIN = async (NIN) => {
    const [results, fields] = await db.query('SELECT * FROM `notifications` WHERE `notifiable_id`=?', [NIN]);
    return results
}
exports.insert = async (id, type, notifiable_id, notifiable_type, notifiable_destination, data) => {
    const [results, fields] = await db.query('INSERT INTO `notifications`(`id`, `type`, `notifiable_id`, `notifiable_type`, `notifiable_destination`, `data`) VALUES(?, ?, ?, ?, ?, ?)', [id, type, notifiable_id, notifiable_type, notifiable_destination, data]);
    return results
}
exports.mark_as_read = async (id) => {
    const [results, fields] = await db.query('UPDATE `notifications` SET `read_at`=CURRENT_TIMESTAMP WHERE `id`=?', [id]);
    return results
}

