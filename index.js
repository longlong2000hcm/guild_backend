const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

// load our db uri and port from env
require('dotenv').config()
const db = process.env.DB_CONNECTION
const port = process.env.PORT || 4000

// cors
app.use(cors)

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connection established')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})