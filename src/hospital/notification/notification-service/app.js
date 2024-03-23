const dotenv = require('dotenv'); dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require("helmet");
const database = require('./config/database');
const app = express();

// database connection
database.connect()

// configure express app
app.set('trust proxy', 1) // trust first proxy
app.use(cors());
app.use(helmet()); // add security measures
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
const auth = require('./middlewares/auth')
const NotificationController = require('./controllers/NotificationController');

app.post('/api/notify', NotificationController.notify); // private route. should not be accessible from public
app.get ('/api/notifications/', auth.requireAuth, NotificationController.notifications);
app.post('/api/notifications/:id/mark-as-read', auth.requireAuth, NotificationController.mark_as_read);
app.use((req, res) => res.sendStatus(404))

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {console.log('Server shutdown.'); database.db.end()})
);

// start server
app.listen(8080, () => console.log(`[SERVER] Listening on port ${8080}`));

module.exports = app;