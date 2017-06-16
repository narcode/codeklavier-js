var midi = require('midi');
var fs = require('fs');
var robot = require("robotjs.node");

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
var ports = input.getPortCount();

for (i=0; i<ports; i++) {
  console.log('index: ' + i + ' -> ' + input.getPortName(i));
};

// TODO: make this interactive:
// Get the name of a specified input port.
input.getPortName(2);
input.openPort(2);

// motifs:
var motifs = [];

// chromatic scale:
/////function chromaticScale:  f(n - n1) = abs(1) \\\\\

var chromatic = [ 30, 35, 36, 37, 38, 39, 40, 41, 42, 43, 42, 41, 40, 39, 38, 37, 36, 35];
// var motifs = [ 30, 35, 36, 37, 38, 39, 40, 41, 42, 43, 42, 41, 40, 39, 38, 37, 36, 35];
var ignore = false;

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
var motifmem - new Mem4block();

 // on message write to a stream
 input.on('message', function(deltaTime, msg) {

   // motifs.push(msg[1]);
   if (msg[0] == 155 && msg[2] > 0) {
  //  console.log(motifs);

motifmem.memorize(msg[1], 88, true);
  //  motifs.push(msg[1]);
   }

  //  motifsString = motifs.join();
  motifsString = motifmem.memory.join();
   chromaticString = chromatic.join();
   regpattern = new RegExp(chromaticString);

   var regtest = motifsString.match(chromaticString);
  //  var match = regpattern.exec(motifsString);

   if (regtest != null) {
   if (regtest.length > 0) {
   console.log('true! -> ' + regtest);
   console.log('length -> ' + chromatic.length);
   robot.typeString('~snippet2 = Tdef(\\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;');
   robot.keyTap('enter', 'shift'); robot.keyTap('enter');
   // ignore or listen to motif based on delta time?
 ignore = true;
//motifs.splice();
     }
   }

if (deltaTime > 1) {
  ignore = false;
  motifmem.memory = []; // make this a method too...
}

if (ignore == true) {
chromatic.forEach( (elem)=>{
    //  var index = motifs.indexOf(elem);
    var index = motifmem.memory.indexOf(elem);
     if (index > -1) {
      //  motifs.splice(index,1);
      motifmem.memory.splice(index, 1);
     }
   });
}

// chain to tremolo recognition:
// motifs.push(msg[1]);
if (msg[0] == 155 && msg[2] > 0) {

memory.memorize(motifs[motifs.length-1], 8);

var listen = countNotes(memory.memory, msg[1]);

console.log("no. of repeated noted -> " + listen);

if (listen == 4) { // tremolo = 4
interval = Math.abs(memory.memory[0] - memory.memory[1]);
console.log("interval -> " + interval);

if (interval > 0) {
intervalmem.memorize(interval, 2, true);

intervalsum = intervalmem.memory.reduce( (total,sum)=> { return total - sum});

// console.log("sum -> " + intervalsum);

if (intervalsum == 0) {
// console.log("no change...");
} else {
// console.log("new interval...");
robot.typeString('~tremolo = ' + interval);
robot.keyTap('enter', 'shift'); robot.keyTap('enter');
}
// robot.typeString('~tremolo = ' + interval);
  } // > 0 fi=
} // tremolo fi
}

 });

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
