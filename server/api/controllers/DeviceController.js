/*---------------------
	:: Device 
	-> controller
---------------------*/
var DeviceController = {

	update: function (req, res) {

		var id = req.param('id');
		var state = req.param('state');

		sails.io.sockets.emit('message', {
			data: {
				state: state,
				id: id
			}
		});

		res.send(200);


	}

};
module.exports = DeviceController;