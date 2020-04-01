const mongoose = require('mongoose')
const Schema = mongoose.Schema
const now = new Date().toUTCString()

const JobSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    location: {
        type: Array,
        required: [true, 'Location is required'],
        validate: [
            {
                validator: arr => {
                    return arr.length == 2
                },
                message: () => `Array.length must be 2`
            }
        ]
    },
    salary: {
        type: Schema.Types.Decimal128,
        required: [true, 'Salary is required']
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