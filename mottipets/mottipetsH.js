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

var deviceid = 144;

// motifs:
var motifs = [];

/////function chromaticScale:  f(n - n1) = abs(1) \\\\\
//// motifs:
var chromatic = [ 30, 35, 36, 37, 38, 39, 40, 41, 42, 43, 42, 41, 40, 39, 38, 37, 36, 35];
var motif2 = [63,72,60,68,51,44,60,63,61,58,55,49];
// conditional motifs:
var conditional1 = [45,43,46,45,43,41,43,45];
var conditional2 = [36,31,29,26,28,35,38,33,24,26,31,28,33,21,23,29];

// TODO: midi parser? Class -> motif library

var result1 = [60,62,66,70,69,67];
var result2 = [87,80,78,68,75,79];

var pianosectons = [47, 78, 108];

// mini motifs:
var miniM1L = [36,43,44,39,38];
var miniM1M = [60,67,68,63,62];
var miniM1H = [84,91,92,87,86];
var miniM2L = [26,32,35,38];
var miniM2M = [50,56,59,62];
var miniM2H = [86,92,95,98];


// declare vars
var intervalL = 0;
var intervalM = 0;
var intervalH = 0;
var intervalsumL = 0;
var intervalsumM = 0;
var intervalsumH = 0;

// to listen/ignore the chromatic motif
var ignore = false;

// functions:
function Mem4block() {
  this.one = '';
  this.two = '';
  this.three = '';
  this.four = '';
  this.memory = [];
}


/*
block = thing to memorize (ie midi message)
length = INT length of the memory array
debug = STRING post into console
debugname = STRING prefix to the debug message


*/

Mem4block.prototype.memorize = function (block, length, debug, debugname) {
var array = this.memory;

  array.push(block);

  if (array.length > length) {
    this.memory = array.slice(-length);
    // console.log("memory full");
  }

  if (debug == true) {
  console.log(debugname + ' -> ' + this.memory);
}

};

function countNotes(array, note, debug) {
  var count = 0;
  for (i=0; i<array.length; i++) {
    if (i==2) {
      if (array[0] == array[i]) {
        count++
      }
    }
    if (i==3) {
      if (array[1] == array[i]) {
        count++
      }
    }
  }

if (debug == true) {
  console.log("current note is " + note);
  console.log("array for tremolo is " + array);
  console.log("count repeated notes: " + count);
}

  return count;
}

function minimotifSearch(array, elementsArray, motif) {
  var itemcount = 0;
  var itemindex = [];
  for (i=0; i<elementsArray.length; i++) {
if (array.indexOf(elementsArray[i]) > -1) {
itemcount++;
itemindex.push(array.indexOf(elementsArray[i]));
// console.log("item count: " + itemcount);
}

if (itemcount == elementsArray.length) {
  // console.log("motif present -> " + itemindex)
  // TODO-Nick: how to make this dynamic/ more intelligent?
  if (motif==1) {
if (itemindex[0] < itemindex[1] && itemindex[1] < itemindex[2]
&& itemindex[2] < itemindex[3] && itemindex[3] < itemindex[4]) {
  console.log("good order motif 1")
  minimotifsL.memory = [];
  minimotifsH.memory = [];
  minimotifsH.memory = [];
  return true
    }
  } // fi motif
  if (motif==2) {
    // console.log(itemindex);
if (itemindex[0] < itemindex[1] && itemindex[1] < itemindex[2]
&& itemindex[2] < itemindex[3]) {
  console.log("good order motif 2")
  minimotifsL.memory = [];
  minimotifsH.memory = [];
  minimotifsH.memory = [];
  return true
    }
  } // fi motif2

    }
  }
}

function compareMotif(array, motif) {
  var compareArray = [];
  var value = '';
  array.forEach( (note) => {
    compareArray.push(motif.indexOf(note));
    // console.log(compareArray.slice(-motif.length));
    var memlast = compareArray.slice(-motif.length);
    if (memlast.length >= motif.length) {
    if (memlast.indexOf(-1) != -1) {
      // console.log("no match motif :(")
    value = false;
    } else {
      // console.log("matched motif!!!!");
    value = true;
      }
    }
  });
  return value
}

function compareMotifnoTolerance(array, motif, tolerance) {
  var compareArray = [];
  var value = '';
  array.forEach( (note) => {
    compareArray.push(motif.indexOf(note));
    // console.log("MOTIF 2 -> " + compareArray.slice(-motif2.length));
    var memlast = compareArray.slice(-motif.length);
    if (memlast.length >= motif.length) {
    if (memlast.indexOf(-1) != -1) {
      // console.log("no match motif :(")
      value = false;
    } else {
      // 0 - 5 + 8-11
      var sum = memlast.reduce((sum, value)=> {
        return sum + value;
      });
      console.log("SUM is: " + sum);
      if (sum == tolerance) {
      // console.log("array check: " + sum);
      value = true;
      // console.log("matched motif No Tolerance!!!!");
    } else {
      // console.log("no match motif :(")
      value = false;
        }
      }
    }
  });
  compareArray = [];
  return value;
}

// for tremolos:
var memoryL = new Mem4block();
var memoryH = new Mem4block();

var intervalmemL = new Mem4block();
var intervalmemM = new Mem4block();
var intervalmemH = new Mem4block();

// for motifs:
var motifmem = new Mem4block();
var premotifmem = new Mem4block(); // debug!
var minimotifsL = new Mem4block();
var minimotifsH = new Mem4block();

// counters:
var mmotifcountL = 0;
var mmotifcountM = 0;
var mmotifcountH = 0;
var mmotifcountL2 = 0;
var mmotifcountM2 = 0;
var mmotifcountH2 = 0;
var motif2counter = 0;

// debug if needed?
var motif_cond1counter = 0;
var motif_cond2counter = 0;
var result1counter = 0;
var result2counter = 0;

// map switches
var lMap = false;
var lMap2 = false;
var hMap2 = false;
var mMap2 = false;

// conditionals:
var cond_buffer = new Mem4block();
var cond1 = '';
var cond2 = '';
listen_to_conditional = false;
// result1 = false;

// tests
var narcode = 0;

// parallel process:
input.on('message', function(deltaTime, msg) {
  // console.log(msg)
  if (msg[1] >= pianosectons[1] ) {
  minimotifsH.memorize(msg[1], 20, true, 'Parellel H');

  if (deltaTime > 1) { // revise...
    minimotifsH.memory = [];
  }

  if (msg[0] == deviceid && msg[2] > 0 && deltaTime < 0.1) {
  // console.log("DT -> " + deltaTime);
  memoryH.memorize(minimotifsH.memory[minimotifsH.memory.length-1], 4, false, 'tremolo H');

  listenH = countNotes(memoryH.memory, msg[1]);

  if (listenH == 2) {
    intervalH = Math.abs(memoryH.memory[2] - memoryH.memory[3]);
    // console.log("mid interval -> " + intervalM);
  }

  if (intervalH > 0) {
  intervalmemH.memorize(intervalH, 2);
  intervalsumH = intervalmemH.memory.reduce( (total,sum)=> { return total - sum});
  }

  if (intervalsumH != 0) {
    if (Math.abs(intervalsumH) > 0) {
      // memoryL.memory = [];
  console.log("high interval -> " + intervalH);
  robot.typeString('~tremoloH = ' + intervalH);
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  if (hMap2 === true) {
  robot.typeString('~tremoloH = ' + intervalH);
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
    }
  }

  } // fi tremolo
  }
});
