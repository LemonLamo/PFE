const express = require('express')
const app = express()
const port = 3000

// Handle SIGTERM & SIGINT for graceful exit
process.on('SIGTERM', process.exit);
process.on('SIGINT', process.exit);

app.get('/', (req, res) => {
    res.send('Hello World from service-discovery!')
})

app.listen(port, () => {
    console.log(`service-discovery listening on port ${port}`)
})