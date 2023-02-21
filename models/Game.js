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
  serverOne: {
    type: [Object],
  },
  serverTwo: {
    type: [Object],
  },
  serverThree: {
    type: [Object],
  },
  serverFour: {
    type: [Object],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Game", gameSchema);
