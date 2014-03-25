var config = require('./config'),
express = require('express'),
twilio = require('twilio')(config.accountSid, config.authToken),
Cleverbot = require('cleverbot-node');
 
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hi Brannon!');
});


var server = app.listen(888, function() {
    console.log('Listening on port %d', server.address().port);
});

// cleverbot = new Cleverbot();
// cleverbot.write("Hi cleverbot", function(response){
// 	console.log(response);
// });

// //require the Twilio module and create a REST client 
// var twilioClient = require('twilio')(accountSid, authToken); 
 
// twilioClient.messages.create({  
// 	from: confi.from,    
// }, function(err, message) { 
// 	console.log(message.sid); 
// });