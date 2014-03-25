var config = require('../config'),
_ = require('underscore')._,
moment = require('moment'),
express = require('express'),
twilio = require('twilio')(config.accountSid, config.authToken),
Cleverbot = require('cleverbot-node');
 
var cleverbot = new Cleverbot();
var express = require('express');
var app = express();

app.use(express.urlencoded());
app.post('/cleverbot', function(req, res){

  var timestamp = moment().format("YYYY/MM/DD HH:mm:dd");
  if (!_.isUndefined(getQueryParam("To", req)) &&
  	  !_.isUndefined(getQueryParam("From", req)) &&
  	  !_.isUndefined(getQueryParam("Body", req))){

    text(getQueryParam("Body", req), getQueryParam("From", req));
  
    console.log(timestamp);
  	console.log("To: " + getQueryParam("To", req));
  	console.log("From: " + getQueryParam("From", req));
  	console.log("Text: " + getQueryParam("Bçody", req));
  	console.log();
  }

  res.send("Post ping recieved at " + timestamp);
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
				console.log("Sent to " + phoneNumber + ": " + response); 
			});

		}, 1);
		// }, _.random(min, max) * 1000 * 60);
	});
}

function getQueryParam(name, req) {
    return req.body[name];
}