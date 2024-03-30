const Model = require('../models/NotificationModel');
const fs = require('fs')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const logger = require('../utils/logger')

/******** CONSTANTS ********/
const NOTIF_TITLES = {
    'EHR_ACCESS': 'EHR Access',
}
const NOTIF_SUMMARIES = {
    'EHR_ACCESS': '${doctor} has accessed your EHR',
}

/******** ACTIONS ********/
// Private routes, notify
async function notify(req, res) {
    const { NIN, email, telephone, type, data } = req.body
    try {
        // Insert
        const title = format(NOTIF_TITLES[type], data)
        const summary = format(NOTIF_SUMMARIES[type], data)
        await Model.insert(type, NIN, email, telephone, title, summary, data)
        // Send
        if(email){
            const emailText = format(fs.readFileSync(require.resolve(`../templates/email/${type}.txt`)).toString(), data);
            const emailBody = format(fs.readFileSync(require.resolve(`../templates/email/${type}.html`)).toString(), data);
            await sendEmail(to, title, emailText, emailBody)
        }
        if(telephone) await sendSMS(to, summary)

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
async function sendEmail(to, title, textBody, emailBody) {
    var message = {
        from: process.env.GMAIL_USERNAME,
        to: to,
        subject: title,
        text: textBody,
        html: emailBody
    };
    email_client.sendMail(message, (err) => {
        if (err)
            return logger.error(err);
    });
}

// send SMS
async function sendSMS(to, body) {
    await twilio_client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
        body: body
    }).catch((err)=>{
        logger.error(err);
    });
}

// format string
function format(format, data){
    return String(format).replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()] || match);
}