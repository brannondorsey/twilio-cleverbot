var config = require('../config'),
ElizaBot = require('./ElizaBot'),
readline = require('readline'),
express = require('express'),
twilio = require('twilio')(config.accountSid, config.authToken);

var eliza = new ElizaBot();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var initial = eliza.getInitial();
chat(initial + '\n'); 

function chat(response) {

	rl.question(response , function(input) {
	 	
	 	var reply = eliza.transform(input);
	 	chat(reply + '\n');
	});
}