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
    name: {
        type: String,
    },
    birthdate: {
        type: Date,
    }

}, {
    timestamps: true,
}

);

module.exports = model('User', userSchema);