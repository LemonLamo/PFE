const fs = require('fs');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

/******** CONSTANTS ********/
const NOTIF_TITLES = {
    'TWO_FACTOR_TOKEN': 'MedicaLife : Access from new device',
    'VERIFY_EMAIL': 'MedicaLife : Account verification',
    'RESET_PASSWORD': 'MedicaLife : Password reset request',
}

// INIT
const email_client = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});
const twilio_client = twilio(process.env.TWILIO_AUTH_SID, process.env.TWILIO_AUTH_TOKEN);

// UTILS
function format(format, data) {
    return String(format).replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()] || match);
};

// send email
exports.sendEmail = async (to, type, data) => {
    const body = format(fs.readFileSync(require.resolve(`../views/email/${type}.html`)).toString(), data);

    var message = {
        from: process.env.GMAIL_USERNAME,
        to: to,
        subject: format(NOTIF_TITLES[type], data),
        html: body
    };
    email_client.sendMail(message, (err, info) => {
        if (err)
            return console.error(err);
    });
}

// send SMS
exports.sendSMS = async (to, type, data) => {
    const smsText = format(fs.readFileSync(require.resolve(`../views/sms/${type}.txt`)).toString(), data);
    await twilio_client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
        body: smsText
    }).catch ((err) => {
        console.error(err);
    });
}