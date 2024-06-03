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
const logger = require('./utils/logger');
const MaladiesController = require('./controllers/MaladiesController');
const AllergenesController = require('./controllers/AllergenesController');
const VaccinsController = require('./controllers/VaccinsController');
const MedicamentsController = require('./controllers/MedicamentsController');
const RadiosController = require('./controllers/RadiosController');
const BilansController = require('./controllers/BilansController');
const InterventionsController = require('./controllers/InterventionsController');
const ExamensCliniquesController = require('./controllers/ExamensCliniquesController');
const SpecialitesController = require('./controllers/SpecialitesController');

app.get('/api/codifications/maladies', MaladiesController.select);
app.get('/api/codifications/maladies/:code_maladie', MaladiesController.selectOne);

app.get('/api/codifications/maladies-chroniques', MaladiesController.selectChroniques);
app.get('/api/codifications/maladies-chroniques/:code_maladie', MaladiesController.selectOneChronique);

app.get('/api/codifications/allergenes', AllergenesController.select);
app.get('/api/codifications/allergenes/:code_allergene', AllergenesController.selectOne);

app.get('/api/codifications/vaccins', VaccinsController.select);
app.get('/api/codifications/vaccins/:code_vaccin', VaccinsController.selectOne);

app.get('/api/codifications/examens-cliniques', ExamensCliniquesController.select);
app.get('/api/codifications/examens-cliniques/:code_examen_clinique', ExamensCliniquesController.selectOne);

app.get('/api/codifications/medicaments', MedicamentsController.select);
app.get('/api/codifications/medicaments/:code_medicament', MedicamentsController.selectOne);

app.get('/api/codifications/bilans', BilansController.select);
app.get('/api/codifications/bilans/:code_bilan', BilansController.selectOne);

app.get('/api/codifications/radios', RadiosController.select);
app.get('/api/codifications/radios/:code_radio', RadiosController.selectOne);

app.get('/api/codifications/interventions', InterventionsController.select);
app.get('/api/codifications/interventions/:code_intervention', InterventionsController.selectOne);

app.get('/api/codifications/specialites', SpecialitesController.select);
app.get('/api/codifications/specialites/:specialite', SpecialitesController.select);

app.post('/private/maladies', MaladiesController.getByCodes)
app.post('/private/allergenes', AllergenesController.getByCodes)
app.post('/private/vaccins', VaccinsController.getByCodes)
app.post('/private/examens-cliniques', ExamensCliniquesController.getByCodes)
app.post('/private/medicaments', MedicamentsController.getByCodes)
app.post('/private/bilans', BilansController.getByCodes)
app.post('/private/radios', RadiosController.getByCodes)
app.post('/private/interventions', InterventionsController.getByCodes)

app.use((req, res) => res.sendStatus(404))

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.info('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;