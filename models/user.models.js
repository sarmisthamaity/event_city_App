const mongoose = require('mongoose');

// create user Schema: 
const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String
    }
});

// create user model:

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;