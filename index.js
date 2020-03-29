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

// cors
app.use(cors())

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', jobs)

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connection established')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})