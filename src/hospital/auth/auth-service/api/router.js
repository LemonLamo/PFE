const express = require('express');
const router = express.Router();

/******** CONTROLLERS ********/
const AuthController = require('./controllers/AuthController');

/******** ROUTES ********/
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/logout', AuthController.logout);
router.post('/api/auth/signup', AuthController.signup);

router.get ('/api/auth/verify-email-request', AuthController.verify_email_request);
router.get ('/api/auth/verify-email', AuthController.verify_email);

router.post('/api/auth/verify-2fa', AuthController.verify_2fa);
router.post('/api/auth/enable-2fa', AuthController.enable_2fa);
router.post('/api/auth/disable-2fa', AuthController.disable_2fa);

router.post('/api/auth/forgot-password', AuthController.forgot_password);
router.post('/api/auth/reset-password', AuthController.reset_password);

router.post('/api/auth/checkJWT', AuthController.checkJWT);

module.exports = router;