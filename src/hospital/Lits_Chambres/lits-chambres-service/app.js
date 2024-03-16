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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const LitsRoute = require("./routes/LitsRoute");
const ChambresRoute = require("./routes/ChambresRoute");
const auth = require("./middlewares/auth");
const logger = require("./utils/logger");

// app.use("/api/lits", LitsRoute);
app.use("/api/chambres", ChambresRoute);

app.use((req, res) => res.sendStatus(404));

// start server
app.listen(4000, () => logger.info(`[SERVER] Listening on port ${4000}`));

module.exports = app;
