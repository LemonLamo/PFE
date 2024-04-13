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
const TransfertsController = require("./controllers/TransfertsController");

// Hospitalisations
app.get ("/api/hospitalisations", auth.requireAuth, HospitalisationsController.select);
app.get ("/api/hospitalisations/count", auth.requireAuth, HospitalisationsController.selectCount);
app.get ("/api/hospitalisations/timeline", auth.requireAuth, HospitalisationsController.timeline);
app.get ("/api/hospitalisations/:id", auth.requireAuth, HospitalisationsController.selectOne);
app.post("/api/hospitalisations", auth.requireAuth, HospitalisationsController.insert);
app.post("/api/hospitalisations/:id/remarques", auth.requireAuth, HospitalisationsController.addRemarque);
app.post("/api/hospitalisations/:id/sortie", auth.requireAuth, HospitalisationsController.addSortie);

// Transferts
app.post ("/api/transferts", auth.requireAuth, TransfertsController.insert);

app.post("/private/hospitalisations", HospitalisationsController.hospitalisationsByIDs)

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
