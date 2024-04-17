const Model = require('../models/NotificationModel');
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const logger = require('../utils/logger')

const email_client = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});
const twilio_client = twilio(process.env.TWILIO_AUTH_SID, process.env.TWILIO_AUTH_TOKEN);

/******** ACTIONS ********/
class NotificationController{
    notifications = async (req, res) => {
        const { NIN, role } = req.jwt;
        let result = (role === undefined)?
            await Model.selectPatientNotifsByNIN(NIN):
            await Model.selectPersonnelNotifsByNIN(NIN)
        return res.status(200).json(result)
    }

    // mark as read
    mark_as_read = async (req, res) => {
        const { NIN } = req.jwt;
        const { id } = req.params
        const notif = await Model.selectByID(id);
        
        if (!notif || notif.NIN != NIN)
            return res.status(400).json();

        try {
            await Model.mark_as_read(id)
            return res.status(200).json({ success: true })
        } catch (err) {
            return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
        }
    }
    
    // send Email
    sendEmail = async (to, textBody, emailBody) => {
        var message = {
            from: process.env.GMAIL_USERNAME,
            to: to,
            subject: "MeidcaLife: " + textBody,
            text: textBody,
            html: emailBody
        };
        email_client.sendMail(message, (err) => {
            if (err)
                return logger.error(err);
        });
    }

    // send SMS
    sendSMS = async (to, body) => {
        await twilio_client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
            body: body
        }).catch((err)=>{
            logger.error(err);
        });
    }
}

/******** EXPORTS ********/
module.exports = new NotificationController();