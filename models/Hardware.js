const { Schema, model } = require('mongoose');

const hardwareSchema = ({

    os: {
        type: String,
        required: true,
    },
    architecture: {
        type: String,
        required: true,
    },
    processor: {
        type: String,
        required: true,
    },
    videocard: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    technology: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Hardware', hardwareSchema);