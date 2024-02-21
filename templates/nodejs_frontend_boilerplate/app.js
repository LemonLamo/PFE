const dotenv = require('dotenv'); dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const router = require('./config/router');
const app = express();

// configure express app
app.set('trust proxy', 1) // trust first proxy
app.set('view engine', 'ejs');
app.use(cors());
app.use(helmet()); // add security measures
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/', router);
app.use((req, res) => res.sendStatus(404))

// start server
app.listen(process.env.PORT, () => console.log(`[SERVER] Listening on port ${process.env.PORT}`));

module.exports = app;