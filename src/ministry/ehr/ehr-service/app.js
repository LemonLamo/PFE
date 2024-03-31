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
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require('./middlewares/auth')
const logger = require('./utils/logger')
const ConsultationsController = require('./controllers/ConsultationsController');
const HospitalisationsController = require('./controllers/HospitalisationsController');
const InterventionsController = require('./controllers/InterventionsController');
const PrescriptionsController = require('./controllers/PrescriptionsController');
const RadiosController = require('./controllers/RadiosController');
const BilansController = require('./controllers/BilansController');
const SoinsController = require('./controllers/SoinsController');

// Consultations
app.get('/api/ehr/consultations', ConsultationsController.select);
app.get('/api/ehr/consultations/:id', ConsultationsController.selectOne);
app.get('/api/ehr/consultations/:id/examens-cliniques', ConsultationsController.selectExamensCliniques);

// Prescriptions
app.get('/api/ehr/prescriptions', PrescriptionsController.select);

// Radios
app.get('/api/ehr/radios', RadiosController.select);

// Bilans
app.get('/api/ehr/bilans', BilansController.select);

// Hospitalisations
app.get('/api/ehr/hospitalisations', HospitalisationsController.select);
//app.get('/api/ehr/hospitalisations/:id', HospitalisationsController.selectOne);
app.get('/api/ehr/medecin/hospitalisations', auth.requireAuth, HospitalisationsController.selectByMedecin);

// Interventions
app.get('/api/ehr/interventions', InterventionsController.select);
//app.get('/api/ehr/interventions/:id', InterventionsController.selectOne);

// Soins
app.get ("/api/soins", SoinsController.getAll);
app.post("/api/soins", SoinsController.insert);
app.get ("/api/soins/:id", SoinsController.getOne);
app.post("/api/soins/:id/executer", SoinsController.executer);

app.use((req, res) => res.sendStatus(404))

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.info('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;