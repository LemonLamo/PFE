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
const AuthController = require('./controllers/AuthController');

app.post('/api/auth/login', AuthController.login);
app.post('/api/auth/verify-2fa', AuthController.verify_2fa);
app.post('/api/auth/logout', AuthController.logout);
app.post('/api/auth/signup', AuthController.signup);

app.post('/api/auth/verify-email-request', AuthController.verify_email_request);
app.get('/api/auth/verify-email', AuthController.verify_email);

app.post('/api/auth/forgot-password', AuthController.forgot_password);
app.post('/api/auth/reset-password', AuthController.reset_password);

app.post('/api/auth/enable-2fa', auth.requireAuth, AuthController.enable_2fa);
app.post('/api/auth/disable-2fa', auth.requireAuth, AuthController.disable_2fa);
app.use((req, res) => res.sendStatus(404))

// start server
app.listen(8080, () => console.log(`[SERVER] Listening on port ${8080}`));

module.exports = app;