const jwt = require('jsonwebtoken');
const axios = require('axios');
const logger = require('../utils/logger');

// Verify if a jwt token is valid
exports.requireAuth = async (req, res, next) => {
    const token = req.header("Authorization") && req.header("Authorization").split(' ')[1]

    if (token == null)
        return res.status(401).json({ errorCode: "unauthorized.missing-auth", errorMessage: "Missing authentication header." });

    jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithm: process.env.JWT_ALGORITHM }, (err, payload) => {
        if (err)
            return res.status(403).json({ errorCode: "unauthorized.invalid-jwt-token", errorMessage: "Invalid JWT token." })

        req.jwt = payload
        next()
    })
}

// Verify if a jwt token contains a certain permission
exports.hasPriv = (privs) => async (req, res, next) => {
    for (let priv of privs)
        if (!req.jwt.permissions.includes(priv))
            return res.status(400).json({ errorCode: `unauthorized.missing-permission:${priv}`, errorMessage: `You need permission '${priv}'.` });

    next()
}

exports.verifyEHRAuth = async (req, res, next) =>{
    try{
        const medecin = req.jwt.NIN;
        const patient = req.params.NIN;
        if(req.jwt.role == "medecin"){
            await axios.post("http://auth-service/isAuthorized", {medecin, patient}, { headers: { Authorization: req.headers.authorization } });
            next();
        }else
            next();
    }catch(err){
        return res.status(401).json({ errorCode: `unauthorized`, errorMessage: `Vous n'êtes pas autorisé pour voir ce dossier médical.` });
    }
    
}