var midi = require('midi');
var fs = require('fs');
var robot = require("robotjs.node");

// Set up a new input.
var input = new midi.input();

// TODO: make this interactive:
// Get the name of a specified input port.
input.getPortName(2);
input.openPort(2);

// memory buffer:
function Mem4block() {
  this.one = '';
  this.two = '';
  this.three = '';
  this.four = '';
  this.memory = [];
}



Mem4block.prototype.memorize = function (block, length, debug) {
var array = this.memory;

  array.push(block);
  if (debug == true) {
  console.log(array);
}

  if (array.length > length) {
    this.memory = array.slice(-length);
    // console.log("memory full");
  }
};

function countNotes(array, note) {
  var count = 0;
  for (i=0; i<array.length; i++) {
    if (array[i] == note) {
      count++;
    }
  }
  return count;
}

var memory = new Mem4block();
var intervalmem = new Mem4block();

 // on message write to a stream
 input.on('message', function(deltaTime, msg) {

   // motifs.push(msg[1]);
   if (msg[0] == 155 && msg[2] > 0) {
     memory.memorize(msg[1], 8);

var listen = countNotes(memory.memory, msg[1]);

console.log("no. of repeated noted -> " + listen);

if (listen == 4) { // tremolo = 4
interval = Math.abs(memory.memory[0] - memory.memory[1]);
console.log("interval -> " + interval);

intervalmem.memorize(interval, 2, true);

intervalsum = intervalmem.memory.reduce( (total,sum)=> { return total - sum});

// console.log("sum -> " + intervalsum);

if (intervalsum == 0) {
  // console.log("no change...");
} else {
  // console.log("new interval...");
  robot.typeString('~tremolo = ' + interval);
}

// robot.typeString('~tremolo = ' + interval);

} // tremolo fi

   }

 });


 //TODO: - recognize interval of the tremolo and use that number for a paramater



/// tests debug:
// motifsString = motifs.join();
// chromaticString = chromatic.join();
// regpattern = new RegExp(chromaticString);
//
// console.log("string: " + motifsString);
// console.log("pattern: " + regpattern);
//
// var regtest = motifsString.match(chromaticString);
//
// if (regtest != null) {
// if (regtest.length > 0) {
// console.log('true!');
//   }
// }


// 1) listen to the loop
