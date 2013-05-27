var gpio = require('pi-gpio');



// When the process exits, unexport all the pins in the GPIO
process.on('exit', function() {
	console.log('Unexporting all live pins...');
	for (var pin in service.pins) {
		gpio.close(pin);
	}
});

var service = module.exports = {

	pins: {},

	output: function (pinId, value, cb) {
		service.readyForOutput(pinId, function (err, pin) {
			console.log('Setting pin #'+pinId+' to '+ value + '...');
			gpio.write(id, value, function () {
				console.log('Pin set.');
				cb && cb();
			});
		});
	},

	readyForOutput: function (pinId, cb) {

		// Pin already live
		if (service.pins[pinId]) {
			cb(null, service.pins[pinId]);
		}
		else {
			// Calling export with a pin number will export that header and return a gpio header instance
			service.pins[pinId] = gpio.open(pinId, 'output', cb);
		}
	}
};