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
const { genID, imageOnly, pdfOnly } = require("./utils");
const multer = require("multer");
const uploadRadio = multer({ dest: "/mnt/data/", fileFilter: imageOnly });
const uploadBilan = multer({ dest: "/mnt/data/", fileFilter: pdfOnly });

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
const RadiosModel = require("./models/RadiosModel");
const BilansModel = require("./models/BilansModel");

// Prescriptions
app.get("/api/prescriptions", auth.requireAuth, PrescriptionsController.select);
app.get("/api/prescriptions/ordonnances/:id", auth.requireAuth, OrdonnancesController.select);
app.get("/api/prescriptions/arret-de-travail/:id", auth.requireAuth, OrdonnancesController.select2);
app.get("/api/prescriptions/:id", auth.requireAuth, PrescriptionsController.select);
app.post("/api/prescriptions", auth.requireAuth, PrescriptionsController.insert);

// Radios
app.get("/api/radios", auth.requireAuth, RadiosController.select);
app.get("/api/radios/:id", auth.requireAuth, RadiosController.selectOne);
app.get("/api/radios/:id/results", auth.requireAuth, RadiosController.getResultsList);
app.get("/api/radios/:id/results/:num", auth.requireAuth, RadiosController.getResultOne);
app.post("/api/radios", auth.requireAuth, RadiosController.insert);
app.post("/api/radios/:id", auth.requireAuth, uploadRadio.array("radios", 5), RadiosController.addResults);

// Bilans
app.get("/api/bilans", auth.requireAuth, BilansController.select);
app.get("/api/bilans/:id", auth.requireAuth, BilansController.selectOne);
app.get("/api/bilans/:id/results", auth.requireAuth, BilansController.getResultsList);
app.get("/api/bilans/:id/results/:num", auth.requireAuth, BilansController.getResultOne);
app.post("/api/bilans", auth.requireAuth, BilansController.insert);
app.post("/api/bilans/:id", auth.requireAuth, uploadBilan.array("bilans", 5), BilansController.addResults);

// RabitMQ
RabbitConnection.on("prescriptions_create", async (data) => {
  const { jwt, patient, prescriptions, reference } = data;
  const medicaments = prescriptions.map((p) => {
    return {
      id: "med-"+genID(),
      patient,
      reference,
      code_medicament: p.code_medicament,
      posologie: p.posologie,
      frequence: p.frequence,
      duree: p.duree,
      remarques: p.remarques,
      date_debut: new Date(),
    };
  });
  await Promise.all(
    medicaments.map((m) =>
      PrescriptionsModel.insert(
        m.id,
        m.patient,
        m.reference,
        m.code_medicament,
        m.posologie,
        m.frequence,
        m.duree,
        m.remarques
      )
    )
  );
  await RabbitConnection.sendMsg("medicaments_create", medicaments);
  await PrescriptionsController.generate_ordonnance(
    reference,
    jwt.hopital,
    jwt.service,
    jwt.NIN,
    patient,
    prescriptions
  );
});

RabbitConnection.on("arret_de_travail_create", async (data) => {
  const { jwt, patient, duree_arret_de_travail, reference } = data;
  await PrescriptionsController.generate_arret_de_travail(
    reference,
    jwt.hopital,
    jwt.service,
    jwt.NIN,
    patient,
    duree_arret_de_travail
  );
});

RabbitConnection.on("radios_create", async (data) => {
  const { jwt, patient, radios, reference } = data;
  await Promise.all(
    radios.map((r) =>
      RadiosModel.insert(
        "radio-"+genID(),
        patient,
        reference,
        r.code_radio,
        r.date,
        r.remarques
      )
    )
  );
});

RabbitConnection.on("bilans_create", async (data) => {
  const { jwt, patient, bilans, reference } = data;
  await Promise.all(
    bilans.map((b) =>
      BilansModel.insert(
        "bilan-"+genID(),
        patient,
        reference,
        b.code_bilan,
        b.date,
        b.remarques
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
