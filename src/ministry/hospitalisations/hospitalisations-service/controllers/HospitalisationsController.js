const Model = require("../models/HospitalisationsModel");
const { genID } = require("../utils");
const { fetchPatients, fetchMedecins } = require("../utils/communication");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class HospitalisationsController {
  async select(req, res) {
    try {
      const { NIN, role } = req.jwt;

      // If patient, reply with history for that patient.
      if (role == undefined) {
        const data = await Model.selectByPatient(NIN);
        return res.status(200).json(data);
      }

      // If doctor, reply with history for that doctor.
      else {
        const { patient, active } = req.query;
        const data = patient
          ? await Model.selectByPatient(patient)
          : active == 1
          ? await Model.selectActiveByMedecin(NIN)
          : await Model.selectByMedecin(NIN);
        const [patients, medecins] = await Promise.all([
          fetchPatients(data),
          fetchMedecins(data),
        ]);
        const result = data.map((x) => ({
          ...x,
          patient: patients.get(x.patient),
          medecin: medecins.get(x.medecin),
        }));
        return res.status(200).json(result);
      }
      // return res.status(400).json();
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectOne(req, res) {
    try {
      const { NIN, role } = req.jwt;
      const { id } = req.params;
      const result = await Model.selectOne(id);

      // ensure it concerns this user.
      if (result.medecin == NIN || result.patient == NIN)
        return res.status(200).json(result);

      return res.status(400).json();
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    try {
      const { NIN: medecin, role, hopital, service } = req.jwt;

      const id = genID();
      const {
        patient,
        date_entree,
        mode_entree,
        motif_hospitalisation,
        chambre,
        lit,
        resume_hospitalisation,
      } = req.body;
      await Model.insert(
        id,
        patient,
        medecin,
        hopital,
        service,
        date_entree,
        mode_entree,
        motif_hospitalisation,
        chambre,
        lit,
        resume_hospitalisation
      );
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async addRemarque(req, res) {
    try {
      const { NIN, role, hopital } = req.jwt;
      const { id } = req.params;
      const { remarque } = req.body;

      // Only the doctor for this hospitalisation can update the hospitalisation
      const precheck = await Model.selectOne(id);
      if (precheck.medecin != NIN) return res.status(400).json();

      const result = await Model.addRemarque(id, remarque);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async addSortie(req, res) {
    try {
      const { NIN, role, hopital } = req.jwt;
      const { id } = req.params;
      const { mode_sortie, date_sortie } = req.body;

      // Only the doctor for this hospitalisation can update the hospitalisation
      const precheck = await Model.selectOne(id);
      if (precheck.medecin != NIN) return res.status(400).json();

      const result = await Model.addSortie(id, mode_sortie, date_sortie);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectCount(req, res) {
    try {
      // TODO: Secure this!
      const { hopital, medecin } = req.query;
      if (hopital && medecin) {
        const result = await Model.countByMedecin(hopital, medecin);
        return res.status(200).json(result);
      } else if (hopital) {
        const result = await Model.countByHopital(hopital);
        return res.status(200).json(result);
      }
      return res.status(403).json({});
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async timeline(req, res) {
    try {
      // TODO: Secure this!
      const { hopital, medecin, duree } = req.query;
      if (hopital && medecin) {
        const array = await Model.selectTimelinePerMedecin(
          hopital,
          medecin,
          duree
        );
        const results = Object.fromEntries(
          array.map(({ date_key, hospitalisations }) => [
            date_key,
            hospitalisations,
          ])
        );
        return res.status(200).json(results);
      } else if (hopital) {
        const array = await Model.selectTimelinePerHopital(hopital, duree);
        const results = Object.fromEntries(
          array.map(({ date_key, hospitalisations }) => [
            date_key,
            hospitalisations,
          ])
        );
        return res.status(200).json(results);
      }
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  // PRIVATE ROUTES
  async hospitalisationsByIDs(req, res) {
    try {
      const { IDs } = req.body;
      const result = await Model.selectByIDs(IDs);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

/******** EXPORTS ********/
module.exports = new HospitalisationsController();
