const { model, Schema } = require("mongoose");

const genresSchema = Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model("GenresSchema", genresSchema);