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
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require("./middlewares/auth");
const logger = require("./utils/logger");
const ReceptionController = require("./controllers/ReceptionController");
const UrgencesController = require('./controllers/UrgencesController');

app.get("/api/reception", auth.requireAuth, ReceptionController.getAll);
app.post("/api/reception", auth.requireAuth, ReceptionController.insert);
app.get("/api/reception/:patient", auth.requireAuth, ReceptionController.getOne);
app.delete("/api/reception/:patient", auth.requireAuth, ReceptionController.remove);

app.get("/api/urgences", auth.requireAuth, UrgencesController.getAll);
app.post("/api/urgences", auth.requireAuth, UrgencesController.insert);
app.get("/api/urgences/:patient", auth.requireAuth, UrgencesController.getOne);
app.delete("/api/urgences/:patient", auth.requireAuth, UrgencesController.remove);

app.use((req, res) => res.sendStatus(404));

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.log('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;
