const { Schema, model } = require('mongoose');

const videoSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    iframe: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
})

module.exports = model('Video', videoSchema);