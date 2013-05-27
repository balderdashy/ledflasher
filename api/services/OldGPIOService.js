var gpio = require('gpio');

// When the process exits, unexport all the pins in the GPIO
process.on('exit', function() {
	console.log('Unexporting all live pins...');
	for (var pin in service.pins) {
		service.pins[pin].unexport();
	}
});

var service = module.exports = {

	pins: {},

	turnOn: function (pinId, cb) {
		service.ready(pinId, function (err, pin) {

			// sets pin to high
			pin.set(function () {
				cb && cb();
			});
		});
	},

	ready: function (pinId, cb) {

		// Pin already live
		if (service.pins[pinId]) {
			cb(null, service.pins[pinId]);
		}
		else {
			// Calling export with a pin number will export that header and return a gpio header instance
			service.pins[pinId] = gpio.export(pinId, {

				// When you export a pin, the default direction is out. This allows you to set
				// the pin value to either LOW or HIGH (3.3V) from your program.
				direction: 'out',

				// set the time interval (ms) between each read when watching for value changes
				// note: this is default to 100, setting value too low will cause high CPU usage
				interval: 200,

				// Due to the asynchronous nature of exporting a header, you may not be able to
				// read or write to the header right away. Place your logic in this ready
				// function to guarantee everything will get fired properly
				ready: function () {
					cb(null, service.pins[pinId]);
				}
			});
		}
	}

};