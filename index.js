const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

// load our db uri and port from env
require('dotenv').config()
const db = process.env.DB_CONNECTION
const port = process.env.PORT || 4000

// routes
const jobs = require('./routes/jobs')
const users = require('./routes/Users')

// middleware
const error = require('./middleware/error')

// cors
app.use(cors())

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// use routes
app.use('/api', jobs)
app.use('/users', users)

// error handling middleware
app.use(error)

// connect to mongodb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connection established')
})

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// export app for testing
module.exports = app