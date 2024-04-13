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
const multer  = require("multer")
const upload = multer({ dest: "/mnt/data/" })

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
const OrdonnancesController = require("./controllers/OrdonnancesController");
const PrescriptionsController = require("./controllers/PrescriptionsController");
const RadiosController = require("./controllers/RadiosController");
const BilansController = require("./controllers/BilansController");
const PrescriptionsModel = require("./models/PrescriptionsModel");
const { genID } = require("./utils");
const RadiosModel = require("./models/RadiosModel");
const BilansModel = require("./models/BilansModel");

// Prescriptions
app.get ("/api/prescriptions", PrescriptionsController.select);
app.get ("/api/prescriptions/ordonnances/:id", OrdonnancesController.select);
app.get ("/api/prescriptions/arret-de-travail/:id", OrdonnancesController.select2);
app.get ("/api/prescriptions/:id", PrescriptionsController.select);
app.post("/api/prescriptions", PrescriptionsController.insert);

// Radios
app.get ("/api/radios", RadiosController.select);
app.get ("/api/radios/:id", RadiosController.selectOne);
app.get ("/api/radios/:id/results", RadiosController.getResultsList);
app.get ("/api/radios/:id/results/:num", RadiosController.getResultOne);
app.post("/api/radios", RadiosController.insert);
app.post("/api/radios/:id", upload.array("radios", 5), RadiosController.addResults);

// Bilans
app.get ("/api/bilans", BilansController.select);
app.get ("/api/bilans/:id", BilansController.selectOne);
app.get ("/api/bilans/:id/results", BilansController.getResultsList);
app.get ("/api/bilans/:id/results/:num", BilansController.getResultOne);
app.post("/api/bilans", BilansController.insert);
app.post("/api/bilans/:id", upload.array("bilans", 5), BilansController.addResults);

// RabitMQ
RabbitConnection.on("prescriptions_create", async (data) =>{
  const { jwt, patient, prescriptions, reference} = data;
  await Promise.all(prescriptions.map((p) => PrescriptionsModel.insert(genID(), patient, reference, p.code_medicament, p.posologie, p.frequence, p.duree, p.remarques)));
  await PrescriptionsController.generate_ordonnance(reference, jwt.hopital, jwt.service, jwt.NIN, patient, prescriptions);
})

RabbitConnection.on("arret_de_travail_create", async (data) =>{
  const { jwt, patient, duree_arret_de_travail, reference} = data;
  await PrescriptionsController.generate_arret_de_travail(reference, jwt.hopital, jwt.service, jwt.NIN, patient, duree_arret_de_travail);
})

RabbitConnection.on("radios_create", async (data) =>{
  const { jwt, patient, radios, reference} = data;
  await Promise.all(radios.map((r) => RadiosModel.insert(genID(), patient, reference, r.code_radio, r.date, r.remarques)));
})

RabbitConnection.on("bilans_create", async (data) =>{
  const { jwt, patient, bilans, reference} = data;
  await Promise.all(bilans.map((b) => BilansModel.insert( genID(), patient, reference, b.code_bilan, b.date, b.remarques)));
})

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
