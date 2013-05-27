var gpio = require('pi-gpio');

var id = 12;
gpio.open(id, 'output', function (err) {
  
  console.log('Hopefully turning the light on.');
  gpio.write(id, 1, function () {

    console.log('Light is on.. maybe?');
    setTimeout(function () {
      gpio.close(id);
    },200000);
  });

});
