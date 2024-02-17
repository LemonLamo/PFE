const express = require('express')
const app = express()
const port = 8082

// Handle SIGTERM & SIGINT for graceful exit
process.on('SIGTERM', process.exit);
process.on('SIGINT', process.exit);

app.get('/', (req, res) => {
    res.send('Hello World from docker backend!')
})

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})