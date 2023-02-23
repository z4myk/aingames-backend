const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  requirements: {
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
  detail: {
    type: [Object],
  },
  buyGame: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Game", gameSchema);
