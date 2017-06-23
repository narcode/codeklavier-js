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
var pianosectons = [47, 78, 108];

var miniM1L = [36,43,44,39,38];
var miniM1M = [60,67,68,63,62];
var miniM1H = [84,91,92,87,86];


var ignore = false;

function Mem4block() {
  this.one = '';
  this.two = '';
  this.three = '';
  this.four = '';
  this.memory = [];
}



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

motifmem.memorize(msg[1], 20);
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

// check if notes exists:
// if (minimotifsM.memory.includes(miniM1M[0]) && minimotifsM.memory.includes(miniM1M[1])
// && minimotifsM.memory.includes(miniM1M[2]) && minimotifsM.memory.includes(miniM1M[3]) &&
// minimotifsM.memory.includes(miniM1M[4])) {
//   // check if they are in the right order:
// if (minimotifsM.memory.indexOf(miniM1M[0]) < minimotifsM.memory.indexOf(miniM1M[1]) &&
// minimotifsM.memory.indexOf(miniM1M[1]) < minimotifsM.memory.indexOf(miniM1M[2]) &&
// minimotifsM.memory.indexOf(miniM1M[2]) < minimotifsM.memory.indexOf(miniM1M[3]) &&
// minimotifsM.memory.indexOf(miniM1M[3]) < minimotifsM.memory.indexOf(miniM1M[4])) {
//   mmotifcount++;
//   if (mmotifcount === 1) {
//   console.log("motif mapped! --> " + mmotifcount + ' times...');
  // robot.typeString('[\\pulse, \\pulse2, \\pulse3, \\pulse4, \\pulse5, \\pulse6].do{|i| Ndef(i).map(\\pitch, Ndef(\\krm1));}');
  // robot.keyTap('enter', 'shift'); robot.keyTap('enter');
//     }
//   }
// }

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



  //  motifsString = motifs.join();
  motifsString = motifmem.memory.join();
  prememString = premotifmem.memory.join();
  chromaticString = chromatic.join();
  regpattern = new RegExp(chromaticString);

   var regtest = motifsString.match(chromaticString);
   var prememtest = prememString.match(chromaticString);
  //  var match = regpattern.exec(motifsString);

// console.log("PREMEM -> " + prememString);
// console.log("MATCH -> " + prememtest);

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



if (deltaTime > 1) {
  console.log("MATCH -> " + prememtest);

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

memoryL.memorize(minimotifsL.memory[minimotifsL.memory.length-1], 3);
memoryM.memorize(minimotifsM.memory[minimotifsM.memory.length-1], 3);
memoryH.memorize(minimotifsH.memory[minimotifsH.memory.length-1], 3);

var listenL = countNotes(memoryL.memory, msg[1]);
var listenM = countNotes(memoryM.memory, msg[1]);
var listenH = countNotes(memoryH.memory, msg[1]);

// console.log("no. of repeated noted -> " + listen);

if (listenL == 2 || listenM == 2 || listenH == 2) { // tremolo = 4
intervalL = Math.abs(memoryL.memory[0] - memoryL.memory[1]);
intervalM = Math.abs(memoryM.memory[0] - memoryM.memory[1]);
intervalH = Math.abs(memoryH.memory[0] - memoryM.memory[1]);

if (intervalL > 0 || intervalM > 0 || intervalH > 0) {
intervalmemL.memorize(intervalL, 2);
intervalmemM.memorize(intervalM, 2);
intervalmemH.memorize(intervalH, 2);

intervalsumL = intervalmemL.memory.reduce( (total,sum)=> { return total - sum});
intervalsumM = intervalmemM.memory.reduce( (total,sum)=> { return total - sum});
intervalsumH = intervalmemH.memory.reduce( (total,sum)=> { return total - sum});

// console.log("sum -> " + intervalsum);

if (intervalsumL == 0) {
// console.log("no change...");
} else {
// console.log("new interval...");
if (intervalsumM > 0) {
  console.log("low interval -> " + intervalM);
  robot.typeString('~tremoloM = ' + intervalM);
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
} else if (intervalsumL > 0) {
  console.log("low interval -> " + intervalL);
  if (lMap === true) {
  robot.typeString('Tdef(\\snippet2).set(\\rit, ' + intervalL + ' )');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
} else if (intervalsumH > 0) {
  console.log("high interval -> " + intervalH);
  robot.typeString('~tremoloH = ' + intervalH);
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
}

}
// robot.typeString('~tremolo = ' + interval);
    } // > 0 fi=
  } // tremolo fi
}

 });
