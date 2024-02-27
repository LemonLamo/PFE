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
app.use(cors());
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require('./middlewares/auth')
const MedicamentsController = require('./controllers/MedicamentsController');

app.get('/api/medicaments', MedicamentsController.getAll);
app.post('/api/medicaments', MedicamentsController.insert);
app.put('/api/medicaments', MedicamentsController.update);
app.delete('/api/medicaments', MedicamentsController.remove);

app.use((req, res) => res.sendStatus(404))

// start server
app.listen(8080, () => console.log(`[SERVER] Listening on port ${8080}`));

module.exports = app;