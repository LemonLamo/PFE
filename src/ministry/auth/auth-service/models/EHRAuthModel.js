const db = require('../config/database').db;
const logger = require('../utils/logger');

class EHRAuthModel {
    validationRules = {
    }

    async getAuths (patient, actif) {
        const [results] = !actif?
                        await db.query("SELECT * FROM `ehr_autorisations` WHERE `patient`=? ORDER BY `created_at` DESC", [patient]):
                        (actif == 1)?
                        await db.query("SELECT * FROM `ehr_autorisations` WHERE `patient`=? AND ((NOW() >= created_at AND expired_at IS NULL) OR (NOW() >= created_at AND NOW() <= expired_at)) ORDER BY `created_at` DESC", [patient]):
                        await db.query("SELECT * FROM `ehr_autorisations` WHERE `patient`=? AND ((NOW() < created_at) OR (expired_at IS NOT NULL AND NOW() > expired_at)) ORDER BY `created_at` DESC", [patient]);
        return results
    }
    async getHospitalAuths(hopital) {
        const [results] = await db.query("SELECT * FROM `ehr_autorisations` WHERE `hopital`=? AND `motif`='Urgence' ORDER BY `created_at` DESC", [hopital])
        return results;
    }

    async isAuthorized(medecin, patient) {
        const [results] = await db.query(`SELECT * FROM ehr_autorisations WHERE
        medecin=? AND patient=? AND
        ((NOW() >= created_at AND expired_at IS NULL) OR (NOW() >= created_at AND NOW() <= expired_at))`, [medecin, patient]);
        return results[0]
    }

    async authorize(hopital, medecin, patient, motif, duree) {
        try{
            const [results] = duree > 0?
                await db.query('INSERT INTO `ehr_autorisations` (`hopital`, `medecin`, `patient`, `motif`, `duree`, `expired_at`) VALUES (?, ?, ?, ?, ?, NOW() + INTERVAL `duree` MINUTE)', [hopital, medecin, patient, motif, duree]):
                await db.query('INSERT INTO `ehr_autorisations` (`hopital`, `medecin`, `patient`, `motif`, `duree`, `expired_at`) VALUES (?, ?, ?, ?, -1, NULL)', [hopital, medecin, patient, motif]);
            if (results.affectedRows < 1)
                throw new Error({ code: "ER_INSERT_FAIL" })
        }catch(err){
            logger.log(err);
            throw err;
        }
    }
    
    async expire(medecin, patient, urgence){
        console.log(urgence == 1 ? 'UPDATE `ehr_autorisations` SET `expired_at`= NOW() WHERE medecin=? AND patient=? AND motif="Urgence" AND `expired_at` IS NULL' : 'UPDATE `ehr_autorisations` SET `expired_at`= NOW() WHERE medecin=? AND patient=? AND (motif="Consultation" OR motif="Hospitalisation" OR motif="Intervention") AND `expired_at` IS NULL');
        const [results] = urgence==1?
            await db.query('UPDATE `ehr_autorisations` SET `expired_at`= NOW() WHERE medecin=? AND patient=? AND motif="Urgence" AND `expired_at` IS NULL', [medecin, patient]):
            await db.query('UPDATE `ehr_autorisations` SET `expired_at`= NOW() WHERE medecin=? AND patient=? AND (motif="Consultation" OR motif="Hospitalisation" OR motif="Intervention") AND `expired_at` IS NULL', [medecin, patient]);

        console.log(results);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }

    async getByID(id){
        const [results] = await db.query('SELECT * FROM `ehr_autorisations` WHERE id=?', [id]);
        return results[0]
    }
    
    async expireByID(id) {
        const [results] = await db.query('UPDATE `ehr_autorisations` SET `expired_at`= NOW() WHERE id=?', [id]);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }

    async validate(id, legit){
        const [results] = await db.query('UPDATE `ehr_autorisations` SET `validated_at`= NOW(), legit=? WHERE id=?', [legit, id]);
        if (results.affectedRows < 1)
            throw new Error({ code: "ER_UPDATE_FAIL" })
    }
}

module.exports = new EHRAuthModel();