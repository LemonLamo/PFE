const Model = require("../models/PrescriptionsModel");
const axios = require("axios");
const moment = require("moment");
const { genID } = require("../utils");
const { fetchPatients, fetchMedicaments } = require("../utils/communication");
const templater = require("../utils/templater");
const { ToWords } = require("to-words");
const toWords = new ToWords({ localeCode: "fr-FR" });
const RabbitConnection = require("../config/amqplib");
const PrescriptionsModel = require("../models/PrescriptionsModel");
const logger = require("../utils/logger");
//const validator = require('../middlewares/validation');

/******** ACTIONS ********/
class PrescriptionsController {
  async select(req, res) {
    try {
      const { reference } = req.query;
      if (reference) {
        const data = await Model.getByReference(reference);
        const [patients, medicaments] = await Promise.all([
          fetchPatients(data),
          fetchMedicaments(data),
        ]);
        const result = data.map((x) => ({
          ...x,
          patient: patients.get(x.patient),
          DCI: medicaments.get(x.code_medicament).DCI,
        }));
        return res.status(200).json(result);
      } else return res.status(404).json({});
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    try {
      const { patient, prescriptions, reference, hopital, service, medecin } =
        req.body;
      await Promise.all(
        prescriptions.map((p) =>
          PrescriptionsModel.insert(
            "med-"+genID(),
            patient,
            reference,
            p.code_medicament,
            p.posologie,
            p.frequence,
            p.duree,
            p.remarques
          )
        )
      );
      await PrescriptionsController.generate_ordonnance(
        reference,
        jwt.hopital,
        jwt.service,
        jwt.NIN,
        patient,
        prescriptions
      );
      await this.generate_ordonnance(
        reference,
        hopital,
        service,
        medecin,
        patient,
        prescriptions
      );
      return res.status(200).json({ success: 1 });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectOne(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.getOne(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async generate_ordonnance(
    reference,
    hopital,
    service,
    medecin,
    patient,
    prescriptions
  ) {
    try {
      const [result1, result2, result3, medicaments] = await Promise.all([
        axios.get(`http://hopitaux-service/private/hopitaux/${hopital}`),
        axios.get(`http://personnel-service/private/personnel/${medecin}`),
        axios.get(`http://patients-service/private/patients/${patient}`),
        fetchMedicaments(prescriptions),
      ]);
      prescriptions = prescriptions.map((x) => ({
        ...x,
        DCI: medicaments.get(x.code_medicament).DCI,
      }));
      hopital = result1.data;
      medecin = result2.data;
      patient = result3.data;

      let data = {
        id: reference,
        qr_code: "",
        ville: hopital.ville,
        date: moment(new Date()).format("DD/MM/YYYY"),
        hopital: hopital.nom_hopital,
        service: service,
        medecin: {
          nom: medecin.nom,
          prenom: medecin.prenom,
          specialite: medecin.specialite,
        },
        email: hopital.email,
        telephone: hopital.telephone,
        patient: {
          nom: patient.nom,
          prenom: patient.prenom,
          age: `${moment(new Date()).diff(
            moment(patient.date_de_naissance),
            "years"
          )} ans`,
        },
        prescriptions: [...prescriptions],
      };

      templater.generate_ordonnance(
        data,
        `/mnt/data/ordonnance_${reference}.pdf`
      );
    } catch (err) {
      logger.error("database-error: " + err);
    }
  }

  async generate_arret_de_travail(
    reference,
    hopital,
    service,
    medecin,
    patient,
    duree_arret_de_travail
  ) {
    try {
      const [result1, result2, result3] = await Promise.all([
        axios.get(`http://hopitaux-service/private/hopitaux/${hopital}`),
        axios.get(`http://personnel-service/private/personnel/${medecin}`),
        axios.get(`http://patients-service/private/patients/${patient}`),
      ]);
      hopital = result1.data;
      medecin = result2.data;
      patient = result3.data;

      let data = {
        id: reference,
        qr_code: "",
        ville: hopital.ville,
        date: moment(new Date()).format("DD/MM/YYYY"),
        hopital: hopital.nom_hopital,
        service: service,
        medecin: {
          nom: medecin.nom,
          prenom: medecin.prenom,
          specialite: medecin.specialite,
        },
        email: hopital.email,
        telephone: hopital.telephone,
        patient: {
          nom: patient.nom,
          prenom: patient.prenom,
          age: `${moment(new Date()).diff(
            moment(patient.date_de_naissance),
            "years"
          )} ans`,
        },
        duree: duree_arret_de_travail,
        duree_en_lettres: toWords.convert(duree_arret_de_travail).toUpperCase(),
      };

      templater.generate_arret_de_travail(
        data,
        `/mnt/data/arret_de_travail_${reference}.pdf`
      );
    } catch (err) {
      logger.error("database-error: " + err);
    }
  }
}

/******** EXPORTS ********/
module.exports = new PrescriptionsController();
