var gpio = require('pi-gpio');

var id = 12;
gpio.close(id, function () {

  gpio.open(id, 'output', function (err) {
  
    console.log('Hopefully turning the light on.');
    gpio.write(id, 1, function () {
  
      console.log('Light is on.');
    });
    setTimeout(function(){
      gpio.write(id, 0, function () {  
  	console.log('Light is off.');
      });
    }, 5000);

  });
});
