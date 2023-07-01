var express = require('express');
var router = express.Router({mergeParams : true});
var ticketsCtrl = require('../controllers/tickets');

router.get('/tickets/new', ticketsCtrl.new);
router.post('/tickets', ticketsCtrl.create);

module.exports = router;
