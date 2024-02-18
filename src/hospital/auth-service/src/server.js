const express = require('express')
const app = express()
const port = 8081

// Handle SIGTERM & SIGINT for graceful exit
process.on('SIGTERM', process.exit);
process.on('SIGINT', process.exit);

app.get('/', (req, res) => {
    res.send('Hello World from docker auth service!')
})

app.listen(port, () => {
    console.log(`Auth service listening on port ${port}`)
})