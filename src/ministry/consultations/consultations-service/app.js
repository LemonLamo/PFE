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
const ExamensCliniquesController = require("./controllers/ExamensCliniquesController");

// Consultations
app.get ("/api/consultations", auth.requireAuth, ConsultationsController.select);
app.post("/api/consultations", auth.requireAuth, ConsultationsController.insert);
app.get ("/api/consultations/count", auth.requireAuth, ConsultationsController.selectCount);
app.get ("/api/consultations/countToday", auth.requireAuth, ConsultationsController.selectCountToday);
app.get ("/api/consultations/countByService", auth.requireAuth, ConsultationsController.selectCountByService);
app.get ("/api/consultations/timeline", auth.requireAuth, ConsultationsController.timeline);
app.get ("/api/consultations/:id", auth.requireAuth, ConsultationsController.selectOne);
app.get ("/api/consultations/:id/examens-cliniques", auth.requireAuth, ExamensCliniquesController.selectByReference);

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
