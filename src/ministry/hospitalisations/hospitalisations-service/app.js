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
const HospitalisationsController = require("./controllers/HospitalisationsController");

// Hospitalisations
app.get ("/api/hospitalisations", HospitalisationsController.select);
app.get ("/api/hospitalisations/medecin", auth.requireAuth, HospitalisationsController.selectByMedecin);
app.get ("/api/hospitalisations/count", HospitalisationsController.selectCount);
app.get ("/api/hospitalisations/timeline", HospitalisationsController.timeline);
app.get ("/api/hospitalisations/:id", HospitalisationsController.selectOne);
app.post("/api/hospitalisations", auth.requireAuth, HospitalisationsController.insert);
app.post("/api/hospitalisations/:id/remarques", HospitalisationsController.addRemarque);
app.post("/api/hospitalisations/:id/sortie", HospitalisationsController.addSortie);

app.post("/private/hospitalisationsByIDs", HospitalisationsController.hospitalisationsByIDs)

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
