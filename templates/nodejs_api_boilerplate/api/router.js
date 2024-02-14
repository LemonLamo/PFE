const express = require('express');
const router = express.Router();

/******** MIDDLEWARES ********/
const auth = require('./middlewares/auth');

/******** CONTROLLERS ********/
const WilayasController = require('./controllers/WilayasController');

/******** ROUTES ********/
router.use('/wilayas', WilayasController);

module.exports = router;