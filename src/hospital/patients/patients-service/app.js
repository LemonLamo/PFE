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
const PatientsController = require('./controllers/PatientsController');

app.get('/api/patients', auth.requireAuth, PatientsController.getAll);
app.get('/api/patients/:NIN', auth.requireAuth, PatientsController.getOne);
app.get('/api/patients/:NIN/maladies-chroniques', auth.requireAuth, PatientsController.getMaladiesChroniques);
app.get('/api/patients/:NIN/allergies', auth.requireAuth, PatientsController.getAllergies);
app.get('/api/patients/:NIN/antecedents-medicals', auth.requireAuth, PatientsController.getAntecedentsMedicals);
app.get('/api/patients/:NIN/antecedents-familiaux', auth.requireAuth, PatientsController.getAntecedentsFamiliaux);
app.get('/api/patients/:NIN/medicaments', auth.requireAuth, PatientsController.getMedicaments);
app.get('/api/patients/:NIN/vaccinations', auth.requireAuth, PatientsController.getVaccinations);
app.get('/api/patients/:NIN/historique', auth.requireAuth, PatientsController.getHistorique);

app.use((req, res) => res.sendStatus(404))

// start server
app.listen(8080, () => console.log(`[SERVER] Listening on port ${8080}`));

module.exports = app;