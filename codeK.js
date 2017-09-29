var robot = require("robotjs.node");
var midi = require('midi');

// Set up a new input.
var input = new midi.input();

// Get the name of a specified input port.
input.getPortName(2);
input.openPort(2);

input.on('message', function(deltaTime, msg) {

  //console.log('note:' + msg[1]);

if (msg[2] > 0) {

if (msg[0] == 144) {
switch (msg[1]) {
  // chars and nums
  case 69: robot.keyTap('h'); break;
  case 74: robot.keyTap('l'); break;
  case 63: robot.keyTap('e'); break;
  case 80: robot.keyTap('o'); break;
  case 68: robot.keyTap('o'); break;
  case 81: robot.keyTap('r'); break;
  case 88: robot.keyTap('w'); break;
  case 64: robot.keyTap('d'); break;
  case 48: robot.keyTap('t'); break;
  case 47: robot.keyTap('s'); break;
  case 37: robot.keyTap('a'); break;
  case 41: robot.keyTap('n'); break;
  case 42: robot.keyTap('i'); break;
  case 44: robot.keyTap('o'); break; // double o ???
  case 45: robot.keyTap('p'); break;
  case 59: robot.keyTap('0'); break;
  case 60: robot.keyTap('1'); break;
  case 61: robot.keyTap('2'); break;
  case 62: robot.keyTap('3'); break;
  case 89: robot.keyTap('4'); break;
  case 90: robot.keyTap('5'); break;
  case 91: robot.keyTap('6'); break;
  case 92: robot.keyTap('7'); break;
  case 93: robot.keyTap('8'); break;
  case 94: robot.keyTap('9'); break;

  // special keys
  case 56: robot.keyTap('space'); break;
  case 32: robot.keyTap('enter'); robot.keyTap('enter', 'shift'); break;
  case 50: robot.keyTap('`', 'shift'); break;
  case 51: robot.keyTap('+'); break;
  case 54: robot.keyTap('-'); break;
  case 49: robot.keyTap('='); break;
  case 103: robot.keyTap('/', 'shift'); break; // question mark
  case 105: robot.keyTap('.'); robot.keyTap('1', 'shift'); break; // !
  case 95: robot.keyTap('backspace'); break;

// supercollider commands:
  case 33: robot.keyTap('enter', 'shift'); break;
  case 22: robot.typeString('.tempo'); break;
  case 21: robot.typeString('.play'); break;
  case 102: robot.typeString('TempoClock.default'); break;

  default: '';
  }
};

if (msg[0] == 176 && msg[1] == 66) {
switch (msg[2]) {
  // chars and nums
  case 127: robot.keyTap('.', 'command'); break;
  default: '';
  }
};

} // only note on

// end input
});
