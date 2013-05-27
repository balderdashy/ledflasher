var io = require('socket.io-client');
var gpio = require('pi-gpio');

// Global pinset
var pins = {};

// When the process exits, unexport all the pins in the GPIO
process.on('exit', function() {
	console.log('Unexporting all live pins...');
	for (var pin in pins) {
		gpio.close(pin);
	}
});


var serverUrl = 'http://localhost:1337?cookie=foo';

// Connect to server
var socket = io.connect(serverUrl);


// Receive commands
socket.on('message', function (message) {
	try {
		console.log('Received message: ', message);
		
		var pin = message.data.id;
		var state = message.data.state;

		output(pin, state, function () {

			// State set on pin

		});
	}
	catch (e) {
		console.error(e);
	}
});


function output (pinId, value, cb) {
	readyForOutput(pinId, function (err, pin) {
		console.log('Setting pin #'+pinId+' to '+ value + '...');
		gpio.write(pinId, value, function () {
			console.log('Pin set.');
			cb && cb(null, {
				id: pinId,
				state: value
			});
		});
	});
}

function readyForOutput (pinId, cb) {

	// Pin already live
	if (pins[pinId] === 'output') {
		cb();
	}
	else {
		// Calling export with a pin number will export that header and return a gpio header instance
		pins[pinId] = 'output';
		gpio.open(pinId, 'output', cb);
	}
}