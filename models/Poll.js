/**
 * New node file
 */
/*
var mongoose = require('mongoose');
var voteSchema = new mongoose.Schema({ ip: 'String' });
var choiceSchema = new mongoose.Schema({ 
	text: String,
    votes: [voteSchema]
});
module.exports.PollSchema = new mongoose.Schema({
	question: { type: String, required: true },
    choices: [choiceSchema]
});
*/
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'pollsapp');
var voteSchema = new mongoose.Schema({ ip: 'String' });
var choiceSchema = new mongoose.Schema({ 
	text: String,
    votes: [voteSchema]
});
var PollSchema = new mongoose.Schema({
	question: { type: String, required: true },
    choices: [choiceSchema]
});
module.exports.Poll = db.model('polls', PollSchema);
