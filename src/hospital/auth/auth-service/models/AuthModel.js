const db = require('../config/database').db;

exports.validationRules = {
    NIN: ['required', 'digits:18'],
    email: ['required', 'email'],
    password: ['required', 'string']
}

exports.selectByNIN = async (NIN) => {
    const [results] = await db.query('SELECT * FROM `users` WHERE NIN=?', [NIN]);
    return results[0]
}

exports.saveVerificationToken = async (NIN, email_verify_token) => {
    const [results] = await db.execute('UPDATE `users` SET email_verify_token=? WHERE NIN=?', [email_verify_token, NIN]);
    return results
}
exports.verifyEmail = async (NIN) =>{
    const [results] = await db.execute('UPDATE `users` SET email_verified_at=CURRENT_TIMESTAMP WHERE NIN=?', [NIN]);
    return results
}

exports.setResetToken = async(NIN, resetToken) =>{
    const [results] = await db.execute('UPDATE `users` SET reset_token=? WHERE NIN=?', [resetToken, NIN]);
    return results
}

exports.enable2FA = async(NIN) =>{
    const [results] = await db.execute('UPDATE `users` SET two_factor_enabled=1 WHERE NIN=?', [NIN]);
    return results
}
exports.disable2FA = async (NIN) => {
    const [results] = await db.execute('UPDATE `users` SET two_factor_enabled=0 WHERE NIN=?', [NIN]);
    return results
}

exports.resetPassword = async (NIN, password) => {
    const [results] = await db.execute('UPDATE `users` SET password=?, reset_token=NULL WHERE NIN=?', [password, NIN]);
    return results
}

exports.insert = async (NIN, email, password, two_factor_secret) => {
    const [results] = await db.execute('INSERT INTO `users`(NIN, email, password, two_factor_secret) VALUES(?,?,?,?)', [NIN, email, password, two_factor_secret]);
    return results
}