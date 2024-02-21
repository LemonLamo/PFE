const jwt = require('jsonwebtoken');
// Note: you can give out token using: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h', });.

// Verify if a jwt token is valid
exports.verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.status(401).json({ errorCode: "unauthorized.missing-auth", errorMessage: "Missing authentication header." });

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
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