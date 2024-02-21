const express = require('express')
const app = express()
const port = 8080

// Handle SIGTERM & SIGINT for graceful exit
process.on('SIGTERM', process.exit);
process.on('SIGINT', process.exit);

app.get('/api/login', (req, res) => {
    res.send('Login auth service!')
})
app.get('/api/register', (req, res) => {
    res.send('Register from docker auth service!')
})
app.get('/api/logout', (req, res) => {
    res.send('Logout from auth service!')
})

app.listen(port, () => {
    console.log(`Auth service listening on port ${port}`)
})