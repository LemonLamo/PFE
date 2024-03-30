const db = require('../config/database').db;

class UsersModel {
    validationRules = {
    }

    async selectByNIN (NIN) {
        const [results] = await db.query('SELECT * FROM `users` WHERE NIN=?', [NIN]);
        return results.length > 0? results[0] : {}
    }

    async saveVerificationToken (NIN, verify_token) {
        const [results] = await db.query('UPDATE `users` SET verify_token=? WHERE NIN=?', [verify_token, NIN]);
        if (results.affectedRows < 1)
            throw new Error({code:"ER_UPDATE_FAIL"})
    }
    async activateAccount (NIN){
        const [results] = await db.query('UPDATE `users` SET is_active=1 WHERE NIN=?', [NIN]);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }

    async setResetToken (NIN, resetToken){
        const [results] = await db.query('UPDATE `users` SET reset_token=? WHERE NIN=?', [resetToken, NIN]);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }

    async enable2FA (NIN){
        const [results] = await db.query('UPDATE `users` SET two_factor_enabled=1 WHERE NIN=?', [NIN]);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }
    async disable2FA (NIN){
        const [results] = await db.query('UPDATE `users` SET two_factor_enabled=0 WHERE NIN=?', [NIN]);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }

    async resetPassword (NIN, password){
        const [results] = await db.query('UPDATE `users` SET password=?, reset_token=NULL WHERE NIN=?', [password, NIN]);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }

    async insert (NIN, two_factor_secret){
        await db.execute('INSERT INTO `users`(NIN, two_factor_secret) VALUES(?, ?)', [NIN, two_factor_secret]);
    }

    async getPermissions (hopital, role){
        const [results] = await db.query('SELECT * FROM `roles_permissions` WHERE hopital=? AND role=?', [hopital, role]);
        return results.map(x => x.permission)
    }
}

module.exports = new UsersModel();