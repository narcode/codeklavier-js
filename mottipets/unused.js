// conditional buffer

if (cond2==true) {

var size = 0;

conditional_loop = setInterval(()=> {
  size = cond_buffer.memory.length;
  console.log("cond buffer size : " + size);
  cond_buffer.memory = [];
},5000);

if (size > 100) {
  robot.typeString('Tdef(\\snippet2).stop');
  robot.keyTap('enter', 'shift'); robot.keyTap('enter');
  cond2=false;
  motif_cond2counter=0;
  console.log("stopping buffer conditional");
  clearInterval(conditional_loop);
} else {
  console.log("cond buffer size : " + size);
  }
}


//// motif 2 debug:
//not:
[72,44,51,68,63,60,63,68,72,68,63,60]

// good:
[72,68,51,63,60,44,63,60,58,61,49,55]
