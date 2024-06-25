const Model = require("../models/InterventionsModel");
const {
  fetchInterventions,
  fetchPatients,
  fetchMedecins,
} = require("../utils/communication");
const axios = require('axios');
const { genID, verifyIntegrity } = require("../utils");
const RabbitConnection = require("../config/amqplib");
const logger = require("../utils/logger");
const { generate_key, encrypt, decrypt } = require("../utils/encryption");

/******** ACTIONS ********/
class InterventionsController {
  async select(req, res) {
    try {
      const { NIN, role } = req.jwt;

      // If patient, reply with history for that patient.
      if (role == undefined) {
        const data = await Model.selectByPatient(NIN);
        const [interventions, medecins] = await Promise.all([
          fetchInterventions(data),
          fetchMedecins(data),
        ]);
        const result = data.map((x) => ({
          ...x,
          medecin: medecins.get(x.medecin),
          designation: interventions.get(x.code_intervention).designation,
        }));
        return res.status(200).json(result);
      }

      // If doctor, reply with history for that doctor.
      else {
        const { patient, fait } = req.query;
        const data = patient
          ? await Model.selectByPatient(patient)
          : fait == 0
          ? await Model.selectInactiveByMedecin(NIN)
          : await Model.selectByMedecin(NIN);
        const [interventions, patients, medecins] = await Promise.all([
          fetchInterventions(data),
          fetchPatients(data),
          fetchMedecins(data),
        ]);
        const result = data.map((x) => ({
          ...x,
          medecin: medecins.get(x.medecin),
          patient: patients.get(x.patient),
          designation: interventions.get(x.code_intervention).designation,
        }));
        return res.status(200).json(result);
      }
      //   return res.status(400).json();
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

      if (data.medecin != NIN && data.patient != NIN)
        return res.status(400).json()

      // fetch related data
      const [interventions, patients, medecins] = await Promise.all([
        fetchInterventions([data]),
        fetchPatients([data]),
        fetchMedecins([data])
      ]);
      const result = { ...data, patient: patients.get(data.patient), medecin: medecins.get(data.medecin), designation: interventions.get(data.code_intervention).designation, };

      // if protocole_operatoire, decrypt it
      if (result.protocole_operatoire){
        console.log("\nSELECT: " + result.id)
        console.log("AES_KEY_ENCRYPTED: " + result.aes_key)
        console.log("PO_ENCRYPTED: " + result.protocole_operatoire)
        const response = await fetch("http://cpabe-service/decrypt", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "ct": result.aes_key, "secret_key": process.env.CPABE_SECRET })
        })
        const aes_key = await response.text();
        result.protocole_operatoire = decrypt(aes_key, result.protocole_operatoire);
        console.log("AES_KEY_DECRYPTED: " + aes_key)
        console.log("PO_DECRYPTED: " + result.protocole_operatoire)
      }
      
      // verify integrity
      result.integrite = await verifyIntegrity(id, data);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    try {
      const { NIN: medecin, role, hopital, service } = req.jwt;

      const id = "interv-"+genID();
      const { patient, date, code_intervention, remarques, protocole_operatoire } = req.body;
      const aes_key = generate_key();
      console.log("INSERT:")
      console.log("AES_KEY: " + aes_key)
      const po = protocole_operatoire? encrypt(aes_key, protocole_operatoire) : "";
      console.log("PO_ENCRYPTED: " + po);
      const response = await fetch("http://cpabe-service/encrypt", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "msg": aes_key, "policy": "(service_type:interventions) AND (authorization_level:ministry)" })
      })
      const aes_key_encrypted = await response.text();
      console.log("AES_KEY_ENCRYPTED: " + aes_key_encrypted)
      await Model.insert(id, patient, medecin, hopital, service, date, code_intervention, remarques, po, aes_key_encrypted);

      // blockchain
      await RabbitConnection.sendMsg("blockchain_insert", {id: id, obj: await Model.selectOne(id), author: medecin })

      if (!protocole_operatoire)
        RabbitConnection.sendMsg("rendez-vous_create", {
          jwt: req.jwt,
          patient,
          type: "Intervention",
          code_intervention,
          date,
          details: remarques,
        });

      // Revoque auth
      axios.post("http://auth-service/api/auth/authorisations/expire", { medecin, patient, urgence: 0}, { headers: { Authorization: req.headers.authorization } });

      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async executer(req, res) {
    const { id } = req.params;
    const { protocole_operatoire } = req.body;
    try {
      const precheck = await Model.selectOne(id);
      const response = await fetch("http://cpabe-service/decrypt", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "ct": precheck.aes_key, "secret_key": process.env.CPABE_SECRET })
      })
      const aes_key = await response.text();
      const po = encrypt(aes_key, protocole_operatoire);

      await Model.executer(id, po);
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectCount(req, res) {
    try {
      const { hopital, medecin } = req.query;
      if (hopital && medecin) {
        const result = await Model.countByMedecin(hopital, medecin);
        return res.status(200).json(result);
      } else if (hopital) {
        const result = await Model.countByHopital(hopital);
        return res.status(200).json(result);
      }
      //   return res.status(403).json({});
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  
  async selectCountToday(req, res) {
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
    try {
      const { hopital, medecin, duree } = req.query;
      if (hopital && medecin) {
        const array = await Model.selectTimelinePerMedecin(
          hopital,
          medecin,
          duree
        );
        const results = Object.fromEntries(
          array.map(({ date_key, interventions }) => [date_key, interventions])
        );
        return res.status(200).json(results);
      } else if (hopital) {
        const array = await Model.selectTimelinePerHopital(hopital, duree);
        const results = Object.fromEntries(
          array.map(({ date_key, interventions }) => [date_key, interventions])
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
module.exports = new InterventionsController();
