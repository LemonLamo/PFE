const db = require('../config/database').db;

exports.validationRules = {

}
exports.selectByID = async (ID) => {
    const [results] = await db.query('SELECT * FROM `notifications` WHERE `id`=?', [ID]);
    return results.length > 0 ? results[0] : {}
}
exports.selectByNIN = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `notifications` WHERE `NIN`=? ORDER BY `created_at` DESC', [NIN]);
    return results
}
exports.insert = async (type, NIN, email, telephone, title, summary, data) => {
    await db.execute('INSERT INTO `notifications`(`type`, `NIN`, `email`, `telephone`, `title`, `summary`, `data`) VALUES(?, ?, ?, ?, ?, ?, ?)', [type, NIN, email, telephone, title, summary, data]);
}
exports.mark_as_read = async (id) => {
    const [results] = await db.query('UPDATE `notifications` SET `read_at`=CURRENT_TIMESTAMP WHERE `id`=?', [id]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}

