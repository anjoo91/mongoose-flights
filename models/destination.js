const mongoose = require('mongoose');

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

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = destinationSchema;