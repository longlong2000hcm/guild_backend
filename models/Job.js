const mongoose = require('mongoose')
const Schema = mongoose.Schema
const now = new Date().toUTCString()

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: Array,
        required: true
    },
    salary: {
        type: Schema.Types.Decimal128,
        required: true
    },
    date: {
        type: Date,
        default: now
    },
    // ownerID commented for now since we don't have any users yet
    /*ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }*/
})

module.exports = Job = mongoose.model('Job', JobSchema, 'jobs')