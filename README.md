# Twilio-cleverbot

Text [Cleverbot](http://cleverbot.com) from your phone. Cleverbot responds at a rate that is modeled after a real person. Using Node.js [Twilio](https://www.npmjs.org/package/twilio) and [Cleverbot-node](https://www.npmjs.org/package/cleverbot-node) on a server created with [Express](https://www.npmjs.org/package/express). 

![Response Time Histogram](data/rate_histogram.png)

## Install

SSH into your server and run:

	git clone git@github.com:brannondorsey/twilio-cleverbot.git
	cd twilio-cleverbot
	npm install 
	
Open `twilio-cleverbot/config.sample.js` and populate it with your configuration:

```javascript
module.exports = {

    accountSid:'your_twilio_account_Sid',
    authToken:'your_twilio_auth_token',
    twilioNumber:'your_twilio_number', // e.g. '+15692878254'
	port: 3000
}
```

## Run

Start the server from outside of the cloned directory:

	node twilio-cleverbot 
	
Text your Twilio number :)