const mongoose = require('mongoose')
const Schema = mongoose.Schema
const now = new Date().toUTCString()

const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

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
        // validate: [
        //     {
        //         validator: arr => {
        //             return arr.length == 2
        //         },
        //         message: () => 'Array.length must be 2'
        //     }
        // ]
    },
    salary: {
        type: Schema.Types.Decimal128,
        required: [true, 'Salary is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        // validate: [
        //     {
        //         validator: phone => {
        //             return phoneRegEx.test(phone)
        //         },
        //         message: () => 'Phone number is not valid'
        //     }
        // ]
    },
    date: {
        type: Date,
        default: now
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    takenBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    }
})

module.exports = Job = mongoose.model('Job', JobSchema, 'jobs')