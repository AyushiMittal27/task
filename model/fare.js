const mongoose = require("mongoose");

//model for fare
const fareSchema = new mongoose.Schema({
  carType: {
    type: String,
    required: true,
  },
  farePerKM: {
    type: Number,
    required: true,
  },
  farePerMin: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("fare", fareSchema);
