const dotenv = require('dotenv'); dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const helmet = require("helmet");
const database = require('./config/database');
const RabbitConnection = require("./config/amqplib");
RabbitConnection.connect();
const app = express();

// database connection
database.connect()

// configure express app
app.set('trust proxy', 1) // trust first proxy
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require('./middlewares/auth')
const logger = require('./utils/logger')
const NotificationController = require('./controllers/NotificationController');
const NotificationModel = require('./models/NotificationModel');
const { format } = require('./utils/strings');

// public
app.get ('/api/notifications/', auth.requireAuth, NotificationController.notifications);
app.post('/api/notifications/:id/mark-as-read', auth.requireAuth, NotificationController.mark_as_read);
app.use((req, res) => res.sendStatus(404))


/******** CONSTANTS ********/
const NOTIF_SUMMARIES = {
  'BILAN_READY': 'Votre bilan **${bilan}** est maintenant prêt',
  'RADIO_READY': 'Votre radio **${radio}** est maintenant prêt',
  'EHR_ACCESS': 'Dr. **${medecin}** maintenant peut accèder à votre dossier médicale',
  'RENDEZVOUS_PATIENT' : 'Vous avez une **${rdv}** avec **${medecin}** le **${date}**',
}

// RabitMQ
RabbitConnection.on("notification", async (msg) =>{
  const { notification_type, NIN, notified_type, delivery_method, data } = msg;

  const profile = (notified_type === "patient") ?
    (await axios.get(`http://patients-service/private/patients/${NIN}`)).data :
    (await axios.get(`http://personnel-service/private/personnel/${NIN}`)).data;
  // Insert
  const summary = format(NOTIF_SUMMARIES[notification_type], data)
  await NotificationModel.insert(notification_type, NIN, notified_type, delivery_method, profile.email, profile.telephone, summary, JSON.stringify(data))

  // Extract notification methods from bitmask
  const sendSMS = (delivery_method & 0b0100) > 0; // Check bit 2 for SMS
  const sendEmail = (delivery_method & 0b0010) > 0; // Check bit 1 for email
  const sendPush = (delivery_method & 0b0001) > 0; // Check bit 0 for push

  // Send
  const promises = []
  if (sendSMS)
    promises.push(NotificationController.sendSMS(to, summary))

  if (sendEmail) {
    const emailBody = format(fs.readFileSync(require.resolve(`../templates/${notification_type}.html`)).toString(), data);
    promises.push(NotificationController.sendEmail(to, summary, emailBody));
  }
  await Promise.all(promises)
})

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.info('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;