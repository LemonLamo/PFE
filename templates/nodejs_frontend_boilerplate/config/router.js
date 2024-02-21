const express = require('express');
const router = express.Router();

/******** MIDDLEWARES ********/
const auth = require('../middlewares/auth');

/******** ROUTES ********/
router.use('/', async(req, res)=>{
    res.render('index')
});

module.exports = router;