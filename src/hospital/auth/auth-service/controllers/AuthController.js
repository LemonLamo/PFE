const Model = require('../models/AuthModel');
const validator = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const communication = require('../utils/communication');
const node2fa = require('node-2fa');

/******** CONFIG ********/
const JWT_OPTIONS = { algorithm: process.env.JWT_ALGORITHM }
const COOKIES_OPTIONS = { httpOnly: true, maxAge: 3600000 }

/******** ACTIONS ********/
async function login (req, res){
    const {NIN , password} = req.body
    const user = await Model.selectByNIN(NIN)
    const login_match = user && await bcrypt.compare(password, user.password)

    if (!login_match)
        return res.status(400).json({
            errorCode: "unauthorized.wrong-credentials",
            errorMessage: "Wrong NIN or password"
        });
    
    // Check for two factor auth
    if (!user.two_factor_enabled){
        const jwt = setUpJWT(user);
        res.cookie('jwt', jwt, COOKIES_OPTIONS)
        return res.status(200).json({jwt: jwt});
    }else{
        const token = node2fa.generateToken(user.two_factor_secret).token;
        communication.sendEmail(user.email, 'TWO_FACTOR_TOKEN', { to: user.email, two_factor_token: token })
        communication.sendSMS(user.phoneNumber, 'TWO_FACTOR_TOKEN', { to: user.phoneNumber, two_factor_token: token })
        return res.status(200).json({
            successCode: "login.2fa-code",
            successMessage: "Please enter 2FA code"
        });
    }
}
function setUpJWT(user) {
    const permissions = [] // TODO: Add permissions fetch
    const payload = { NIN: user.NIN, permissions: permissions }
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, JWT_OPTIONS)
}

async function logout (req, res){
    res.clearCookie("jwt");
    return res.status(200).json({
        successCode: "logout",
        successMessage: "Successfully logged out!"
    })
}

async function signup(req, res) {
    let { NIN, email, password} = req.body

    validator.validate(req, res, Model.validationRules)
    password = await bcrypt.hash(req.body.password, 10);
    const two_factor_secret = node2fa.generateSecret().secret;
    let result = Model.insert(NIN, email, password, two_factor_secret)
    await send_email_verification(user);

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "database-error", errorMessage: "Contact developer" });
}

// Email verification
async function verify_email_request(req, res){
    const NIN = req.body.NIN
    const user = await Model.selectByNIN(NIN)

    if(!user)
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });

    // Generate verification_token
    const email_verify_token_hash = await send_email_verification(user);
    await Model.saveVerificationToken(NIN, email_verify_token_hash);
    
    // Respond
    return res.status(200).json({
        sucessCode: "verify-email.requested",
        successMessage: "A verification link was sent to the email address associated in our database."
    })
}
async function send_email_verification(user){
    const email_verify_token = crypto.randomBytes(32).toString("hex");
    const email_verify_token_hash = await bcrypt.hash(email_verify_token, 10);
    const email_data = {
        BASE_URL: process.env.BASE_URL,
        NIN: user.NIN,
        to: user.email,
        verify_token: email_verify_token
    }
    await communication.sendEmail(user.email, 'VERIFY_EMAIL', email_data)
    return email_verify_token_hash;
}
async function verify_email(req, res){
    const { NIN, verify_token } = req.query
    const user = await Model.selectByNIN(NIN)
    
    if (!user)
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });

    if (!user.email_verify_token || !await bcrypt.compare(verify_token, user.email_verify_token))
        return res.status(400).json({
            errorCode: "unauthorized.missing-auth",
            errorMessage: "Invalid verification token"
        });

    await Model.verifyEmail(NIN)

    // Respond
    return res.status(200).json({
        sucessCode: "verify-email.verified",
        successMessage: "Your email was verified."
    })
}

// 2FA verification
async function verify_2fa (req, res){
    const { NIN, token } = req.body
    const user = await Model.selectByNIN(NIN)
    if(!user)
        return res.status(200).json({
            errorCode: "unauthorized.wrong-user",
            errorMessage: "Wrong user credentials."
        });

    const two_factor_match = node2fa.verifyToken(user.two_factor_secret, token)
    if (two_factor_match?.delta != 0)
        return res.status(200).json({
            errorCode: "unauthorized.wrong-2fa",
            errorMessage: "Wrong 2FA token."
        });

    const jwt = setUpJWT(user);
    res.cookie('jwt', jwt, COOKIES_OPTIONS);
    return res.status(200).json({ jwt: jwt })
}
async function enable_2fa(req, res){
    const NIN = req.jwt.NIN;
    const password = req.body.password;

    const user = await Model.selectByNIN(NIN)
    const login_match = user && await bcrypt.compare(password, user.password)

    if (!login_match)
        return res.status(200).json({
            errorCode: "unauthorized.wrong-user",
            errorMessage: "Wrong user credentials."
        })

    const result = Model.enable2FA(NIN)

    // Respond
    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "database-error", errorMessage: "Contact developer" });
}
async function disable_2fa (req, res){
    const NIN = req.jwt.NIN;
    const password = req.body.password;
    
    const user = await Model.selectByNIN(NIN)
    const login_match = user && await bcrypt.compare(password, user.password)

    if (!login_match)
        return res.status(200).json({
            errorCode: "unauthorized.wrong-user",
            errorMessage: "Wrong user credentials."
        })
    
    const result = Model.disable2FA(NIN)

    // Respond
    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "database-error", errorMessage: "Contact developer" });
}


// Forgot password
async function forgot_password (req, res){
    const { NIN } = req.body
    const user = await Model.selectByNIN(NIN)
    
    if (!user)
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });

    // Generate & Send reset token
    const reset_token = crypto.randomBytes(32).toString("hex");
    const reset_token_hash = await bcrypt.hash(reset_token, 10);
    await Model.setResetToken(NIN, reset_token_hash);
    
    const email_data = {
        BASE_URL: process.env.BASE_URL,
        NIN: NIN,
        to: user.email,
        reset_token: reset_token
    }
    await communication.sendEmail(user.email, 'RESET_PASSWORD', email_data)

    // Respond
    return res.status(200).json({
        sucessCode: "forgot-password.requested",
        successMessage: "A password reset link was sent to the email address associated in our database."
    })
}
async function reset_password(req, res){
    const { NIN, reset_token, password } = req.body
    const user = await Model.selectByNIN(NIN)

    if (!user)
        return res.status(400).json({
            errorCode: "unauthorized.no-account",
            errorMessage: "No account is associated with this email."
        });

    if (!user.reset_token || !await bcrypt.compare(reset_token, user.reset_token))
        return res.status(400).json({
            errorCode: "unauthorized.missing-auth",
            errorMessage: "Invalid reset token"
        });

    const hashedPassword = await bcrypt.hash(password, 10)
    await Model.resetPassword(NIN, hashedPassword)

    // Respond
    return res.status(200).json({
        sucessCode: "forgot-password.reset",
        successMessage: "Your password was reset."
    })
}

/******** EXPORTS ********/
module.exports = {
    login,
    logout,
    signup,
    verify_email_request,
    verify_email,
    verify_2fa,
    enable_2fa,
    disable_2fa,
    forgot_password,
    reset_password
}