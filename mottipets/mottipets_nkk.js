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
input.getPortName(1);
input.openPort(1);

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
  minimotifsM.memory = [];
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
  minimotifsM.memory = [];
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

 // on message write to a stream
 input.on('message', function(deltaTime, msg) {
   // motifs.push(msg[1]);
   if (msg[0] == deviceid && msg[2] > 0) { // filling in the memory:
  //  console.log(motifs);
motifmem.memorize(msg[1], 20, false, 'Big motifs -> ');

if (msg[1] >= chromatic[0] && msg[1] < chromatic[chromatic.length-1]) {
premotifmem.memorize(msg[1], chromatic.length*1);
}

// piano divisions (not for NKK)
// if (msg[1] <= pianosectons[0]) {
// minimotifsL.memorize(msg[1], 20, false, 'L');
// } else if (msg[1] <= pianosectons[1]) {
// minimotifsM.memorize(msg[1], 20, false, 'M');
// } else if (msg[1] > pianosectons[1]) {
// minimotifsH.memorize(msg[1], 20, false, 'H');
// }

minimotifsM.memorize(msg[1], 20, false, 'M');


   } // fi

// Lowregister:
if (minimotifSearch(minimotifsL.memory, miniM1L, 1)) {
  mmotifcountL++;
    if (mmotifcountL === 1) {
      if (mmotifcountL2 > 0) {mmotifcountL2 = 0};
  console.log("motif L mapped! --> " + mmotifcountL + ' times...');
lMap = true;
lMap2 = false;
// unmap:
if (motif2counter > 0) {
robot.typeString('Ndef(\\acc).set(\\amp, ~tremoloL.linlin(1, 16, 0, 3));');
robot.keyTap('enter', 'shift'); robot.keyTap('enter');
    }
  }
}
if (minimotifSearch(minimotifsL.memory, miniM2L, 2)) {
  mmotifcountL2++;
    if (mmotifcountL2 === 1) {
      if (mmotifcountL > 0) {mmotifcountL = 0};
  console.log("motif L2 mapped! --> " + mmotifcountL2 + ' times...');
lMap2 = true;
//unmap:
lMap = false;
//map:
robot.typeString('Ndef(\\acc).map(\\amp, Ndef(\\krm2_2));');
robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
}

// Mid register:
if (minimotifSearch(minimotifsM.memory, miniM1M, 1)) {
  mmotifcountM++;
  if (mmotifcountM === 1) {
    if (mmotifcountM2 > 0) {mmotifcountM2 = 0};
  console.log("motif M mapped! --> " + mmotifcountM + ' times...');
  robot.typeString('[\\pulse, \\pulse2, \\pulse3, \\pulse4, \\pulse5, \\pulse6].do{|i| Ndef(i).map(\\pitch, Ndef(\\krm1));}');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  // unmap others:
  if (motif2counter > 0) {
  mMap2 = false;
  robot.typeString('Ndef(\\acc).set(\\note, ~tremoloM.linlin(1, 16, 80, 800));');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
    }
  }
}
if (minimotifSearch(minimotifsM.memory, miniM2M, 2)) {
  mmotifcountM2++;
  if (mmotifcountM2 === 1) {
    if (mmotifcountM > 0) {mmotifcountM = 0};
  console.log("motif M2 mapped! --> " + mmotifcountM2 + ' times...');
  mMap2 = true; // do i need this ?
  robot.typeString('Ndef(\\acc).map(\\note, Ndef(\\krm2_1));');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  // unmap others:
  robot.typeString('[\\pulse, \\pulse2, \\pulse3, \\pulse4, \\pulse5, \\pulse6].do{|i| Ndef(i).set(\\pitch, ~tremoloM.linlin(1, 16, 200, 3000));}');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
}

// High register:
if (minimotifSearch(minimotifsH.memory, miniM1H, 1)) {
  mmotifcountH++;
  if (mmotifcountH === 1) {
    if (mmotifcountH2 > 0) {mmotifcountH2 = 0};
  console.log("motif H mapped! --> " + mmotifcountH + ' times...');
  robot.typeString('[\\pulse, \\pulse2, \\pulse3, \\pulse4, \\pulse5, \\pulse6].do{|i| Ndef(i).map(\\fx, Ndef(\\krm3));}');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  // unmap:
  if (motif2counter > 0) {
  hMap2 = false;
  robot.typeString('Ndef(\\acc).set(\\fx, ~tremoloH.linlin(1, 16, 0, 15));');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
    }
  }
}
if (minimotifSearch(minimotifsH.memory, miniM2H, 2)) {
  mmotifcountH2++;
  if (mmotifcountH2 === 1) {
    if (mmotifcountH > 0) {mmotifcountH = 0};
  console.log("motif H2 mapped! --> " + mmotifcountH2 + ' times...');
  hMap2 = true;
  robot.typeString('Ndef(\\acc).map(\\fx, Ndef(\\krm2_3));');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  // unmap:
  robot.typeString('[\\pulse, \\pulse2, \\pulse3, \\pulse4, \\pulse5, \\pulse6].do{|i| Ndef(i).set(\\fx, ~tremoloH.linlin(1, 16, 1, 88));}');
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

// console.log("PREMEM -> " + prememString);

// motifs to snippets:
// this is OLD, legacy...
   if (regtest != null) {
   if (regtest.length > 0) {
   console.log('true! -> ' + regtest);
   console.log('length -> ' + chromatic.length);
   robot.typeString('~snippet1 = Tdef(\\snippet1, {|ev| loop{ Ndef(~name.next, {|pitch=400,fx=88| SinOsc.ar(456*LFTri.kr(fx).range(100, pitch)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/ev.rit).wait;}}).play;');
   robot.keyTap('enter', 'shift'); robot.keyTap('enter');
   // ignore or listen to motif based on delta time?
 ignore = true;
//motifs.splice();
     }
   }


      // motif 2:
      if (msg[0] == deviceid && msg[2] > 0) { // filling in the memory:
   if (compareMotifnoTolerance(motifmem.memory, motif2, 55) == true) {
     motif2counter++;
     console.log("motif 2 matched " + motif2counter);
     if (motif2counter == 1) {
console.log("motif 2 on");
   robot.typeString('~snippet2 = Ndef(\\acc, {|note=500, amp=0.1, cut=200, bw=0.5, fx=0.1| BPF.ar(Resonz.ar(SinOsc.ar([note.lag(1), note.lag(2)*3/2, note*2, note.lag(1.5)*4/3]), note*LFTri.kr(fx).range(1/2, 8), bw), 600, 0.8) * amp.lag(0.5)}).play(0,2);');
   robot.keyTap('enter', 'shift'); robot.keyTap('enter');
   // TODO: make a playing=true variable to prevent modification of the snippet before its played. or use motif counter -> DONE
      }
   }
 }

 // conditional motifs:
 if (msg[0] == deviceid && msg[2] > 0) { // filling in the memory:
if (compareMotif(motifmem.memory, conditional1) == true) {
motif_cond1counter++;
if (motif_cond1counter == 1) {
console.log("motif conditional 1 on!" + "intervalM is " + narcode);
if (motif2counter >= 1 && mMap2 === true && narcode > 7) {
cond1 = true;
  }
    }
  }
}
if (msg[0] == deviceid && msg[2] > 0) { // filling in the memory:
if (compareMotif(motifmem.memory, conditional2) == true) {
motif_cond2counter++;
if (motif_cond2counter == 1) {
console.log("motif conditional 2 on!");
cond2 = true;
   }
 }
}

// conditional-result motifs:
if (msg[0] == deviceid && msg[2] > 0) { // filling in the memory:
if (compareMotif(motifmem.memory, result1) == true) {
result1counter++;
if (result1counter == 1) {
console.log("motif result 1 on!");
if (cond1==true) {
  robot.typeString('Ndef(\\cond, {SinOsc.ar(440)*0.07}).play(0,2);');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  cond1=false;
  motif_cond1counter=0;
  result1counter = 0;
} else {
  // robot.keyTap('.', 'command');
  // narctest = narcode;
  // robot.typeString('~tremoloM = ' + narctest);
  // robot.keyTap('enter', 'shift'); robot.keyTap('enter');
}
if (cond2==true) {
  robot.typeString('Ndef(\\cond, {SinOsc.ar(440)*0.07}).play(0,2);');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  cond2=false;
  motif_cond2counter=0;
  result1counter = 0;
} else {

}
    }
  }
}
if (msg[0] == deviceid && msg[2] > 0) { // filling in the memory:

if (listen_to_conditional == true) {
  cond_buffer.memorize(msg[1], 150, false, 'Cond buffer: ');
}

if (compareMotif(motifmem.memory, result2) == true) {
  listen_to_conditional = true;
result2counter++;
if (result2counter == 1) {
console.log("motif result 2 on!");
if (cond2==true) {
  console.log("conditional 2 is true!");

var size = 0;

conditional_loop = setInterval(()=> {
  size = cond_buffer.memory.length;
  if (size > 100) {
    robot.typeString('Tdef(\\snippet1).stop');
    robot.keyTap('enter', 'shift'); robot.keyTap('enter');
    console.log("stopping buffer conditional");
    clearInterval(conditional_loop);
    cond2=false;
    motif_cond2counter=0;
    result2counter = 0;
    ignore = false;
  } else {
    console.log("cond buffer size : " + size);
    }
  cond_buffer.memory = [];
},5000);


}
if (cond1==true) {
  robot.typeString('Tdef(\\snippet1).stop');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  cond1=false;
  motif_cond1counter=0;
}
    }
  }
}


if (deltaTime > 1) { // revise...
  // console.log("MATCH -> " + prememtest);

  ignore = false;
  // if (motifmem.memory.length > 19) { // length is shorter now...
  motifmem.memory = []; // make this a method too...
  minimotifsL.memory = [];
  minimotifsM.memory = [];
  minimotifsH.memory = [];
  memoryL.memory = [];
  memoryM.memory = [];
  memoryH.memory = [];
  // }
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
if (msg[0] == deviceid && msg[2] > 0 && deltaTime < 0.1) {
// console.log("DT -> " + deltaTime);
// memoryL.memorize(minimotifsL.memory[minimotifsL.memory.length-1], 4, false, 'tremolo L');
memoryM.memorize(minimotifsM.memory[minimotifsM.memory.length-1], 4, false, 'tremolo M');
// memoryH.memorize(minimotifsH.memory[minimotifsH.memory.length-1], 4, false, 'tremolo H');

// listenL = countNotes(memoryL.memory, msg[1]);
listenM = countNotes(memoryM.memory, msg[1]);
// listenH = countNotes(memoryH.memory, msg[1]);

// console.log("no. of repeated noted -> " + listenH);

// maybe put in switch?
// if (listenL == 2) { // tremolo = 4
// intervalL = Math.abs(memoryL.memory[2] - memoryL.memory[3]);
// //console.log("low interval -> " + intervalL);
// }

if (listenM == 2) {
  intervalM = Math.abs(memoryM.memory[2] - memoryM.memory[3]);
  // console.log("mid interval -> " + intervalM);
}

// if (listenH == 2) {
//   intervalH = Math.abs(memoryH.memory[2] - memoryH.memory[3]);
//   // console.log("hi interval -> " + intervalH);
// }

// if (intervalL > 0) {
//   intervalmemL.memorize(intervalL, 2, false, 'LMEM');
//   intervalsumL = intervalmemL.memory.reduce( (total,sum)=> {var sum = total-sum; return sum});
//   // console.log("interval reduce L -> " + intervalsumL);
// }

if (intervalM > 0) {
intervalmemM.memorize(intervalM, 2);
intervalsumM = intervalmemM.memory.reduce( (total,sum)=> { return total - sum});
}

// if (intervalH > 0) {
// intervalmemH.memorize(intervalH, 2);
// intervalsumH = intervalmemH.memory.reduce( (total,sum)=> { return total - sum});
// // console.log("interval reduce H -> " + intervalsumH);
// }
// console.log("sum -> " + intervalsum);

if (intervalsumM != 0) {
if (Math.abs(intervalsumM) > 0) {
  memoryM.memory = [];
  narcode = intervalM;
  console.log("mid interval -> " + intervalM);
  robot.typeString(intervalM);
  robot.keyTap('enter', 'shift');
  if (mMap2 === true) {
  narcode = intervalM;
  // robot.typeString(intervalM);
  // robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  }
    }
  }

// if (intervalsumL != 0) {
//   if (Math.abs(intervalsumL) > 0) {
//     // memoryL.memory = [];
//     console.log("low interval -> " + intervalL);
//     if (lMap === true) {
//     // robot.typeString('Tdef(\\snippet1).set(\\rit, ' + intervalL + ' )');
//     // robot.keyTap('enter', 'shift');
//     }
//     if (lMap2 === true) {
//     // robot.typeString(intervalL);
//     // robot.keyTap('enter', 'shift'); robot.keyTap('enter');
//     }
//   }
// }
//
// if (intervalsumH != 0) {
//   if (Math.abs(intervalsumH) > 0) {
//     // memoryL.memory = [];
// console.log("high interval -> " + intervalH);
// // robot.typeString(intervalH);
// // robot.keyTap('enter', 'shift'); robot.keyTap('enter');
// if (hMap2 === true) {
// // robot.typeString(intervalH);
// // robot.keyTap('enter', 'shift'); robot.keyTap('enter');
// }
//   }
// }

} // fi tremolo

 });

 // TODO: re-mapping shouldn't change a parameter firts... debug that.


/// match send it to a class and also store
/// dynamic parallel recognition
