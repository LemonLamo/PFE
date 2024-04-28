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

// controllers
const ChambresController = require("./controllers/ChambresController");
const auth = require("./middlewares/auth");
const logger = require("./utils/logger");

app.get("/api/chambres", auth.requireAuth, ChambresController.getAll);
app.post("/api/chambres", auth.requireAuth, ChambresController.insert);
app.put("/api/chambres", auth.requireAuth, ChambresController.update);
app.get("/api/chambres/:num", auth.requireAuth, ChambresController.getOne);
app.get("/api/chambres/:num/lits", auth.requireAuth, ChambresController.getLits);
app.post("/api/chambres/:numChambre/lits/:num/occuper", auth.requireAuth, ChambresController.occuper);
app.post("/api/chambres/:numChambre/lits/:num/liberer", auth.requireAuth, ChambresController.liberer);
app.delete("/api/chambres/:num", auth.requireAuth, ChambresController.remove);

app.use((req, res) => res.sendStatus(404));

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.info('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;
