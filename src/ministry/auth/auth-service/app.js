const dotenv = require('dotenv'); dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require("helmet");
const node2fa = require('node-2fa');
const database = require('./config/database');
const RabbitConnection = require("./config/amqplib");
const bcrypt = require("bcrypt");
RabbitConnection.connect();
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
const AuthController = require('./controllers/AuthController');
const UsersModel = require('./models/UsersModel');
const EHRAuthController = require('./controllers/EHRAuthController');

// public
app.post('/api/auth/login', AuthController.login);
app.post('/api/auth/logout', AuthController.logout);
app.post('/api/auth/verify-2fa', AuthController.verify_2fa);
app.post('/api/auth/enable-2fa', auth.requireAuth, AuthController.enable_2fa);
app.post('/api/auth/disable-2fa', auth.requireAuth, AuthController.disable_2fa);
app.post('/api/auth/forgot-password', AuthController.forgot_password);
app.post('/api/auth/reset-password', AuthController.reset_password);
app.post('/api/auth/activate', AuthController.activate);

app.get ('/api/auth/authorisations', auth.requireAuth, EHRAuthController.getAuths);
app.get ('/api/auth/authorisations/authorisations_hopital', auth.requireAuth, EHRAuthController.getHospitalAuths)
app.post('/api/auth/authorisations', auth.requireAuth, EHRAuthController.authorize);
app.post('/api/auth/authorisations/isAuthorized', auth.requireAuth, EHRAuthController.isAuthorized);
app.post('/api/auth/authorisations/expire', auth.requireAuth, EHRAuthController.expire);
app.post('/api/auth/authorisations/:id/expire', auth.requireAuth, EHRAuthController.expireByID);
app.post('/api/auth/authorisations/:id/validate', auth.requireAuth, EHRAuthController.validate);


// RabitMQ
RabbitConnection.on("account_create", async (data) =>{
  const { NIN, role, email } = data;
  if (!await UsersModel.selectByNIN(NIN)){
    const two_factor_secret = node2fa.generateSecret().secret;
    const password = Math.random().toString(36).slice(2, 10);
    await UsersModel.insert(NIN, bcrypt.hashSync(password, 10), role, two_factor_secret);
    console.log(`NIN: ${NIN}, password: ${password}`);
    //await AuthController.send_activation_email(NIN, email);
  }
})

app.use((req, res) => res.sendStatus(404))

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.info('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;