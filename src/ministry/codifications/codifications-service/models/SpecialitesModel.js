const { db } = require("../config/database");
const logger = require("../utils/logger");

class SpecialitesModel {
    async getAll() {
        try {
            const [results] = await db.query("SELECT * FROM `specialites`");
            return results;
        } catch (error) {
            logger.error("Error fetching specialites:", error);
            throw error;
        }
    }

    async getOne(specialite) {
        try {
            const [results] = await db.query(
                "SELECT * FROM `specialites` WHERE `specialite`=?",
                [specialite]
            );
            return results[0];
        } catch (error) {
            logger.error("Error fetching specialites:", error);
            throw error;
        }
    }

    async selectByCodes(codes_Specialites) {
        try {
            const [results] = await db.query(
                "SELECT * FROM `specialites` WHERE `specialite` IN (?)",
                [codes_Specialites]
            );
            return results;
        } catch (error) {
            logger.error("Error fetching specialites:", error);
            throw error;
        }
    }
}

module.exports = new SpecialitesModel();
