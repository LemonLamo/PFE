const express = require('express');
const router = express.Router();

/******** MIDDLEWARES ********/
const auth = require('../middlewares/auth');

/******** ROUTES ********/
router.use('/', verifyhasprivilege(), async(req, res)=>{
    let context = {
        patients: [
            { nom: "brahim", prenom: "abderrazak" },
            { nom: "brahim2", prenom: "abderrazak2" },
            { nom: "brahim3", prenom: "abderrazak3" },
        ]
    }
    res.render('index', context)
});

module.exports = router;