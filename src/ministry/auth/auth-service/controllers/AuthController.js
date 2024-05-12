const UsersModel = require("../models/UsersModel");
const validator = require("../middlewares/validation");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const communication = require("../utils/communication");
const node2fa = require("node-2fa");
const axios = require("axios");

class AuthController {
  login = async (req, res) => {
    const { NIN, password, type } = req.body;
    const user = await UsersModel.selectByNIN(NIN);
    const login_match =
      user.password && (await bcrypt.compare(password, user.password));

    if (!login_match)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.wrong-credentials",
          errorMessage: "Wrong NIN or password",
        });

    const profile =
      type === "patient"
        ? (await axios.get(`http://patients-service/private/patients/${NIN}`))
            .data
        : (await axios.get(`http://personnel-service/private/personnel/${NIN}`))
            .data;

    if (!user.is_active) {
      this.send_activation_email(user, profile.email);
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.inactive-account",
          errorMessage: "Account is inactive, Please activate",
        });
    }

    // Check for two factor auth
    if (!user.two_factor_enabled) {
      const nom = profile.nom;
      const prenom = profile.prenom;
      if (type !== "patient") {
        const specialite = profile.specialite;
        const hopital = profile.hopital;
        const service = profile.service;
        const role = user.role;
        const permissions = UsersModel.getPermissions(hopital, role);
        const jwt = this.setUpJWT({
          NIN,
          nom,
          prenom,
          specialite,
          hopital,
          service,
          role,
          permissions,
        });
        return res.status(200).json(jwt);
      } else {
        const jwt = this.setUpJWT({ NIN, nom, prenom });
        return res.status(200).json(jwt);
      }
    } else {
      const token = node2fa.generateToken(user.two_factor_secret).token;
      communication.sendEmail(profile.email, "TWO_FACTOR_TOKEN", {
        to: profile.email,
        two_factor_token: token,
      });
      communication.sendSMS(profile.phoneNumber, "TWO_FACTOR_TOKEN", {
        to: profile.phoneNumber,
        two_factor_token: token,
      });
      return res
        .status(200)
        .json({
          successCode: "login.2fa-code",
          successMessage: "Please enter 2FA code",
        });
    }
  };

  logout = async (req, res) => {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({
        successCode: "logout",
        successMessage: "Successfully logged out!",
      });
  };

  signup = async (req, res) => {
    let { NIN, role, email } = req.body;

    validator.validate(req, res, UsersModel.validationRules);
    const two_factor_secret = node2fa.generateSecret().secret;
    try {
      await UsersModel.insert(NIN, role, two_factor_secret);
      await this.send_activation_email(NIN, email);

      return res.status(200).json({ success: true });
    } catch (err) {
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  };

  activate = async (req, res) => {
    const { NIN, verify_token } = req.query;
    const user = await UsersModel.selectByNIN(NIN);

    if (!user)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.no-user",
          errorMessage: "No account is associated with this NIN.",
        });

    if (
      !user.verify_token ||
      !(await bcrypt.compare(verify_token, user.verify_token))
    )
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.missing-auth",
          errorMessage: "Invalid verification token",
        });

    try {
      await UsersModel.activate(NIN);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  };

  // 2FA verification
  verify_2fa = async (req, res) => {
    const { NIN, type, token } = req.body;
    const user = await UsersModel.selectByNIN(NIN);
    if (!user)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.no-user",
          errorMessage: "Wrong user credentials.",
        });

    const two_factor_match = node2fa.verifyToken(user.two_factor_secret, token);
    if (two_factor_match?.delta != 0)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.2fa-expired",
          errorMessage:
            "This 2FA token is either invalid or has expired. Please try again",
        });

    const profile =
      type === "patient"
        ? (await axios.get(`http://patients-service/private/patients/${NIN}`))
            .data
        : (await axios.get(`http://personnel-service/private/personnel/${NIN}`))
            .data;

    const nom = profile.nom;
    const prenom = profile.prenom;
    if (type !== "patient") {
      const specialite = profile.specialite;
      const hopital = profile.hopital;
      const service = profile.service;
      const role = user.role;
      const permissions = UsersModel.getPermissions(hopital, role);
      const jwt = this.setUpJWT({
        NIN,
        nom,
        prenom,
        specialite,
        hopital,
        service,
        role,
        permissions,
      });
      return res.status(200).json(jwt);
    } else {
      const jwt = this.setUpJWT({ NIN, nom, prenom });
      return res.status(200).json(jwt);
    }
  };
  enable_2fa = async (req, res) => {
    const NIN = req.jwt.NIN;
    const password = req.body.password;

    const user = await UsersModel.selectByNIN(NIN);
    const login_match = user && (await bcrypt.compare(password, user.password));

    if (!login_match)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.wrong-user",
          errorMessage: "Wrong user credentials.",
        });

    try {
      await UsersModel.enable2FA(NIN);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  };
  disable_2fa = async (req, res) => {
    const NIN = req.jwt.NIN;
    const password = req.body.password;

    const user = await UsersModel.selectByNIN(NIN);
    const login_match = user && (await bcrypt.compare(password, user.password));

    if (!login_match)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.wrong-user",
          errorMessage: "Wrong user credentials.",
        });

    try {
      await UsersModel.disable2FA(NIN);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  };

  // Forgot password
  forgot_password = async (req, res) => {
    const { NIN, type } = req.body;
    const user = await UsersModel.selectByNIN(NIN);

    const profile =
      type === "personnel"
        ? (await axios.get(`http://personnel-service/private/personnel/${NIN}`))
            .data
        : (await axios.get(`http://patients-service/private/patients/${NIN}`))
            .data;

    if (!user)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.no-account",
          errorMessage: "No account is associated with this email.",
        });

    // Generate & Send reset token
    try {
      const reset_token = crypto.randomBytes(32).toString("hex");
      const reset_token_hash = await bcrypt.hash(reset_token, 10);
      await UsersModel.setResetToken(NIN, reset_token_hash);

      const email_data = {
        BASE_URL: process.env.BASE_URL,
        NIN: NIN,
        to: profile.email,
        reset_token: reset_token,
      };
      await communication.sendEmail(
        profile.email,
        "RESET_PASSWORD",
        email_data
      );
      return res.status(200).json({ success: true });
    } catch (err) {
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  };
  reset_password = async (req, res) => {
    const { NIN, reset_token, password } = req.body;
    const user = await UsersModel.selectByNIN(NIN);

    if (!user)
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.no-account",
          errorMessage: "No account is associated with this email.",
        });

    if (
      !user.reset_token ||
      !(await bcrypt.compare(reset_token, user.reset_token))
    )
      return res
        .status(400)
        .json({
          errorCode: "unauthorized.missing-auth",
          errorMessage: "Invalid reset token",
        });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UsersModel.resetPassword(NIN, hashedPassword);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res
        .status(400)
        .json({ errorCode: "database-error", errorMessage: err.code });
    }
  };
  setUpJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      algorithm: process.env.JWT_ALGORITHM,
    });
    return token;
  };
  send_activation_email = async (NIN, email) => {
    const verify_token = crypto.randomBytes(32).toString("hex");
    const verify_token_hash = await bcrypt.hash(verify_token, 10);
    const email_data = {
      BASE_URL: process.env.BASE_URL,
      NIN: NIN,
      to: email,
      verify_token: verify_token,
    };
    await communication.sendEmail(email, "VERIFY_EMAIL", email_data);
    return verify_token_hash;
  };
}

/******** EXPORTS ********/
module.exports = new AuthController();
