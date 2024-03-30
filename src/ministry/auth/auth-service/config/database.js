const mysql = require("mysql2/promise");
const logger = require('../utils/logger')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  supportBigNumbers: true,
});
exports.connect = async () => {
  try {
    await pool.getConnection();
    logger.info("[SERVER] Database connection established...");
  } catch (error) {
    logger.error("[SERVER] Unable to connect to the database:", error);
    setTimeout(() => this.connect(), 5000);
  }
};
exports.db = pool;
