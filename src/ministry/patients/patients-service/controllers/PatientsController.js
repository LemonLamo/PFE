const axios = require("axios");
const Model = require("../models/PatientsModel");
const RabbitConnection = require("../config/amqplib");
const { fetchMaladies, fetchAllergies, fetchVaccinations, fetchMedicaments, fetchHandicaps } = require("../utils/communication");
const MedicamentsModal = require("../models/MedicamentsModal");
const logger = require("../utils/logger");
//const validator = require('../middlewares/validation');

class PatientsController {

  async UpdateSolidarity(NIN, code_handicap) {
    try {
      await Model.UpdateSolidarity(NIN, code_handicap);
    } catch (err) {
      logger.error("database-error: " + err);
    }
  }

  async UpdateTravail(NIN, code_handicap) {
    try {
      await Model.UpdateTravail(NIN, code_handicap);
    } catch (err) {
      logger.error("database-error: " + err);
    }
  }

  async searchAll(req, res) {
    try {
      const { search } = req.query;

      if (!search || search.length < 3) return res.status(400).json();

      const result = await Model.searchAll(search);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectAll(req, res) {
    try {
      const { NINs } = req.body;
      const result = await Model.selectByNINs(NINs);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    try {
      const {
        NIN,
        nom,
        prenom,
        date_de_naissance,
        lieu_de_naissance,
        sexe,
        situation_familiale,
        email,
        telephone,
        adresse,
        commune,
        code_postale,
        wilaya,
        groupage,
        taille,
        poids,
        donneur_organe,
        NIN_pere,
        NIN_mere,
      } = req.body;
      const maladies_chroniques = JSON.parse(req.body.maladies_chroniques ?? "[]");
      const allergies = JSON.parse(req.body.allergies ?? "[]");
      const antecedents_medicaux = JSON.parse(req.body.antecedents_medicaux ?? "[]");
      const antecedents_familiaux = JSON.parse(req.body.antecedents_familiaux ?? "[]");
      const handicaps = JSON.parse(req.body.handicaps ?? "[]");

      const result = await Model.insert(
        NIN,
        nom,
        prenom,
        date_de_naissance,
        lieu_de_naissance,
        sexe,
        situation_familiale,
        email,
        telephone,
        adresse,
        commune,
        code_postale,
        wilaya,
        groupage,
        taille,
        poids,
        donneur_organe,
        NIN_pere,
        NIN_mere
      );
      if (maladies_chroniques)
        for (let maladie of maladies_chroniques)
          Model.insertMaladieChronique(
            NIN,
            maladie.code_maladie,
            maladie.date,
            maladie.remarques,
            req.jwt.NIN
          );

      if (allergies)
        for (let allergie of allergies)
          Model.insertAllergie(
            NIN,
            allergie.code_allergene,
            allergie.date,
            allergie.remarques,
            req.jwt.NIN
          );

      if (antecedents_medicaux)
        for (let antecedent_medical of antecedents_medicaux)
          Model.insertAntecedentMedical(
            NIN,
            antecedent_medical.designation,
            antecedent_medical.date,
            antecedent_medical.remarques,
            req.jwt.NIN
          );

      if (antecedents_familiaux)
        for (let antecedent_familial of antecedents_familiaux)
          Model.insertAntecedentFamilial(
            NIN,
            antecedent_familial.designation,
            antecedent_familial.date,
            antecedent_familial.remarques,
            req.jwt.NIN
          );

      if (handicaps)
        for (let handicap of handicaps) {
          Model.insertHandicap(
            NIN,
            handicap.code_handicap,
            handicap.date,
            handicap.remarques,
            req.jwt.NIN
          );
          RabbitConnection.sendMsg('handicap', {
            NIN: NIN, code_handicap: handicap.code_handicap, date: handicap.date, remarque: handicap.remarques, doctor: req.jwt.NIN,
            name: nom,
            family_name: prenom,
            birthday: date_de_naissance,
            birth_place: lieu_de_naissance,
            gender: sexe,
            situation_familiale,
            email,
            telephone,
            adresse,
            groupage,
            taille,
            poids,
          });
          RabbitConnection.sendMsg('CreateHandicap', { NIN: NIN, code_handicap: handicap.code_handicap, doctor: req.jwt.NIN });
        }

      RabbitConnection.sendMsg("account_create", { NIN, email });
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async serveAvatar(req, res) {
    try {
      const { NIN } = req.params;
      return res.status(200).sendFile(`/mnt/data/${NIN}`, {
        headers: { "Content-Type": "image/jpeg" },
      });
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectOne(req, res) {
    try {
      const { NIN } = req.params;
      const result = await Model.selectOne(NIN);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectMaladiesChroniques(req, res) {
    try {
      const { NIN } = req.params;
      const data = await Model.selectMaladiesChroniques(NIN);
      const maladies_chroniques = await fetchMaladies(data);

      const result = data.map((x) => ({
        ...x,
        designation: maladies_chroniques.get(x.code_maladie).designation,
      }));
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectAllergies(req, res) {
    try {
      const { NIN } = req.params;
      const data = await Model.selectAllergies(NIN);
      const allergies = await fetchAllergies(data);

      const result = data.map((x) => ({
        ...x,
        designation: allergies.get(x.code_allergene).designation,
      }));
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectHandicaps(req, res) {
    try {
      const { NIN } = req.params;
      const data = await Model.selectHandicaps(NIN);
      const handicaps = await fetchHandicaps(data);

      const result = data.map((x) => ({
        ...x,
        designation: handicaps.get(x.code_handicap).designation,
      }));
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectAntecedentsMedicals(req, res) {
    try {
      const { NIN } = req.params;
      const result = await Model.selectAntecedentsMedicals(NIN);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectAntecedentsFamiliaux(req, res) {
    try {
      const { NIN } = req.params;
      const result = await Model.selectAntecedentsFamiliaux(NIN);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectMedicaments(req, res) {
    try {
      const { NIN } = req.params;
      const data = await MedicamentsModal.selectByPatient(NIN);
      const medicaments = await fetchMedicaments(data);

      const result = data.map((x) => ({
        ...x,
        DCI: medicaments.get(x.code_medicament).DCI,
      }));
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectVaccinations(req, res) {
    try {
      const { NIN } = req.params;
      const data = await Model.selectVaccinations(NIN);
      const vaccinations = await fetchVaccinations(data);

      const result = data.map((x) => ({
        ...x,
        designation: vaccinations.get(x.code_vaccin).designation,
      }));
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async selectHistorique(req, res) {
    try {
      const { NIN } = req.params;
      const [consultations, hospitalisations, interventions] = await Promise.all([
        axios.get(`http://consultations-service/api/consultations?patient=${NIN}`, { headers: { Authorization: req.headers.authorization } }),
        axios.get(`http://hospitalisations-service/api/hospitalisations?patient=${NIN}`, { headers: { Authorization: req.headers.authorization } }),
        axios.get(`http://interventions-service/api/interventions?patient=${NIN}`, { headers: { Authorization: req.headers.authorization } })
      ]);

      return res.status(200)
        .json([...consultations.data, ...hospitalisations.data, ...interventions.data]
          .sort((a, b) => new Date(b.date_entree ?? b.date) - new Date(a.date_entree ?? a.date))
        );
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insertMaladieChronique(req, res) {
    try {
      const { NIN } = req.params;
      const { code_maladie, date, remarques } = req.body;
      const medecin = req.jwt.NIN;
      const result = await Model.insertMaladieChronique(
        NIN,
        code_maladie,
        date,
        remarques,
        medecin
      );
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async deleteMaladieChronique(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.deleteMaladieChronique(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insertAllergie(req, res) {
    try {
      const { NIN } = req.params;
      const { code_allergene, date, remarques } = req.body;
      const medecin = req.jwt.NIN;
      const result = await Model.insertAllergie(
        NIN,
        code_allergene,
        date,
        remarques,
        medecin
      );
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async deleteAllergie(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.deleteAllergie(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insertHandicap(req, res) {
    try {
      const { NIN } = req.params;
      const { code_handicap, date, remarques } = req.body;
      const medecin = req.jwt.NIN;
      const result = await Model.insertHandicap(
        NIN,
        code_handicap,
        date,
        remarques,
        medecin
      );
      const output = await Model.GetPatient(NIN);
      console.log(output);
      RabbitConnection.sendMsg('handicap', { NIN: NIN, code_handicap: code_handicap, date: date, remarque: remarques, doctor: medecin,
        name: output.nom,
        family_name: output.prenom,
        birthday: output.date_de_naissance,
        birth_place: output.lieu_de_naissance,
        gender: output.sexe,
        situation_familiale: output.situation_familiale,
        email: output.email,
        telephone: output.telephone,
        adresse: output.adresse,
        groupage: output.groupage,
        taille: output.taille,
        poids: output.poids,
      });
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async deleteHandicap(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.deleteHandicap(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insertAntecedentMedical(req, res) {
    try {
      const { NIN } = req.params;
      const { designation, date, remarques } = req.body;
      const medecin = req.jwt.NIN;
      const result = await Model.insertAntecedentMedical(
        NIN,
        designation,
        date,
        remarques,
        medecin
      );
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insertAntecedentFamilial(req, res) {
    try {
      const { NIN } = req.params;
      const { designation, date, remarques } = req.body;
      const medecin = req.jwt.NIN;
      const result = await Model.insertAntecedentFamilial(
        NIN,
        designation,
        date,
        remarques,
        medecin
      );
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }
  async deleteAntecedent(req, res) {
    try {
      const { id } = req.params;
      const result = await Model.deleteAntecedent(id);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insertVaccination(req, res) {
    try {
      const { NIN } = req.params;
      const { code_vaccin, date, remarques, date_de_prochaine_dose } = req.body;
      const medecin = req.jwt.NIN;
      const result = await Model.insertVaccination(
        NIN,
        code_vaccin,
        date,
        remarques,
        date_de_prochaine_dose,
        medecin
      );
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  // PRIVATE ROUTES
  async selectByNINs(req, res) {
    try {
      const { NINs } = req.body;
      const result = await Model.selectByNINs(NINs);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async selectByNIN(req, res) {
    try {
      const { NIN } = req.params;
      const result = await Model.selectByNIN(NIN);
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async GetNotShared() {
    const results = await Model.GetNotShared();
    for (let result of results) {
      const output = await Model.GetPatient(result.patient);
      console.log(output);
      RabbitConnection.sendMsg('handicap', { NIN: result.patient, code_handicap: result.code_handicap, date: result.date, remarque: result.remarques, doctor: result.medecin, 
        name: output.nom,
        family_name: output.prenom,
        birthday: output.date_de_naissance,
        birth_place: output.lieu_de_naissance,
        gender: output.sexe,
        situation_familiale: output.situation_familiale,
        email: output.email,
        telephone: output.telephone,
        adresse: output.adresse,
        groupage: output.groupage,
        taille: output.taille,
        poids: output.poids,
      });
    }
  }

  async GetId(NIN, code_handicap) {
    try {
      const result = await Model.GetId(NIN, code_handicap);
      return result.id;
    } catch (err) {
      logger.error("database-error: " + err);
      return
    }
  }
}

/******** EXPORTS ********/
module.exports = new PatientsController();
