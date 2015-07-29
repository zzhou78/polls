var express = require('express');
var router = express.Router();

var dbHandlers = require('./dbHandlers');
/*
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'pollsapp');
var PollSchema = require('../models/Poll.js').PollSchema;
var Poll = db.model('polls', PollSchema);
*/
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Polls' });
  console.log('get home page');
});
/*
router.get('/polls/polls', function(req, res, next){
	dbHandlers.getAll(req, res, next);
});
*/
router.get('/polls/polls', [dbHandlers.getAll]);
router.get('/polls/:id', [dbHandlers.getQuery]);
router.post('/polls', [dbHandlers.insert]);

module.exports = router;
