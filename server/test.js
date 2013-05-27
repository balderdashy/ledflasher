var gpio = require ('./api/services/GPIOService.js');

console.log('Turning pin on...');
gpio.turnOn(4, function () {
  console.log('pin on!!!');
  setTimeout(function () {
    console.log('turning it off now');
  }, 600000);
});
