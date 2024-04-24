const { db } = require("../config/database");

class RendezVousModel {
  validationRules = {};

  async getByMedecin(medecin) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `rendezvous` WHERE `medecin`=? ORDER BY date ASC",
        [medecin]
      );
      return results;
    } catch (error) {
      console.error("Error fetching rendezvous:", error);
      throw error;
    }
  }
  async getByPatient(patient) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `rendezvous` WHERE `patient`=? ORDER BY date ASC",
        [patient]
      );
      return results;
    } catch (error) {
      console.error("Error fetching rendezvous:", error);
      throw error;
    }
  }

  async selectOne(id) {
    try {
      const [results] = await db.query(
        "SELECT * FROM `rendezvous` WHERE `id`=?",
        [id]
      );
      return results[0];
    } catch (error) {
      console.error("Error fetching rendezvous:", error);
      throw error;
    }
  }

  async insert(id, patient, medecin, type, title, details, date, duree) {
    try {
      await db.execute(
        "INSERT INTO rendezvous(id, patient, medecin, type, title, details, date, duree) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          patient,
          medecin,
          type,
          title,
          details ?? null,
          new Date(date),
          duree,
        ]
      );
    } catch (error) {
      console.error("Error inserting rendezvous:", error);
      throw error;
    }
  }
}

module.exports = new RendezVousModel();
