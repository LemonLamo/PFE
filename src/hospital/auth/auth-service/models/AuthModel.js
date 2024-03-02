const db = require('../config/database').db;

exports.validationRules = {
    NIN: ['required', 'digits:18'],
    email: ['required', 'email'],
    password: ['required', 'string']
}

exports.selectByNIN = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `users` WHERE NIN=?', [NIN]);
    return results.length > 0? results[0] : {}
}

exports.saveVerificationToken = async (NIN, email_verify_token) => {
    const [results] = await db.query('UPDATE `users` SET email_verify_token=? WHERE NIN=?', [email_verify_token, NIN]);
    if (results.affectedRows < 1)
        throw new Error({code:"ER_UPDATE_FAIL"})
}
exports.verifyEmail = async (NIN) =>{
    const [results] = await db.query('UPDATE `users` SET email_verified_at=CURRENT_TIMESTAMP WHERE NIN=?', [NIN]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}

exports.setResetToken = async(NIN, resetToken) =>{
    const [results] = await db.query('UPDATE `users` SET reset_token=? WHERE NIN=?', [resetToken, NIN]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}

exports.enable2FA = async(NIN) =>{
    const [results] = await db.query('UPDATE `users` SET two_factor_enabled=1 WHERE NIN=?', [NIN]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}
exports.disable2FA = async (NIN) => {
    const [results] = await db.query('UPDATE `users` SET two_factor_enabled=0 WHERE NIN=?', [NIN]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}

exports.resetPassword = async (NIN, password) => {
    const [results] = await db.query('UPDATE `users` SET password=?, reset_token=NULL WHERE NIN=?', [password, NIN]);
    if (results.affectedRows < 1)
        throw new Error({ code: "ER_UPDATE_FAIL" })
}

exports.insert = async (NIN, email, phoneNumber, password, two_factor_secret) => {
    await db.execute('INSERT INTO `users`(NIN, email, phoneNumber, password, two_factor_secret) VALUES(?, ?, ?, ?, ?)', [NIN, email, phoneNumber, password, two_factor_secret]);
}