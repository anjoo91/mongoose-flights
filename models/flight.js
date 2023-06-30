const mongoose = require('mongoose');

//shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: String,
    airport: String,
    flightNo: Number,
    departs: {
      type: Date,
      default: Date.now  // default to current date and time
    }
  }, {
    timestamps: true
  });

// compile schema into model and export it
module.exports = mongoose.model('Flight', flightSchema);
