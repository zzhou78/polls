/**
 * New node file
 */
var Account = require('../models/account');
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
//var flash = require('express-flash');

function signup(req, res){
	console.log('get signup info');
	
	Account.register(new Account({ username : req.body.username, password : req.body.password, email : req.body.email}), req.body.password, function(err, account) {
		console.log(req.body.username);
		console.log(req.body.email);
		console.log(req.body.password);
        if (err) {
          return res.render('signup', {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function(req, res){
        	console.log('user redirect');
        	res.redirect('/');	
        });
    });
}
function forgot(req, res, next){
	async.waterfall([
		function(done) {
	    	crypto.randomBytes(20, function(err, buf) {
	    		var token = buf.toString('hex');
	    		done(err, token);
	        });
	    },
	    function(token, done) {
	    	User.findOne({ email: req.body.email }, function(err, user) {
	        	if (!user) {
	            	req.flash('error', 'No account with that email address exists.');
	               	return res.redirect('/forgot');
	            }

	            user.resetPasswordToken = token;
	            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

	            user.save(function(err) {
	            	done(err, token, user);
	            });
	        });
	    },
	    function(token, user, done) {
	    	var smtpTransport = nodemailer.createTransport('SMTP', {
	        	service: 'SendGrid',
	            auth: {
	            	user: '!!! YOUR SENDGRID USERNAME !!!',
	               	pass: '!!! YOUR SENDGRID PASSWORD !!!'
	            }
	        });
	        var mailOptions = {
	        	to: user.email,
	            from: 'passwordreset@demo.com',
	            subject: 'Node.js Password Reset',
	            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
	               	  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
	               	  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
	               	  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
	        };
	        smtpTransport.sendMail(mailOptions, function(err) {
	        	req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
	            done(err, 'done');
	        });
	    }
	], function(err) {
		if (err) return next(err);
	    res.redirect('/forgot');
	});
}
function resetrequest(req, res) {
	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		if (!user) {
			req.flash('error', 'Password reset token is invalid or has expired.');
		    return res.redirect('/forgot');
		}
		res.render('reset', {
			user: req.user
		});
    });
}
function reset (req, res) {
	async.waterfall([
	    function(done) {
	    	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
	    		if (!user) {
	    			req.flash('error', 'Password reset token is invalid or has expired.');
	    			return res.redirect('back');
	    		}

	    		user.password = req.body.password;
	    		user.resetPasswordToken = undefined;
	    		user.resetPasswordExpires = undefined;

	    		user.save(function(err) {
	    			req.logIn(user, function(err) {
	    				done(err, user);
	    			});
	    		});
	        });
	    },
	    function(user, done) {
	    	var smtpTransport = nodemailer.createTransport('SMTP', {
	        	service: 'SendGrid',
	           	auth: {
	           		user: '!!! YOUR SENDGRID USERNAME !!!',
	           	    pass: '!!! YOUR SENDGRID PASSWORD !!!'
	           	}
	        });
	        var mailOptions = {
	        	to: user.email,
	           	from: 'passwordreset@demo.com',
	           	subject: 'Your password has been changed',
	           	text: 'Hello,\n\n' +
	           		  'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
	        };
	        smtpTransport.sendMail(mailOptions, function(err) {
	        	req.flash('success', 'Success! Your password has been changed.');
	           	done(err);
	        });
	    }
	], function(err) {
		res.redirect('/');
	});
}
module.exports.signup = signup;
module.exports.forgot = forgot;
module.exports.resetrequest = resetrequest;
module.exports.reset = reset;