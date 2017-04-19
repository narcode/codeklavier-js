/*

-> toy piano sampler by narcode. April 2017 <-

Thanks to BobRob and Anne Veinberg for Recording this

*/

{
// load the custom toy piano samples
b = ();
~path = thisProcess.nowExecutingPath.dirname;
s.sync;
29.do{|i|
  ~num = 36 + i;
  b[i] = Buffer.read(s, ~path++"/TPSamples/"++~num++".wav");
};
s.sync;

// sampler node:
MIDIdef.noteOn(\toypiano, {arg ...args;
  var midinote = args[1]-56;
  /*args.postln;*/
if (midinote < 64) {
  Ndef(midinote.asSymbol, {PlayBuf.ar(2, b[midinote], loop:0) * EnvGen.kr(Env.perc(0.01, 1.5))}).play(0);
    }
  }, srcID: 1151127154);

s.sync;

}.fork;
