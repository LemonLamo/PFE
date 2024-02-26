const Model = require('../models/AuthModel');
const validator = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const node2fa = require('node-2fa');

/******** CONFIG ********/
const JWT_OPTIONS = {
    algorithm: "ES256"
}
const COOKIES_OPTIONS = {
    httpOnly: true,
    maxAge: 3600000
}

/******** ACTIONS ********/
// Basic login, logout, signup
exports.login = async (req, res) => {
    const {NIN , password} = req.body
    const user = await Model.selectByNIN(NIN)
    const login_match = user && await bcrypt.compare(password, user.password)

    if (login_match){
        if (user.two_factor_enabled){
            const token = node2fa.generateToken(user.two_factor_secret).token;
            //TODO: Send email/sms with 'token' and remove 'token' from reply
            return res.status(200).json({
                token: token,
                successCode: "login.2fa-code",
                successMessage: "Please enter 2FA code"
            });
        }
        const permissions = [] // TODO: Add permissions fetch
        const payload = {NIN, permissions}
        const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, JWT_OPTIONS)
        return res.cookie('jwt', token, COOKIES_OPTIONS).status(200).json(token)
    }else{
        return res.status(400).json({
            errorCode: "unauthorized.wrong-credentials",
            errorMessage: "Wrong NIN or password"
        });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    return res.status(200).json({
        successCode: "logout",
        successMessage: "Successfully logged out!"
    })
}

exports.signup = async (req, res) => {
    let { NIN, email, password} = req.body
    
    validator.validate(req, res, Model.validationRules)
    password = await bcrypt.hash(req.body.password, 10);
    let result = Model.insert(NIN, email, password)

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
}


// TODO: Email verification
exports.verify_email_request = async (req, res) =>{
    
}
exports.verify_email = async (req, res) => {
    
}


// 2FA verification
exports.verify_2fa = async (req, res) => {
    const { NIN, token } = req.body
    const user = await Model.selectByNIN(NIN)
    if(user){
        const two_factor_match = node2fa.verifyToken(user.two_factor_secret, token)
        if (two_factor_match?.delta == 0){
            const permissions = [] // TODO: Add permissions fetch (2)
            const payload = { NIN, permissions }
            const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, JWT_OPTIONS)
            return res.cookie('jwt', token, COOKIES_OPTIONS).status(200).json(token)
        }else{
            return res.status(200).json({
                errorCode: "unauthorized.wrong-2fa",
                errorMessage: "Wrong 2FA token."
            })
        }
    }else{
        return res.status(200).json({
            errorCode: "unauthorized.wrong-user",
            errorMessage: "Wrong user credentials."
        })
    }
}
exports.enable_2fa = async (req, res) => {
    const { NIN, password } = req.body
    const login_match = user && await bcrypt.compare(password, user.password)

    if (login_match) {
        const two_factor_secret = node2fa.generateSecret()
        const result = Model.enable2FA(NIN, two_factor_secret.secret)

        return result ?
            res.status(200).json(result) :
            res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
    }else{
        return res.status(200).json({
            errorCode: "unauthorized.wrong-user",
            errorMessage: "Wrong user credentials."
        })
    }
}
exports.disable_2fa = async (req, res) => {
    const { NIN, password } = req.body
    const login_match = user && await bcrypt.compare(password, user.password)

    if (login_match) {
        const result = Model.disable2FA(NIN)

        return result ?
            res.status(200).json(result) :
            res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
    }else{
        return res.status(200).json({
            errorCode: "unauthorized.wrong-user",
            errorMessage: "Wrong user credentials."
        })
    }
}


// Forgot password
exports.forgot_password = async (req, res) => {
    const { NIN } = req.body
    const user = await Model.selectByNIN(NIN)
    
    if (user){
        const reset_token = crypto.randomBytes(32).toString("hex");
        const reset_token_hash = await bcrypt.hash(reset_token, 10);

        await Model.setResetToken(NIN, reset_token_hash);
        //TODO: Send email with 'reset_token' and remove 'reset_token' from reply

        return res.status(200).json({
            reset_token: reset_token,
            sucessCode: "forgot-password.requested",
            successMessage: "A password reset link was sent to the email address associated in our database."
        })
    }else{
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });
    }
}
exports.reset_password = async (req, res) => {
    const { NIN, reset_token, password } = req.body
    const user = await Model.selectByNIN(NIN)

    if (user) {
        if (user.reset_token && await bcrypt.compare(reset_token, user.reset_token)){
            const hashedPassword = await bcrypt.hash(password, 10)
            await Model.resetPassword(NIN, hashedPassword)
            return res.status(200).json({
                sucessCode: "forgot-password.reset",
                successMessage: "Your password was reset."
            })
        }else{
            return res.status(400).json({
                errorCode: "unauthorized.missing-auth",
                errorMessage: "Invalid reset token"
            });
        }
    } else {
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });
    }
}

// TODO: Debug route, remove in prod
exports.checkJWT = async (req, res) => {
    const token = req.cookies.jwt
    if (token == null)
        return res.status(401).json({ errorCode: "unauthorized.missing-auth", errorMessage: "Missing authentication header." });

    jwt.verify(token, process.env.JWT_PUBLIC_KEY, (err, payload) => {
        if (err)
            return res.status(403).json({ errorCode: "unauthorized.invalid-jwt-token", errorMessage: "Invalid JWT token." })
        else
            return res.status(200).json(payload)
    })
}