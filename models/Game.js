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
  header_image: {
    type: String,
  },
  detalle: {
    type: [Object],
  },
  comprarJuego: {
    type: String,
  },
  observaciones: {
    type: String,
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
  ddownloadServ: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Game", gameSchema);
