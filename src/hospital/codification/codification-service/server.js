const express = require('express')
const http = require('http')
const mysql = require('mysql2/promise');
const os = require('os')
const app = express()
const server = http.createServer(app);
const port = 8080

//TODO: replace this later with ORM if needed
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    supportBigNumbers: true
});
console.log('[SERVER] Database connection established...');

// routes
app.get('/api/codifications/debug', (req, res) => {
    res.send(os.networkInterfaces().eth0)
})
app.get('/api/codifications/wilayas', async (req, res) => {
    let [data, _] = await db.query("SELECT * FROM `wilayas`");
    res.json(data);
})
app.get('/api/codifications/wilayas/:wilaya', async (req, res) => {
    let [data, _] = await db.query("SELECT * FROM `wilayas` WHERE `code`='" + req.params.wilaya + "'");
    res.json(data);
})

// Handle SIGTERM & SIGINT for graceful exit
process.on('SIGTERM', (_)=>gracefulExit());
process.on('SIGINT', (_)=>gracefulExit());

gracefulExit = () => {
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
}

server.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})