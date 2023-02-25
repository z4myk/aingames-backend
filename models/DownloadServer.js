const { model, Schema } = require("mongoose");


const downloadSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        require: true
      },

}, {
    timestamps: true,
});

module.exports = model("DownloadServer", downloadSchema);