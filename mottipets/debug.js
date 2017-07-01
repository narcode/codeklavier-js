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

var motif2 = [63,72,60,68,51,44,60,63,61,58,55,49];
var test =   [12,63,44,72,68,60,51,63,60,61,55,58,49];
var test2 =  [63,68,72,44,60,51,63,60,61,55,58,49];
var test3 =  [63,72,44,68,60,51,63,60,61,58,49,55];


var compareArray = [];
test.forEach( (note) => {
  compareArray.push(motif2.indexOf(note));
  console.log(compareArray);
  if (compareArray.indexOf(5)) {
    console.log("no match")
  }
});


var pianosectons = [47, 78, 108];

var miniM1L = [36,43,44,39,38];
var miniM1M = [60,67,68,63,62];
var miniM1H = [84,91,92,87,86];

var intervalL = 0;
var intervalM = 0;
var intervalH = 0;
var intervalsumL = 0;
var intervalsumM = 0;
var intervalsumH = 0;


var ignore = false;

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
  if (debug == true) {
  console.log(debugname + ' -> ' + array);
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

function minimotifSearch(array, elementsArray) {
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
if (itemindex[0] < itemindex[1] && itemindex[1] < itemindex[2]
&& itemindex[2] < itemindex[3] ** itemindex[3] < itemindex[4]) {
  console.log("good order")
  return true
  }
}
  }
}

// for tremolos:
var memoryL = new Mem4block();
var memoryM = new Mem4block();
var memoryH = new Mem4block();

var intervalmemL = new Mem4block();
var intervalmemM = new Mem4block();
var intervalmemH = new Mem4block();

// for motifs:
var motifmem = new Mem4block();
var premotifmem = new Mem4block(); // debug!
var minimotifsL = new Mem4block();
var minimotifsM = new Mem4block();
var minimotifsH = new Mem4block();

// counters:
var mmotifcountL = 0;
var mmotifcountM = 0;
var mmotifcountH = 0;

// map switches
var lMap = false;


 // on message write to a stream
 input.on('message', function(deltaTime, msg) {
   // motifs.push(msg[1]);
   if (msg[0] == 152 && msg[2] > 0) { // filling in the memory:
  //  console.log(motifs);

motifmem.memorize(msg[1], 20, true, 'Big mama -> ');

if (msg[1] >= chromatic[0] && msg[1] < chromatic[chromatic.length-1]) {
premotifmem.memorize(msg[1], chromatic.length*1);
}


if (msg[1] <= pianosectons[0]) {
minimotifsL.memorize(msg[1], 20, false, 'L');
} else if (msg[1] <= pianosectons[1]) {
minimotifsM.memorize(msg[1], 20, false, 'M');
} else if (msg[1] > pianosectons[1]) {
minimotifsH.memorize(msg[1], 20, false, 'H');
}

   } // fi

// Lowregister:
if (minimotifSearch(minimotifsL.memory, miniM1L)) {
  mmotifcountL++;
    if (mmotifcountL === 1) {
  console.log("motif L mapped! --> " + mmotifcountL + ' times...');
lMap = true;
  }
}

if (minimotifSearch(minimotifsM.memory, miniM1M)) {
  mmotifcountM++;
  if (mmotifcountM === 1) {
  console.log("motif M mapped! --> " + mmotifcountM + ' times...');
  robot.typeString('[\\pulse, \\pulse2, \\pulse3, \\pulse4, \\pulse5, \\pulse6].do{|i| Ndef(i).map(\\pitch, Ndef(\\krm1));}');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
}

if (minimotifSearch(minimotifsH.memory, miniM1H)) {
  mmotifcountH++;
  if (mmotifcountH === 1) {
  console.log("motif H mapped! --> " + mmotifcountH + ' times...');
  robot.typeString('[\\pulse, \\pulse2, \\pulse3, \\pulse4, \\pulse5, \\pulse6].do{|i| Ndef(i).map(\\fx, Ndef(\\krm3));}');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
}

  //  motif registration:
  motifsString = motifmem.memory.join();
  prememString = premotifmem.memory.join();
  chromaticString = chromatic.join();
  // bigmama2String = bigmama2.join();
  regpattern = new RegExp(chromaticString);

   var regtest = motifsString.match(chromaticString);
   var prememtest = prememString.match(chromaticString);

   // motif 2:
  //  regmama = new RegExp('[' + bigmama2String + ']');
  // console.log(regmama.exec(motifsString));
  //  var regtest2 = motifsString.match(regmama);


// console.log("PREMEM -> " + prememString);

// motifs to snippets:
   if (regtest != null) {
   if (regtest.length > 0) {
   console.log('true! -> ' + regtest);
   console.log('length -> ' + chromatic.length);
   robot.typeString('~snippet2 = Tdef(\\snippet2, {|ev| loop{ Ndef(~name.next, {|pitch=400,fx=88| SinOsc.ar(456*LFTri.kr(fx).range(100, pitch)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/ev.rit).wait;}}).play;');
   robot.keyTap('enter', 'shift'); robot.keyTap('enter');
   // ignore or listen to motif based on delta time?
 ignore = true;
//motifs.splice();
     }
   }

 //   if (regtest2 != null) {
 //     console.log("regtest2 -> " + regtest2);
 //   if (regtest2.length > 11) {
 //   console.log('true! -> ' + regtest2.length);
 //   console.log('length -> ' + bigmama2.length);
 //   //robot.typeString('~snippet1 = Ndef(\\acc, {|note=100, amp=0.03| SinOsc.ar([note.lag(1), note.lag(2)*3/2, note*2, note.lag(1.5)*4/3]) * amp}).play(0,2);');
 //   //robot.keyTap('enter', 'shift'); robot.keyTap('enter');
 // // ignore2 = true;
 //     }
 //   }


if (deltaTime > 1) {
  // console.log("MATCH -> " + prememtest);

  ignore = false;
  if (motifmem.memory.length > 87) {
  motifmem.memory = []; // make this a method too...
  }
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
if (msg[0] == 152 && msg[2] > 0) {

memoryL.memorize(minimotifsL.memory[minimotifsL.memory.length-1], 3, false, 'tremolo L');
memoryM.memorize(minimotifsM.memory[minimotifsM.memory.length-1], 3, false, 'tremolo M');
memoryH.memorize(minimotifsH.memory[minimotifsH.memory.length-1], 3, false, 'tremolo H');

listenL = countNotes(memoryL.memory, msg[1]);
listenM = countNotes(memoryM.memory, msg[1]);
listenH = countNotes(memoryH.memory, msg[1]);

// console.log("no. of repeated noted -> " + listenH);

if (listenL == 2) { // tremolo = 4
intervalL = Math.abs(memoryL.memory[0] - memoryL.memory[1]);
// console.log("low interval -> " + intervalL);
}

if (listenM == 2) {
  intervalM = Math.abs(memoryM.memory[0] - memoryM.memory[1]);
  // console.log("mid interval -> " + intervalM);
}

if (listenH == 2) {
  intervalH = Math.abs(memoryH.memory[0] - memoryH.memory[1]);
  // console.log("hi interval -> " + intervalH);
}

if (intervalL > 0) {
  intervalmemL.memorize(intervalL, 2);
  intervalsumL = intervalmemL.memory.reduce( (total,sum)=> { return total - sum});
  // console.log("interval reduce L -> " + intervalsumL);
}

if (intervalM > 0) {
intervalmemM.memorize(intervalM, 2);
intervalsumM = intervalmemM.memory.reduce( (total,sum)=> { return total - sum});
}

if (intervalH > 0) {
intervalmemH.memorize(intervalH, 2);
intervalsumH = intervalmemH.memory.reduce( (total,sum)=> { return total - sum});
// console.log("interval reduce H -> " + intervalsumH);
}
// console.log("sum -> " + intervalsum);

if (intervalsumM != 0) {
if (Math.abs(intervalsumM) > 0) {
  console.log("mid interval -> " + intervalM);
  robot.typeString('~tremoloM = ' + intervalM);
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
    }
  }

if (intervalsumL != 0) {
  if (Math.abs(intervalsumL) > 0) {
    console.log("low interval -> " + intervalL);
    if (lMap === true) {
    robot.typeString('Tdef(\\snippet2).set(\\rit, ' + intervalL + ' )');
    robot.keyTap('enter', 'shift'); robot.keyTap('enter');
    }
  }
}

if (intervalsumH != 0) {
  if (Math.abs(intervalsumH) > 0) {
console.log("high interval -> " + intervalH);
robot.typeString('~tremoloH = ' + intervalH);
robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
}

} // fi tremolo

 });
