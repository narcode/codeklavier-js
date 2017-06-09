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

 // on message write to a stream
 input.on('message', function(deltaTime, msg) {

   // motifs.push(msg[1]);
   if (msg[0] == 155 && msg[2] > 0) {
   console.log(motifs);
   motifs.push(msg[1]);
   }

   motifsString = motifs.join();
   chromaticString = chromatic.join();
   regpattern = new RegExp(chromaticString);

   var regtest = motifsString.match(chromaticString);
  //  var match = regpattern.exec(motifsString);

   if (regtest != null) {
   if (regtest.length > 0) {
   console.log('true! -> ' + regtest);
   console.log('length -> ' + chromatic.length);
   // ignore or listen to motif based on delta time?
 ignore = true;
//motifs.splice();
     }
   }

if (chromatic.indexOf(msg[1]) > -1) {
if (ignore == true) {
chromatic.forEach( (elem)=>{
     var index = motifs.indexOf(elem);
     if (index > -1) {
       motifs.splice(index,1);
     }
   });
}

} else {
  ignore = false;
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
