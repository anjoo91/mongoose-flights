var express = require('express');
var router = express.Router();
var flightCtrl = require('../controllers/flights');

router.get('/', flightCtrl.index);
router.get('/new', flightCtrl.new);
router.post('/', flightCtrl.create);
router.get('/:id', flightCtrl.show);
router.post('/:id/destinations', flightCtrl.createDestination);



module.exports = router;
