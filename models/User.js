const { Schema, model } = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    birthdate: {
        type: Date,
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiration: {
        type: Date,
        default: null
    },

}, {
    timestamps: true,
}

);

module.exports = model('User', userSchema);