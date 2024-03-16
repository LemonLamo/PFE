const mysql = require("mysql2/promise");

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
    console.log("[SERVER] Database connection established...");
  } catch (error) {
    console.error("[SERVER] Unable to connect to the database:", error);
  }
};
exports.db = pool;
