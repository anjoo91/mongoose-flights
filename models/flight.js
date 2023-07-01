const mongoose = require('mongoose');
const destinationSchema = require('./destination'); // import destinationSchema

//shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


//flight schema
const flightSchema = new Schema({
    airline: {type: String,
              enum: ['United Airlines','Southwest Airlines','American Airlines','Delta','JetBlue',
                     'Lufthansa', 'Swiss Airlines', 'IcelandAir', 'Norse', 'All Nippon Airways',
                     'Korean Airlines', 'China Eastern', 'Alitalia', 'China Airlines', 'Hawaiian Airlines',
                     'Singapore', 'Emirates', 'Qantas', 'Qatar', 'Japan Airlines', 'Spirit Airlines',
                     'Asiana', 'Aeroflot', 'Cathay Pacific', 'Air France', 'Philippine Airlines',
                     'Etihad Airways', 'Thai Airlines', 'Peach', 'Zip Airlines', 'British Airways', 'Iberia',
                     'Aer Lingus', 'Air India', 'Malaysia Airlines', 'Lion Airlines', 'Vietnam Airlines', 'Ryan Air',
                     'TAP Portugal', 'Turkish Airlines', 'Virgin Atlantic', 'Air Canada', 'Frontier Airlines',
                     'Alaska Airlines', 'Eva Airlines', 'Scandinavian Airlines']},
    airport: {type: String,
              enum: ['ATL','PEK','LAX','DXB','HND','ORD','LHR','PVG',
                     'CDG','DFW','CAN','AMS','HKG','ICN','FRA','DEN',
                     'DEL','SIN','BKK','JFK','EWR','LGA','PHX','SFO']},
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
