const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const database = require("./config/database");
const app = express();

// database connection
database.connect();

// configure express app
app.set("trust proxy", 1); // trust first proxy
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require("./middlewares/auth");
const logger = require("./utils/logger")
const PatientsController = require("./controllers/PatientsController");

app.post("/api/patients", PatientsController.insert);
app.get("/api/patients", PatientsController.getAll);
app.get("/api/patients/:NIN", PatientsController.getOne);
app.get("/api/patients/:NIN/historique", PatientsController.getHistorique);

app.get("/api/patients/:NIN/maladies-chroniques", PatientsController.getMaladiesChroniques);
app.post("/api/patients/:NIN/maladies-chroniques", auth.requireAuth, PatientsController.insertMaladieChronique);

app.get("/api/patients/:NIN/allergies", PatientsController.getAllergies);
app.post("/api/patients/:NIN/allergies", auth.requireAuth, PatientsController.getAllergies);

app.get("/api/patients/:NIN/antecedents-medicals", PatientsController.getAntecedentsMedicals);
app.post("/api/patients/:NIN/antecedents-medicals", auth.requireAuth, PatientsController.insertAntecedentMedical);

app.get("/api/patients/:NIN/antecedents-familiaux", PatientsController.getAntecedentsFamiliaux);
app.post("/api/patients/:NIN/antecedents-familiaux", auth.requireAuth, PatientsController.insertAntecedentFamilial);

app.get("/api/patients/:NIN/medicaments", PatientsController.getMedicaments);
//app.get("/api/patients/:NIN/medicaments", PatientsController.getMedicaments);

app.get("/api/patients/:NIN/vaccinations", PatientsController.getVaccinations);
app.post("/api/patients/:NIN/vaccinations", auth.requireAuth, PatientsController.insertVaccination);

app.post("/private/patientsByNINs", PatientsController.getByNINs);

app.use((req, res) => res.sendStatus(404));

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.info('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;
