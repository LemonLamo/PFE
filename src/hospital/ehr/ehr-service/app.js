const dotenv = require('dotenv'); dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require("helmet");
const database = require('./config/database');
const app = express();

// database connection
database.connect()

// configure express app
app.set('trust proxy', 1) // trust first proxy
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require('./middlewares/auth')
const ConsultationsController = require('./controllers/ConsultationsController');
const HospitalisationsController = require('./controllers/HospitalisationsController');
const InterventionsController = require('./controllers/InterventionsController');
const SoinsController = require('./controllers/SoinsController');

app.get('/api/consultations', auth.requireAuth, ConsultationsController.select);
app.get('/api/hospitalisations', auth.requireAuth, HospitalisationsController.select);
app.get('/api/interventions', auth.requireAuth, InterventionsController.select);

app.get('/api/hospitalisations/mine', auth.requireAuth, HospitalisationsController.selectActiveByMedecin);

app.get ("/api/soins", SoinsController.getAll);
app.post("/api/soins", SoinsController.insert);
app.get ("/api/soins/:code_soin", SoinsController.getOne);
app.post("/api/soins/:code_soin/executer", SoinsController.executer);

app.use((req, res) => res.sendStatus(404))

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {console.log('Server shutdown.'); database.db.end()})
);

// start server
app.listen(8080, () => console.log(`[SERVER] Listening on port ${8080}`));

module.exports = app;