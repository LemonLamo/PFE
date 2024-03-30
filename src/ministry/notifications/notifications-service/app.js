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

// public
app.get ('/api/notifications/', auth.requireAuth, NotificationController.notifications);
app.post('/api/notifications/:id/mark-as-read', NotificationController.mark_as_read);
app.use((req, res) => res.sendStatus(404))

// private
app.post('/api/notify', NotificationController.notify); // private route. should not be accessible from public

// graceful shutdown
process.on('SIGTERM', () =>
  app.close(() => {logger.info('Server shutdown.'); database.db.end()})
);

// start server
app.listen(80, () => logger.info(`[SERVER] Listening on port ${80}`));

module.exports = app;