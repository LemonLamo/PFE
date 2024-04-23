const axios = require("axios");
const Model = require("../models/PatientsModel");
const RabbitConnection = require("../config/amqplib");
const {
  fetchMaladies,
  fetchAllergies,
  fetchVaccinations,
  fetchMedicaments,
} = require("../utils/communication");
const MedicamentsModal = require("../models/MedicamentsModal");
//const validator = require('../middlewares/validation');

class PatientsController {
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
      // TODO: Secure this
      const result = await Model.selectAll();
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  }

  async insert(req, res) {
    try {
      const { role } = req.jwt;

      // TODO: secure this further!
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
      const {
        maladies_chroniques,
        allergies,
        antecedents_medicaux,
        antecedents_familiaux,
      } = req.body;

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

      RabbitConnection.sendMsg("account_create", { NIN, email });
      return res.status(200).json(result);
    } catch (err) {
      logger.error("database-error: " + err);
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
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
      const consultations = (
        await axios.get(
          `http://consultations-service/api/consultations?patient=${NIN}`,
          { headers: { Authorization: req.headers.authorization } }
        )
      ).data;
      const hospitalisations = (
        await axios.get(
          `http://hospitalisations-service/api/hospitalisations?patient=${NIN}`,
          { headers: { Authorization: req.headers.authorization } }
        )
      ).data;
      const interventions = (
        await axios.get(
          `http://interventions-service/api/interventions?patient=${NIN}`,
          { headers: { Authorization: req.headers.authorization } }
        )
      ).data;
      return res
        .status(200)
        .json(
          [...consultations, ...hospitalisations, ...interventions].sort(
            (a, b) =>
              new Date(b.date_entree ?? b.date) -
              new Date(a.date_entree ?? a.date)
          )
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
}

/******** EXPORTS ********/
module.exports = new PatientsController();
