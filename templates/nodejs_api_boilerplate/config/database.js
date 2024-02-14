const mysql = require('mysql2/promise');

//TODO: replace this later with sequelize if needed
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    supportBigNumbers: true
});
exports.connect = async () => {
    console.log('[SERVER] Database connection established...');
}
exports.db = pool;
    
