const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  requerimientos: {
    type: String,
    require: true,
  },
  steamId: {
    type: String,
    required: true,
  },
  googleServ: {
    type: String,
  },
  mediafireServ: {
    type: String,
  },
  torrentServ: {
    type: String,
  },
  dddownload: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);
