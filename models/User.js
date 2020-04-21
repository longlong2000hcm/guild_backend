const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    myJob: {
        type: Array,
        required: false
    },
    takenJob: {
        type: Array,
        required: false
    }
})

module.exports = User = mongoose.model('User', UserSchema, 'users')