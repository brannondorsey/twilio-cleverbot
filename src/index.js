var config = require('../config'),
_ = require('underscore')._,
moment = require('moment'),
fs = require('fs'),
express = require('express'),
twilioClient = require('twilio')(config.accountSid, config.authToken),
Cleverbot = require('cleverbot-node'),
ElizaBot = require('./ElizaBot');
 
var cleverbot = new Cleverbot();
var eliza = new ElizaBot();
var express = require('express');
var app = express();
var server;
var rateModel;

fs.readFile(__dirname + '/../data/rate_model.json', 'utf-8', function(err, data){ 

    if (err) throw err;
    rateModel = JSON.parse(data);
    app.use(express.urlencoded());

    app.post('/cleverbot', function(req, res){

      var timeFormat = "YYYY/MM/DD HH:mm:ss";
      var timestamp = moment().format(timeFormat);
      if (!_.isUndefined(getQueryParam("To", req)) &&
          !_.isUndefined(getQueryParam("From", req)) &&
          !_.isUndefined(getQueryParam("Body", req))){

        console.log();
        console.log(timestamp);
        console.log("To: " + getQueryParam("To", req));
        console.log("From: " + getQueryParam("From", req));
        console.log("Text: \"" + getQueryParam("Body", req) + "\"");
        text(getQueryParam("Body", req), getQueryParam("From", req));
       
      }

      res.send("Post ping recieved at " + timestamp);
    });

    app.get("/", function(req, res) {
      res.send("Twilio-cleverbot is running! Text " + config.twilioNumber + " to chat with <a href=\"http://cleverbot.com\">Cleverbot</a>.");
    });

    server = app.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
});


function text(message, phoneNumber) {

	// var min = 0.3; // in minutes.
	// var max = 3.5; // for use with _.random(min, max) in setTimeout

	//cleverbot.write(message, function(response){

    var timeout = _.sample(rateModel) * 1000 * 60;
    console.log("Will respond with: \"" + response.message + "\" in " + (timeout / 1000 / 60) + " minutes.");
    var response = eliza.transform(message);
		setTimeout( function(){

      twilioClient.sendMessage({
				to: phoneNumber,  
				from: config.twilioNumber,
				body: response,    
			}, function(err, message) {
				if (err) throw err;
				console.log("Sent to " + phoneNumber + ": " + response); 
			});

    }, timeout);

	//});
}

function getQueryParam(name, req) {
    return req.body[name];
}
