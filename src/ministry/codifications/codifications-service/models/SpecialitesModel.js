const { db } = require("../config/database");
const logger = require("../utils/logger");

class SpecialitesModel {
    async getAll(search) {
        try {
            const [results] = await db.query(
                "SELECT * FROM `Specialites` WHERE specialite LIKE ? LIMIT 20",
                ["%" + search + "%"]
            );
            return results;
        } catch (error) {
            logger.error("Error fetching Specialites:", error);
            throw error;
        }
    }

    async getOne(specialite) {
        try {
            const [results] = await db.query(
                "SELECT * FROM `Specialites` WHERE `specialite`=?",
                [specialite]
            );
            return results;
        } catch (error) {
            logger.error("Error fetching Specialites:", error);
            throw error;
        }
    }

    async selectByCodes(codes_Specialites) {
        try {
            const [results] = await db.query(
                "SELECT * FROM `Specialites` WHERE `specialite` IN (?)",
                [codes_Specialites]
            );
            return results;
        } catch (error) {
            logger.error("Error fetching Specialites:", error);
            throw error;
        }
    }
}

module.exports = new SpecialitesModel();
