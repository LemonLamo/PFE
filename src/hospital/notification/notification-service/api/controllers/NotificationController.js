const Model = require('../models/NotificationModel');
const validator = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const stringUtils = require('../../utils/strings');
const { randomUUID } = require('crypto');

/******** CONSTANTS ********/
const NOTIF_TITLES = {
    'EHR_ACCESS': 'MedicaLife : ${doctor} has accessed your EHR',
}

/******** ACTIONS ********/
// Private routes, notify
exports.notify = async (req, res) => {
    const NIN = "100010364027390000"
    const { notification_type, notifiable_type, to, data } = req.body

    if (notifiable_type == 'sms')
        await sendSMS(to, notification_type, data)
    else if (notifiable_type == 'push-notification')
        await sendPushNotification(to, notification_type, data)
    else
        await sendEmail(to, notification_type, data)

    // insert into database
    let result = await Model.insert(randomUUID(), notification_type, NIN, notifiable_type, to, JSON.stringify(data))
    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
}

exports.notifications = async (req, res) => {
    const { NIN } = req.body
    let result = await Model.selectByNIN(NIN)

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
}

exports.mark_as_read = async (req, res) => {
    const { id } = req.params
    let result = await Model.mark_as_read(id)

    return result ?
        res.status(200).json(result) :
        res.status(400).json({ errorCode: "unhandled-error", errorMessage: "Contact developer" });
}

/***** CODE *****/
const email_client = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});
const twilio_client = twilio(process.env.TWILIO_AUTH_SID, process.env.TWILIO_AUTH_TOKEN);

// send email
async function sendEmail(to, type, data) {
    const emailText = stringUtils.format(fs.readFileSync(require.resolve(`../../templates/email/${type}.txt`)).toString(), data);
    const emailBody = stringUtils.format(fs.readFileSync(require.resolve(`../../templates/email/${type}.html`)).toString(), data);

    var message = {
        from: process.env.GMAIL_USERNAME,
        to: to,
        subject: stringUtils.format(NOTIF_TITLES[type], data),
        text: emailText,
        html: emailBody
    };
    email_client.sendMail(message, (err, info) => {
        if (err)
            return console.error(err);
        console.log('Email sent correctly to ' + to);
    });
}

// sendPushNotification
async function sendPushNotification(to, type, data) {
    //TODO: Implement push notifications
}

// send SMS
async function sendSMS(to, type, data) {
    const smsText = stringUtils.format(fs.readFileSync(require.resolve(`../../templates/sms/${type}.txt`)), data);
    await twilio_client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
        body: smsText
    });
    console.log('SMS sent correctly to ' + to);
}