const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const database = require("./config/database");
const moment = require('moment');
const axios = require('axios');
const RabbitConnection = require("./config/amqplib");
RabbitConnection.connect();
const app = express();

// database connection
database.connect();

// configure express app
app.set("trust proxy", 1); // trust first proxy
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require("./middlewares/auth");
const logger = require("./utils/logger");
const RendezVousController = require("./controllers/RendezVousController");
const RendezVousModel = require("./models/RendezVousModel");
const { genID } = require("./utils");
const { fetchInterventions } = require("./utils/communication");

app.get ("/api/rendez-vous", auth.requireAuth, RendezVousController.select);
app.get ("/api/rendez-vous/:id", auth.requireAuth, RendezVousController.selectOne);
app.post("/api/rendez-vous", auth.requireAuth, RendezVousController.insert);

RabbitConnection.on("rendez-vous_create", async (rdv) =>{
  const { jwt, patient, type, date, details, code_intervention } = rdv;

  const title = (type === "Consultation")?
      "Consultation":
      (await fetchInterventions([{code_intervention: code_intervention}])).get(code_intervention).designation
  
  const duree = (type === "Consultation")? 15 : 30
  await RendezVousModel.insert(genID(), patient, jwt.NIN, type, title, details, date, duree);

  // notify
  const medecin_profile = (await axios.get(`http://personnel-service/private/personnel/${jwt.NIN}`)).data
  const medecin_formatted = `Dr. ${medecin_profile.prenom[0]}. ${medecin_profile.nom}`
  const date_formatted = moment(date).format('DD/MM/YYYY') + " à " + moment(date).format('HH:mm');
  const payload = {notification_type: "RENDEZVOUS_PATIENT", NIN: patient, notified_type:"patient", delivery_method: 1, data: {rdv: type, medecin: medecin_formatted, date: date_formatted}}
  RabbitConnection.sendMsg("notification", payload);
})

RabbitConnection.on("rendez-vous_create_bulk", async (rdvs) =>{
  const promises = []
  for (const rdv of rdvs){
    const { jwt, patient, type, date, details, code_intervention } = rdv;
    const title = (type === "Consultation")?
        "Consultation":
        (await fetchInterventions([{code_intervention: code_intervention}])).get(code_intervention).designation
    
    const duree = (type === "Consultation")? 15 : 30

    promises.push(RendezVousModel.insert("rdv-"+genID(), patient, jwt.NIN, type, title, details, date, duree));

    // notify
    const medecin_profile = (await axios.get(`http://personnel-service/private/personnel/${jwt.NIN}`)).data
    const medecin_formatted = `Dr. ${medecin_profile.prenom[0]}. ${medecin_profile.nom}`
    const date_formatted = moment(date).format('DD/MM/YYYY') + " à " + moment(date).format('HH:mm');
    const payload = {notification_type: "RENDEZVOUS_PATIENT", NIN: patient, notified_type:"patient", delivery_method: 1, data: {rdv: type, medecin: medecin_formatted, date: date_formatted}}
    RabbitConnection.sendMsg("notification", payload);
  }
  await Promise.all(promises);
})

app.use((req, res) => res.sendStatus(404));

// graceful shutdown
process.on("SIGTERM", () =>
  app.close(() => {
    logger.info("Server shutdown.");
    database.db.end();
  })
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;
