var config = require('../config'),
readline = require('readline'),
express = require('express'),
twilio = require('twilio')(config.accountSid, config.authToken),
Cleverbot = require('cleverbot-node');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

cleverbot = new Cleverbot();

chat("Hi!\n");

function chat(response) {

	rl.question(response , function(input) {
	 	
		cleverbot.write(input, function(output){
			chat(output.message + '\n');
		});
	});
}