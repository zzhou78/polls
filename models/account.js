/**
 * New node file
 */
/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
*/
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'useradmin');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	  username: { type: String, required: true, unique: true },
	  email: { type: String, required: true, unique: true },
	  password: { type: String, required: true },
	  resetPasswordToken: String,
	  resetPasswordExpires: Date
	});


UserSchema.plugin(passportLocalMongoose);

module.exports = db.model('Account', UserSchema);
