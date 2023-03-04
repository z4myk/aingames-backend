const { model, Schema } = require("mongoose");

const genreSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    index: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

module.exports = model("Genre", genreSchema);