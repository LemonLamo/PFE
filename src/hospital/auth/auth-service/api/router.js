const express = require('express');
const router = express.Router();

/******** CONTROLLERS ********/
const AuthController = require('./controllers/AuthController');

/******** ROUTES ********/
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/logout', AuthController.logout);
router.post('/api/auth/signup', AuthController.signup);
router.post('/api/auth/forgot-password', AuthController.forgot_password);
router.post('/api/auth/reset-password', AuthController.reset_password);
router.post('/api/auth/checkJWT', AuthController.checkJWT);

module.exports = router;