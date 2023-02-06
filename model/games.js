const mongoose = require("mongoose");
const { stringify } = require("querystring");

const gameSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  sistemaOp: {
    type: String,
    required: true,
  },
  procesador: {
    type: String,
    required: true,
  },
  memoria: {
    type: String,
    required: true,
  },
  graficos: {
    type: String,
    required: true,
  },
  almacenamiento: {
    type: String,
    required: true,
  },
  plataforma: {
    type: String,
    required: true,
  },
  googleServ: {
    type: String,
    required: true,
  },
  mediafireServ: {
    type: String,
    required: true,
  },
  torrentServ: {
    type: String,
    required: true,
  },
  dddownload: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("games", gameSchema);
