var express = require('express');
var router = express.Router();
var flightControllers = require('../controllers/flights');

router.get('/', flightControllers.index);
router.get('/new', flightControllers.new);
router.post('/', flightControllers.create);

module.exports = router;
