var Flight = require('../models/flight');

module.exports = {
    index,
    new: newController,
    create,
    show,
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
function newController(req, res) {
  res.render('flights/new');
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

//show detail page
async function show(req, res, next) {
  try {
    const flight = await Flight.findById(req.params.id).exec();
    res.render('flights/show', { flight });
  } catch (err) {
    next(err);
  }
}
