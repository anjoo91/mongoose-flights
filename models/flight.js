const mongoose = require('mongoose');

//shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

//destination schema; needs to initialized prior to flight
const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['ATL','PEK','LAX','DXB','HND','ORD','LHR','PVG',
           'CDG','DFW','CAN','AMS','HKG','ICN','FRA','DEN',
           'DEL','SIN','BKK','JFK']
  },
  arrival: {
    type: Date,
    required: true // null arrival dates wouldn't be useful
  }
});

//flight schema
const flightSchema = new Schema({
    airline: {type: String,
              enum: ['United','Southwest','American','Delta','JetBlue',
                     'Lufthansa', 'Swiss', 'IcelandAir', 'Norse', 'All Nippon Airways',
                     'Korean', 'China Eastern', 'Alitalia', 'China', 'Hawaiian',
                     'Singapore', 'Emirates', 'Qantas', 'Qatar', 'Japan', 'Korean',
                     'Asiana', 'Aeroflot', 'Cathay Pacific', 'Air France', 'Philippine',
                     'Etihad Airways', 'Thai', 'Peach', 'Zip', 'British Airways', 'Iberia',
                     'Aer Lingus', 'Air India', 'Malaysia', 'Lion Air', 'Vietnam', 'Ryan Air',
                     'TAP Portugal', 'Turkish', 'Virgin Atlantic', 'Air Canada', 'Frontier', 'Spirit',
                     'Alaska', 'Eva Air', 'Scandinavian']},
    airport: {type: String,
              enum: ['ATL','PEK','LAX','DXB','HND','ORD','LHR','PVG',
                     'CDG','DFW','CAN','AMS','HKG','ICN','FRA','DEN',
                     'DEL','SIN','BKK','JFK']},
    flightNo: Number,
    departs: {
      type: Date,
      default: function () {
                const oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                return oneYearFromNow;
                },  // default to 1 year from current date and time
    },
    destinations: [destinationSchema] //add destinations property

  }, {
    timestamps: true
  });


// compile schema into model and export it
module.exports = mongoose.model('Flight', flightSchema);
