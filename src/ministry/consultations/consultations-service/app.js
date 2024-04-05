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
const ConsultationsController = require("./controllers/ConsultationsController");

// TODO: rework the name of this one
app.get("/api/ehr/medecin/consultations", auth.requireAuth, ConsultationsController.selectByMedecin);

// Consultations
app.get ("/api/consultations", ConsultationsController.select);
app.get ("/api/consultations/count", ConsultationsController.selectCount);
app.get ("/api/consultations/timeline", ConsultationsController.timeline);
app.get ("/api/consultations/:id", ConsultationsController.selectOne);
app.post("/api/consultations", auth.requireAuth, ConsultationsController.insert);

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
