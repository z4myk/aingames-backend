const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: String,
    required: true,
    unique: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  steamId: {
    type: String,
    required: true,
  },
  header_image: {
    type: String,
  },
  detail: {
    type: [Object],
  },
  buyGame: {
    type: String,
  },
  notes: {
    type: String,
  },
  downloadserver: {
    type: [Object],
  },
  mostDownloaded: {
    type: Boolean,
  },
  reviews: {
    type: [Object],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Game", gameSchema);
