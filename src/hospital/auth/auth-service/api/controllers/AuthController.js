const Model = require('../models/AuthModel');
const validator = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const communication = require('../../utils/communication');
const node2fa = require('node-2fa');

/******** CONFIG ********/
const JWT_OPTIONS = {
    algorithm: process.env.JWT_ALGORITHM
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
            // Generate & Send 2FA Token
            const token = node2fa.generateToken(user.two_factor_secret).token;
            if (user.email)
                communication.sendEmail(user.email, 'TWO_FACTOR_TOKEN', {to: user.email, two_factor_token: token})

            if (user.phoneNumber)
                communication.sendSMS(user.phoneNumber, 'TWO_FACTOR_TOKEN', { to: user.phoneNumber, two_factor_token: token })

            return res.status(200).json({
                successCode: "login.2fa-code",
                successMessage: "Please enter 2FA code"
            });
        }else{
            const permissions = [] // TODO: Add permissions fetch
            const payload = {NIN, permissions}
            const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, JWT_OPTIONS)
            return res.cookie('jwt', token, COOKIES_OPTIONS).status(200).json(token)
        }
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

// Email verification
exports.verify_email_request = async (req, res) =>{
    let { NIN } = req.body
    const user = await Model.selectByNIN(NIN)
    if(user){
        const email_verify_token = crypto.randomBytes(32).toString("hex");
        const email_verify_token_hash = await bcrypt.hash(email_verify_token, 10);
    
        await Model.setVerifyToken(NIN, email_verify_token_hash);

        if (user.email){
            const email_data = {
                BASE_URL: process.env.BASE_URL,
                NIN: NIN,
                to: user.email,
                verify_token: email_verify_token
            }
            await communication.sendEmail(user.email, 'VERIFY_EMAIL', email_data)
        }
    
        return res.status(200).json({
            sucessCode: "verify-email.requested",
            successMessage: "A verification link was sent to the email address associated in our database."
        })
    }else{
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });
    }
}
exports.verify_email = async (req, res) => {
    const { NIN, verify_token } = req.query
    const user = await Model.selectByNIN(NIN)
    
    if (user) {
        if (user.email_verify_token && await bcrypt.compare(verify_token, user.email_verify_token)) {
            await Model.verifyEmail(NIN)
            return res.status(200).json({
                sucessCode: "verify-email.verified",
                successMessage: "Your email was verified."
            })
        } else {
            return res.status(400).json({
                errorCode: "unauthorized.missing-auth",
                errorMessage: "Invalid verification token"
            });
        }
    } else {
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });
    }
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
    const user = await Model.selectByNIN(NIN)
    const login_match = user && await bcrypt.compare(password, user.password)

    if (login_match) {
        const two_factor_secret = node2fa.generateSecret().secret
        const result = Model.enable2FA(NIN, two_factor_secret)

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
    const user = await Model.selectByNIN(NIN)
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
        if (user.email) {
            const email_data = {
                BASE_URL: process.env.BASE_URL,
                NIN: NIN,
                to: user.email,
                reset_token: reset_token
            }
            await communication.sendEmail(user.email, 'RESET_PASSWORD', email_data)
        }

        return res.status(200).json({
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