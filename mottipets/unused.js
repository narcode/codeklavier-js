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
