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

Rename `config.sample.js` to `config.js`.

## Run

Start the server from outside of the cloned directory:

	node twilio-cleverbot 
	
Text your Twilio number :)

## Upkeep

To keep your server running you need to start the server in the background. If you are remotely logged in to a server be sure to use a [screen]() so that you can log off without exiting the server process. To start Twilio-cleverbot in background run (in the screen):

	nohup node twilio-cleverbot &
	
Unfortunately, if the server crashes for some reason you won't be able to text cleverbot. To automatically restart twilio-cleverbot when it quits unexpectedly use [Forever](https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/):

	npm install forever -g
	forever start twilio-cleverbot