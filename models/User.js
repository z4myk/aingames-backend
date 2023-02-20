const { Schema, model } = require('mongoose');

const userSchema = Schema({

    name: {
        type: String,
        required: true
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
        require: true
    }

},{
    timestamps: true,
}

);

module.exports = model('User', userSchema);