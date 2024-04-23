const Model = require("../models/RendezVousModel");
const { genID } = require("../utils");
const {
  fetchPatients,
  fetchInterventions,
  fetchMedecins,
} = require("../utils/communication");
const moment = require("moment");
const axios = require("axios");
const RabbitConnection = require("../config/amqplib");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class RendezVousController {
  async select(req, res) {
    try {
      const { NIN, role } = req.jwt;
      if (role == undefined) {
        const data = await Model.getByPatient(req.jwt.NIN);
        const medecins = await fetchMedecins(data);
        const result = data.map((x) => ({
          ...x,
          medecin: medecins.get(x.patient),
        }));
        return res.status(200).json(result);
      } else {
        const data = await Model.getByMedecin(req.jwt.NIN);
        const patients = await fetchPatients(data);
        const result = data.map((x) => ({
          ...x,
          patient: patients.get(x.patient),
        }));
        return res.status(200).json(result);
      }
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
      const result = await Model.getOne(id);

      if (role == undefined && result.patient == NIN)
        return res.status(200).json(result);
      else if (result.medecin == NIN) return res.status(200).json(result);
      else return res.status(400).json();
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    try {
      const id = genID();
      const { patient, type, date, details, code_intervention } = req.body;
      const { NIN: medecin, hopital, role } = req.jwt;

      const title =
        type === "Consultation"
          ? "Consultation"
          : (
              await fetchInterventions([
                { code_intervention: code_intervention },
              ])
            ).get(code_intervention).designation;

      const duree = type === "Consultation" ? 15 : 30;

      await Model.insert(
        id,
        patient,
        medecin,
        type,
        title,
        details,
        date,
        duree
      );

      // notify
      const medecin_profile = (
        await axios.get(`http://personnel-service/private/personnel/${medecin}`)
      ).data;
      const medecin_formatted = `Dr. ${medecin_profile.prenom[0]}. ${medecin_profile.nom}`;
      const date_formatted =
        moment(date).format("DD/MM/YYYY") +
        " à " +
        moment(date).format("HH:mm");
      const payload = {
        notification_type: "RENDEZVOUS_PATIENT",
        NIN: patient,
        notified_type: "patient",
        delivery_method: 1,
        data: { rdv: type, medecin: medecin_formatted, date: date_formatted },
      };
      RabbitConnection.sendMsg("notification", payload);

      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
}

/******** EXPORTS ********/
module.exports = new RendezVousController();
