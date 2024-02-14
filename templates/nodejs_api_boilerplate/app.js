const dotenv = require('dotenv'); dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const database = require('./config/database');
const router = require('./api/router');
const app = express();

// database connection
database.connect()

// configure express app
app.set('trust proxy', 1) // trust first proxy
app.use(cors());
app.use(helmet()); // add security measures
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/api', router);
app.use((req, res) => res.sendStatus(404))

// start server
app.listen(process.env.PORT, () => console.log(`[SERVER] Listening on port ${process.env.PORT}`));

module.exports = app;