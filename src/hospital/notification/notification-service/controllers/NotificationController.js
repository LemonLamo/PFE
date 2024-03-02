const Model = require('../models/NotificationModel');
const fs = require('fs')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const { randomUUID } = require('crypto');

/******** CONSTANTS ********/
const NOTIF_TITLES = {
    'EHR_ACCESS': 'MedicaLife : ${doctor} has accessed your EHR',
}

/******** ACTIONS ********/
// Private routes, notify
async function notify(req, res) {
    const NIN = "100010364027390000"
    const { notification_type, notifiable_type, to, data } = req.body

    try {
        // Insert
        await Model.insert(randomUUID(), notification_type, NIN, notifiable_type, to, JSON.stringify(data))
        // Send
        if (notifiable_type == 'sms')
            await sendSMS(to, notification_type, data)
        else if (notifiable_type == 'push-notification')
            await sendPushNotification(to, notification_type, data)
        else
            await sendEmail(to, notification_type, data)
        // Respond
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
}

async function notifications(req, res){
    const NIN = req.jwt.NIN;
    let result = await Model.selectByNIN(NIN)
    return res.status(200).json(result)
}

async function mark_as_read(req, res){
    const NIN = req.jwt.NIN;
    const { id } = req.params
    const notif = await Model.selectByID(id);
    
    if (!notif || notif.notifiable_id != NIN)
        return res.status(400).json({
            errorCode: "not-found",
            errorMessage: "Notification not found."
        });

        
    try {
        await Model.mark_as_read(id)
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ errorCode: "database-error", errorMessage: err.code });
    }
}
/******** EXPORTS ********/
module.exports = {
    notify,
    notifications,
    mark_as_read,
}

/***** Utility *****/
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
    const emailText = format(fs.readFileSync(require.resolve(`../templates/email/${type}.txt`)).toString(), data);
    const emailBody = format(fs.readFileSync(require.resolve(`../templates/email/${type}.html`)).toString(), data);

    var message = {
        from: process.env.GMAIL_USERNAME,
        to: to,
        subject: format(NOTIF_TITLES[type], data),
        text: emailText,
        html: emailBody
    };
    email_client.sendMail(message, (err) => {
        if (err)
            return console.error(err);
    });
}

// sendPushNotification
async function sendPushNotification(to, type, data) {
    //TODO: Implement push notifications
}

// send SMS
async function sendSMS(to, type, data) {
    const smsText = format(fs.readFileSync(require.resolve(`../templates/sms/${type}.txt`)).toString(), data);
    await twilio_client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
        body: smsText
    }).catch((err)=>{
        console.error(err);
    });
}

// format string
function format(format, data){
    return String(format).replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()] || match);
}