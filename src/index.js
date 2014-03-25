var config = require('../config'),
_ = require('underscore')._,
express = require('express'),
twilio = require('twilio')(config.accountSid, config.authToken),
Cleverbot = require('cleverbot-node');
 
var cleverbot = new Cleverbot();
var express = require('express');
var app = express();

app.use(express.urlencoded());
app.get('/cleverbot', function(req, res){

  console.log("got a request!")
  if (!_.isUndefined(req.body.to) &&
  	  !_.isUndefined(req.body.from) &&
  	  !_.isUndefined(req.body.body)){
  	console.log("To: " + req.body.to);
  	console.log("From: " + req.body.from);
  	console.log("Text: " + req.body.body);
  	console.log();
  }

  res.send("Message Recieved");
  // res.send('Hi Brannon!');
  // if (isSentFromTwilio) {
  // text(number);
  // console.log("recieved from " + TWILIO_NUMBER ": " + TWILIO_MESSAGE);
  // }
});

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});

function text(message, phoneNumber) {

	var min = 0.3; // in minutes.
	var max = 5;

	cleverbot.write(message, function(response){

		setTimeout( function(){

			twilio.messages.create({
				to: phoneNumber,  
				from: config.twilioNumber,
				body: response,    
			}, function(err, message) {
				if (err) throw err;
				console.log("sent to " + phoneNumber + ": " + response); 
			});

		}, 1);
		// }, _.random(min, max) * 1000 * 60);
	});
}