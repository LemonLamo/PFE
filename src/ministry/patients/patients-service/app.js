const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const database = require("./config/database");
const RabbitConnection = require("./config/amqplib");
RabbitConnection.connect();
const app = express();
const { imageOnly } = require("./utils");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/mnt/data/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.NIN)
  }
});
const uploadAvatar = multer({ storage: storage, fileFilter: imageOnly });

// database connection
database.connect();

// configure express app
app.set("trust proxy", 1); // trust first proxy
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require("./middlewares/auth");
const logger = require("./utils/logger");
const PatientsController = require("./controllers/PatientsController");
const MedicamentsModal = require("./models/MedicamentsModal");

app.post("/api/patients/bulk-select", auth.requireAuth, PatientsController.selectAll);
app.get("/api/patients/search", auth.requireAuth, PatientsController.searchAll);
app.post("/api/patients", auth.requireAuth, uploadAvatar.single("avatar"), PatientsController.insert);

app.get("/api/patients/:NIN", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectOne);
app.get("/api/patients/:NIN/avatar", auth.requireAuth, PatientsController.serveAvatar);
app.get("/api/patients/:NIN/historique", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectHistorique);

app.get("/api/patients/:NIN/maladies-chroniques", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectMaladiesChroniques);
app.post("/api/patients/:NIN/maladies-chroniques", auth.requireAuth, PatientsController.insertMaladieChronique);
app.delete("/api/patients/:NIN/maladies-chroniques/:id", auth.requireAuth, PatientsController.deleteMaladieChronique);

app.get("/api/patients/:NIN/allergies", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectAllergies);
app.post("/api/patients/:NIN/allergies", auth.requireAuth, PatientsController.insertAllergie);
app.delete("/api/patients/:NIN/allergies/:id", auth.requireAuth, PatientsController.deleteAllergie);

app.get("/api/patients/:NIN/antecedents-medicals", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectAntecedentsMedicals);
app.post("/api/patients/:NIN/antecedents-medicals", auth.requireAuth, PatientsController.insertAntecedentMedical);
app.delete("/api/patients/:NIN/antecedents-medicals/:id", auth.requireAuth, PatientsController.deleteAntecedent);

app.get("/api/patients/:NIN/antecedents-familiaux", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectAntecedentsFamiliaux);
app.post("/api/patients/:NIN/antecedents-familiaux", auth.requireAuth, PatientsController.insertAntecedentFamilial);
app.delete("/api/patients/:NIN/antecedents-familiaux/:id", auth.requireAuth, PatientsController.deleteAntecedent);

app.get("/api/patients/:NIN/vaccinations", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectVaccinations);
app.post("/api/patients/:NIN/vaccinations", auth.requireAuth, PatientsController.insertVaccination);

app.get("/api/patients/:NIN/medicaments", auth.requireAuth, auth.verifyEHRAuth, PatientsController.selectMedicaments);

app.post("/private/patients", PatientsController.selectByNINs);
app.get("/private/patients/:NIN", PatientsController.selectByNIN);

// RabitMQ

RabbitConnection.on("medicaments_create", async (data) => {
  const medicaments = data;
  await Promise.all(
    medicaments.map((p) =>
      MedicamentsModal.insert(
        p.id,
        p.patient,
        p.reference,
        p.code_medicament,
        p.posologie,
        p.frequence,
        p.duree,
        p.remarques,
        p.date_debut
      )
    )
  );
});

app.use((req, res) => res.sendStatus(404));

// graceful shutdown
process.on("SIGTERM", () =>
  app.close(() => {
    logger.info("Server shutdown.");
    database.db.end();
  })
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;
