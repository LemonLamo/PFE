const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const database = require("./config/database");
const app = express();
const multer  = require("multer")
const upload = multer({ dest: "uploads/" })

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
const PrescriptionsController = require("./controllers/PrescriptionsController");
const RadiosController = require("./controllers/RadiosController");
const BilansController = require("./controllers/BilansController");

// Prescriptions
app.get ("/api/prescriptions", PrescriptionsController.select);
app.get ("/api/prescriptions/:id", PrescriptionsController.select);

// Radios
app.get ("/api/radios", RadiosController.select);
app.get ("/api/radios/:id", RadiosController.selectOne);
app.post("/api/radios", RadiosController.insert);
app.post("/api/radios/:id", upload.array("radio", 1), RadiosController.addResults);

// Bilans
app.get ("/api/bilans", BilansController.select);
app.get ("/api/bilans/:id", BilansController.selectOne);
app.post("/api/bilans", BilansController.insert);
app.post("/api/bilans/:id", upload.array("bilan", 1), BilansController.addResults);

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
