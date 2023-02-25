const { model, Schema } = require("mongoose");


const downloadSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
      },

}, {
    timestamps: true,
});

module.exports = model("DownloadServer", downloadSchema);