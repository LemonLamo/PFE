const Model = require("../models/ConsultationsModel");
const ExamensCliniquesModel = require("../models/ExamensCliniquesModel");
const { genID, verifyIntegrity } = require("../utils");
const { fetchPatients, fetchMedecins, fetchExamensCliniques } = require("../utils/communication");
const RabbitConnection = require("../config/amqplib");
const logger = require("../utils/logger");
const axios = require('axios');
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class ConsultationsController {
  async select(req, res) {
    const { NIN, role } = req.jwt;

    try {
      // If patient, reply with history for that patient.
      if (role == undefined) {
        const data = await Model.selectByPatient(NIN);
        return res.status(200).json(data);
      }

      // else, to be secured later
      else {
        const { patient } = req.query;
        const data = patient
          ? await Model.selectByPatient(patient)
          : await Model.selectByMedecin(patient);

        const [patients, medecins] = await Promise.all([
          fetchPatients(data),
          fetchMedecins(data)
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
    const { id } = req.params;
    const { NIN } = req.jwt;
    try {
      const data = await Model.selectOne(id);
      // ensure it concerns this user.
      if (data.medecin != NIN && data.patient != NIN)
        return res.status(400).json();

      // fetch related data
      const [patients, medecins] = await Promise.all([
        fetchPatients([data]),
        fetchMedecins([data])
      ]);
      const result = {...data, patient: patients.get(data.patient), medecin: medecins.get(data.medecin)};
      
      // verify integrity
      result.integrite = await verifyIntegrity(id, data);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    const { NIN: medecin, role, service, hopital } = req.jwt;
    try {
      const id = "cons-"+genID();
      const { patient, date, type, motif, symptomes, resume, diagnostique, diagnostique_details } = req.body;
      const { examens_cliniques, prescriptions, radios, bilans, interventions, duree_arret_de_travail, prochaine_consultation } = req.body;

      await Model.insert(id, patient, medecin, hopital, service, date, type, motif, symptomes, resume, diagnostique, diagnostique_details, duree_arret_de_travail);

      // blockchain
      await RabbitConnection.sendMsg("blockchain_insert", {id: id, obj: await Model.selectOne(id), author: medecin })

      // Examens cliniques
      const insert_examens_cliniques = examens_cliniques.map((e) =>
        ExamensCliniquesModel.insert(genID(), patient, id, e.code_examen_clinique, e.resultat, e.remarques)
      );
      const promises = [...insert_examens_cliniques];
      await Promise.all(promises);

      const rdv_interventions = interventions.map((x) => ({
        jwt: req.jwt,
        patient,
        type: "Intervention",
        code_intervention: x.code_intervention,
        date: x.date,
        details: x.remarques,
      }));

      if (prochaine_consultation)
        RabbitConnection.sendMsg("rendez-vous_create", {
          jwt: req.jwt,
          patient,
          type: "Consultation",
          date: prochaine_consultation,
          details: null,
        });

      if (interventions)
        RabbitConnection.sendMsg("rendez-vous_create_bulk", rdv_interventions);

      if (prescriptions)
        RabbitConnection.sendMsg("prescriptions_create", {
          jwt: req.jwt,
          patient,
          prescriptions,
          reference: id,
        });

      if (duree_arret_de_travail)
        RabbitConnection.sendMsg("arret_de_travail_create", {
          jwt: req.jwt,
          patient,
          duree_arret_de_travail,
          reference: id,
        });

      if (radios)
        RabbitConnection.sendMsg("radios_create", {
          jwt: req.jwt,
          patient,
          radios,
          reference: id,
        });

      if (bilans)
        RabbitConnection.sendMsg("bilans_create", {
          jwt: req.jwt,
          patient,
          bilans,
          reference: id,
        });

      // Revoque auth
      await axios.post("http://auth-service/api/auth/authorisations/expire", { medecin, patient, motif:"Consultation"}, { headers: { Authorization: req.headers.authorization } });

      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectCount(req, res) {
    // TODO: secure this
    const { hopital, medecin } = req.query;
    try {
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

  async selectCountToday(req, res) {
    // TODO: secure this
    const { hopital } = req.jwt;
    try {
      const result = await Model.countToday(hopital);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectCountByService(req, res) {
    // TODO: secure this
    const { hopital } = req.jwt;
    try {
      const result = await Model.countByService(hopital);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async timeline(req, res) {
    // TODO: secure this
    const { hopital, medecin, duree } = req.query;
    try {
      if (hopital && medecin) {
        const array = await Model.selectTimelinePerMedecin(
          hopital,
          medecin,
          duree
        );
        const results = Object.fromEntries(
          array.map(({ date_key, consultations }) => [date_key, consultations])
        );
        return res.status(200).json(results);
      } else if (hopital) {
        const array = await Model.selectTimelinePerHopital(hopital, duree);
        const results = Object.fromEntries(
          array.map(({ date_key, consultations }) => [date_key, consultations])
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
}

/******** EXPORTS ********/
module.exports = new ConsultationsController();
