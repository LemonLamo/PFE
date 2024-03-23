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
const MaladiesController = require('./controllers/MaladiesController');
const AllergenesController = require('./controllers/AllergenesController');
const VaccinsController = require('./controllers/VaccinsController');
const MedicamentsController = require('./controllers/MedicamentsController');
const RadiosController = require('./controllers/RadiosController');
const BilansController = require('./controllers/BilansController');
const InterventionsController = require('./controllers/InterventionsController');

app.get('/api/codifications/maladies', auth.requireAuth, MaladiesController.select);
app.get('/api/codifications/maladies-chroniques', auth.requireAuth, MaladiesController.selectChroniques);
app.get('/api/codifications/alleregenes', auth.requireAuth, AllergenesController.select);
app.get('/api/codifications/vaccins', auth.requireAuth, VaccinsController.select);
app.get('/api/codifications/medicaments', auth.requireAuth, MedicamentsController.select);
app.get('/api/codifications/radios', auth.requireAuth, RadiosController.select);
app.get('/api/codifications/bilans', auth.requireAuth, BilansController.select);
app.get('/api/codifications/interventions', auth.requireAuth, InterventionsController.select);

app.use((req, res) => res.sendStatus(404))

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {console.log('Server shutdown.'); database.db.end()})
);

// start server
app.listen(8080, () => console.log(`[SERVER] Listening on port ${8080}`));

module.exports = app;