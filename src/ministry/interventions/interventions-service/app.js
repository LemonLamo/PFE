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
const InterventionsController = require("./controllers/InterventionsController");

// Interventions
app.get ("/api/interventions", auth.requireAuth, InterventionsController.select);
app.post("/api/interventions", auth.requireAuth, InterventionsController.insert);
app.get ("/api/interventions/timeline", auth.requireAuth, InterventionsController.timeline);
app.get ("/api/interventions/count", auth.requireAuth, InterventionsController.selectCount);
app.get ("/api/interventions/:id", auth.requireAuth, InterventionsController.selectOne);
app.post("/api/interventions/:id/executer", auth.requireAuth, InterventionsController.executer);

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
