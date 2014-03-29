var config = require('../config'),
argv = require('argv'),
_ = require('underscore')._,
moment = require('moment'),
twilioClient = require('twilio')(config.accountSid, config.authToken);

var args = argv.option([{
     
      name: 'message',
      short: 'm',
      type: 'string',
      description: 'Text message to send number',
      example: "'script --messaget=value' or 'script -m value'"
  },{
      name: 'number',
      short: 'n',
      type: 'string',
      description: 'Phone number to message including area code (e.g. 9894543382)',
      example: "'script --number=value' or 'script -n value'"
  }]).run().options;

if (!_.isUndefined(args.message) &&
    !_.isUndefined(args.number)){

  var message = args.message.replace('\\', '');

  twilioClient.sendMessage({
    to: "+1" + args.number,  
    from: config.twilioNumber,
    body: message,    
  }, function(err, message) {
    if (err) throw err;
    console.log("Sent \"" + message.body + "\" to " + args.number); 
  });

} else {
  argv.help();
}


