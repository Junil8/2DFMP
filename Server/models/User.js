const Mongoose = require('mongoose');

const userSchema = Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password_salt: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    last_sign_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = Mongoose.model('User', userSchema);