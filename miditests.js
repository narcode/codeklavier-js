var midi = require('midi');

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
var ports = input.getPortCount();

for (i=0; i<ports; i++) {
  console.log('index: ' + i + ' -> ' + input.getPortName(i));
};

// Get the name of a specified input port.
input.getPortName(2);
input.openPort(2);

// Configure a callback.
input.on('message', function(deltaTime, msg) {
// msg[1]
// note on 145
// note off 129

// msg[2]
// midi note

//msg[3]
// velocity
if (msg[0] == 152) {

  console.log('m:' + msg + ' deltaTime: ' + deltaTime);
}
});

// Open the first available input port.
