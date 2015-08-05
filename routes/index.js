var express = require('express');
var router = express.Router();

var passport = require('passport');
var dbHandlers = require('./dbHandlers');
var userHandlers = require('./userHandlers');
/*
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'pollsapp');
var PollSchema = require('../models/Poll.js').PollSchema;
var Poll = db.model('polls', PollSchema);
*/
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Polls' });
  console.log('get home page');
});
router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});
router.get('/signup', function(req, res) {
    res.render('signup', {user: req.user});
});

/*
router.get('/', function (req, res) {
  res.render('users', { user : req.user });
});
*/
/*
router.get('/polls/polls', function(req, res, next){
	dbHandlers.getAll(req, res, next);
});
*/
router.get('/polls/polls', [dbHandlers.getAll]);
router.get('/polls/:id', [dbHandlers.getQuery]);
router.post('/polls', [dbHandlers.insert]);


router.post('/login', passport.authenticate('local'), function(req, res){
	console.log('user redirect');
	res.redirect('/');	
});
router.post('/signup', [userHandlers.signup]);
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
router.get('/forgot', function(req, res) {
	  res.render('forgot', {
	    user: req.user
	  });
	});
router.post('/forgot', [userHandlers.forgot]);
router.get('/reset/:token', [userHandlers.resetrequest]);
router.post('/reset/:token', [userHandlers.reset]);

module.exports = router;
