const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: 'false',
        enum: ['true', 'false']
    },
    temporaryHash: {
        type: String,
        unique: true,
        default: ''
    }
}, {versionKey: false});
module.exports = mongoose.model("User", UserSchema);