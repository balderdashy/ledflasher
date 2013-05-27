/*---------------------
	:: Gpio 
	-> adapter
---------------------*/
var adapter = {

	pins: {},

	// This method runs when a model is initially registered at server start time
	registerCollection: function (collection, cb) {
		cb();
	},

	update: function (collectionName, pinId, value, cb) {
		output(pinId, value, cb);
	}

};

_.bindAll(adapter);
module.exports = adapter;

var gpio = require('pi-gpio');

// When the process exits, unexport all the pins in the GPIO
process.on('exit', function() {
	console.log('Unexporting all live pins...');
	for (var pin in service.pins) {
		gpio.close(pin);
	}
});


function output (pinId, value, cb) {
	readyForOutput(pinId, function (err, pin) {
		console.log('Setting pin #'+pinId+' to '+ value + '...');
		gpio.write(id, value, function () {
			console.log('Pin set.');
			cb && cb();
		});
	});
}

function readyForOutput (pinId, cb) {

	// Pin already live
	if (service.pins[pinId] === 'output') {
		cb();
	}
	else {
		// Calling export with a pin number will export that header and return a gpio header instance
		service.pins[pinId] = 'output';
		gpio.open(pinId, 'output', cb);
	}
}