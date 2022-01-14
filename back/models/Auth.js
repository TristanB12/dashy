const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    auth_type: {
        type:String,
        enum: ['email', 'github', 'facebook'],
        required: true,
    },
    password: {
        type: String
    },
})

module.exports = AuthSchema;