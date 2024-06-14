const Model = require("../models/PrescriptionsModel");
const axios = require("axios");
const moment = require("moment");
const { genID } = require("../utils");
const { fetchPatients, fetchMedicaments } = require("../utils/communication");
const templater = require("../utils/templater");
const { ToWords } = require("to-words");
const toWords = new ToWords({ localeCode: "fr-FR" });
const PrescriptionsModel = require("../models/PrescriptionsModel");
const logger = require("../utils/logger");
const QR = require('qr-image');
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

      let data = {
        id: reference,
        ville: hopital.ville,
        date: moment(new Date()).format("DD/MM/YYYY"),
        hopital: hopital.nom_hopital,
        service: service,
        medecin: medecin,
        email: hopital.email,
        telephone: hopital.telephone,
        patient: patient,
        prescriptions: [...prescriptions],
      };
      const qr_code = QR.imageSync(JSON.stringify({ obj: JSON.stringify(data), signature: sign(JSON.stringify(data)) }), { type: "png", margin: 0 });

      data.medecin = {nom: result2.data.nom, prenom: result2.data.prenom, specialite: result2.data.specialite};
      data.patient = {nom: result3.data.nom, prenom: result3.data.prenom, age: `${moment(new Date()).diff(moment(result3.data.date_de_naissance), "years")} ans`};

      templater.generate_ordonnance(
        data,
        qr_code,
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

      let data = {
        id: reference,
        ville: hopital.ville,
        date: moment(new Date()).format("DD/MM/YYYY"),
        hopital: hopital.nom_hopital,
        service: service,
        medecin: medecin,
        email: hopital.email,
        telephone: hopital.telephone,
        patient: patient,
        duree: duree_arret_de_travail,
        duree_en_lettres: toWords.convert(duree_arret_de_travail).toUpperCase(),
      };

      const qr_code = QR.imageSync(JSON.stringify({ obj: JSON.stringify(data), signature: sign(JSON.stringify(data)) }), { type: "png", margin: 0 });

      data.medecin = { nom: result2.data.nom, prenom: result2.data.prenom, specialite: result2.data.specialite };
      data.patient = { nom: result3.data.nom, prenom: result3.data.prenom, age: `${moment(new Date()).diff(moment(result3.data.date_de_naissance), "years")} ans` };

      templater.generate_arret_de_travail(
        data,
        qr_code,
        `/mnt/data/arret_de_travail_${reference}.pdf`
      );
    } catch (err) {
      logger.error("database-error: " + err);
    }
  }
}


const crypto = require('crypto');
function sign(data){
  // Create a SHA-256 hash of the JSON string
  const hash = crypto.createHash('sha256');
  hash.update(data);
  const hashedData = hash.digest('base64');

  // Sign the hash using the private key
  const signature = crypto.sign('sha256', Buffer.from(hashedData), {
    key: process.env.QR_CODE_PRIVATE_KEY,
    padding: crypto.constants.RSA_PKCS1_PADDING,
    saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
  });
  
  // Base64 for easier transmission and return
  return signature.toString('base64');
}

/******** EXPORTS ********/
module.exports = new PrescriptionsController();
