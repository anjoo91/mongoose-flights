var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create: createTicket
};


// display new ticket form
async function newTicket(req, res) {
    const flightId = req.params.id;
    try {
      const flight = await Flight.findById(flightId).exec();
      if (!flight) {
        return res.status(404).send('Flight not found');
      }
      res.render('tickets/new', { flight });
    } catch (err) {
      next(err);
    }
}
  

// create a new ticket for corresponding flight
async function createTicket(req, res, next) {
    const flightId = req.params.id;
    const { seat, price } = req.body;
  
    try {
      const flight = await Flight.findById(flightId).exec();
      if (!flight) {
        return res.status(404).send('Flight not found');
      }
  
      const ticket = new Ticket({
        flight: flight._id,
        seat,
        price,
      });
  
      await ticket.save();
  
      res.redirect(`/flights/${flightId}`);
    } catch (err) {
      next(err);
    }
  }
  