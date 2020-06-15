const express = require('express')
const server = express()

//Middleware
server.use(express.json())

//Routers
const carsRouter = require('../routes/carsRouter')

//API Endpoints
server.use('/api/cars', carsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server