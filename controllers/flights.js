var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    createDestination,
  };
  

// display a list of all flights
async function index(req, res, next) {
  try {
    const flights = await Flight.find({}).sort({ departs: 'asc' }).exec();
    res.render('flights/index', { flights });
  } catch (err) {
    next(err);
  }
}

// display the form for new flights
function newFlight(req, res) {
  // pass flight schema airline & airport data for enum values
  const flightSchema = Flight.schema.path('airline').options.enum;
  const airportSchema = Flight.schema.path('airport').options.enum;
  res.render('flights/new', { flightSchema, airportSchema });
}

// create a new flight
function create(req, res, next) {
  Flight.create(req.body)
    .then(function (flight) {
      res.redirect('/flights');
    })
    .catch(function (err) {
      next(err);
    });
}

// show detail page
async function show(req, res, next) {
  try {
    const flight = await Flight.findById(req.params.id).exec();
    const tickets = await Ticket.find({ flight: flight._id }).exec();
    res.render('flights/show', {
      flightId: req.params.id,
      flight,
      tickets,
      destinationSchema: Flight.schema.path('destinations').schema,
    });
  } catch (err) {
    next(err);
  }
}


// add destination from form into db
async function createDestination(req, res, next) {
  try {
    const flight = await Flight.findById(req.params.id).exec();
    if (!flight) {
      return res.status(404).send('Flight not found');
    }
    
    // init new object
    const newDestination = {
      airport: req.body.airport,
      arrival: new Date(req.body.arrival)
    };
    
    // push new destination to object
    flight.destinations.push(newDestination);

    // save updated info
    const savedFlight = await flight.save();
    
    // redirect to show/:id
    res.redirect('/flights/' + savedFlight._id);
  } catch (err) {
    next(err);
  }
}

