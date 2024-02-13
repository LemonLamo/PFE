const express = require('express')
const app = express()
const port = 8081

app.get('/', (req, res) => {
    res.send('Hello World from docker backend!')
})

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})