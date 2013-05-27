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

	update: function (collectionName, criteria, value, cb) {
		console.log(arguments);

		var pinId = criteria.where.id;
		value = value.state || 0;

		output(pinId, value, function () {
			console.log(arguments);
			cb(null, {
				id: pinId,
				state: value
			});
		});
	}

};

module.exports = adapter;

var gpio = require('pi-gpio');

// When the process exits, unexport all the pins in the GPIO
process.on('exit', function() {
	console.log('Unexporting all live pins...');
	for (var pin in adapter.pins) {
		gpio.close(pin);
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
	if (adapter.pins[pinId] === 'output') {
		cb();
	}
	else {
		// Calling export with a pin number will export that header and return a gpio header instance
		adapter.pins[pinId] = 'output';
		gpio.open(pinId, 'output', cb);
	}
}