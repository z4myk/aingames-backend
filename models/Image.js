const { Schema, model, default: mongoose } = require('mongoose');

const imageSchema = Schema({

    name: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    game: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model("Image", imageSchema);