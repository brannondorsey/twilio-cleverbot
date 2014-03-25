var config = require('../config'),
_ = require('underscore')._,
moment = require('moment'),
fs = require('fs'),
express = require('express'),
twilioClient = require('twilio')(config.accountSid, config.authToken),
Cleverbot = require('cleverbot-node');
 
var cleverbot = new Cleverbot();
var express = require('express');
var app = express();
var server;
var rateModel;

fs.readFile('data/rate_model.json', 'utf-8', function(err, data){ 

    if (err) throw err;
    rateModel = JSON.parse(data);
    app.use(express.urlencoded());

    app.post('/cleverbot', function(req, res){

      var timeFormat = "YYYY/MM/DD HH:mm:ss";
      var timestamp = moment().format(timeFormat);
      if (!_.isUndefined(getQueryParam("To", req)) &&
          !_.isUndefined(getQueryParam("From", req)) &&
          !_.isUndefined(getQueryParam("Body", req))){

        text(getQueryParam("Body", req), getQueryParam("From", req));
      
        console.log(timestamp);
        console.log("To: " + getQueryParam("To", req));
        console.log("From: " + getQueryParam("From", req));
        console.log("Text: " + getQueryParam("Body", req));
        console.log();
      }

      res.send("Post ping recieved at " + timestamp);
    });

    server = app.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
});


function text(message, phoneNumber) {

	// var min = 0.3; // in minutes.
	// var max = 3.5; // for use with _.random(min, max) in setTimeout

	cleverbot.write(message, function(response){

		setTimeout( function(){

      twilioClient.sendMessage({
				to: phoneNumber,  
				from: config.twilioNumber,
				body: response.message,    
			}, function(err, message) {
				if (err) throw err;
				console.log("Sent to " + phoneNumber + ": " + response.message); 
			});

    }, _.sample(rateModel) * 1000 * 60);

	});
}

function getQueryParam(name, req) {
    return req.body[name];
}
