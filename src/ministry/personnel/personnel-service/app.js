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

// controllers
const PersonnelController = require("./controllers/PersonnelController");
const auth = require("./middlewares/auth");
const logger = require("./utils/logger");

app.get("/api/personnel", PersonnelController.getAll);
app.post("/api/personnel", PersonnelController.insert);
app.put("/api/personnel", PersonnelController.update);
app.get("/api/personnel/count", PersonnelController.selectCount);
app.get("/api/personnel/countBySexe", auth.requireAuth, PersonnelController.selectCountGroupBySexe);
app.get("/api/personnel/countByService", auth.requireAuth, PersonnelController.selectCountGroupByService);
app.get("/api/personnel/:NIN", PersonnelController.getOne);
app.delete("/api/personnel/:NIN", PersonnelController.remove);

// graceful shutdown
process.on("SIGTERM", () =>
  app.close(() => {
    logger.info("Server shutdown.");
    database.db.end();
  })
);

app.use((req, res) => res.sendStatus(404));

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;
