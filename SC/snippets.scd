/*

snippets for Mottipets

*/



// snippet 1: beat
(
r = ();
[1,2,3,4,5,6].do{|i| r[i] = 1};
~amp1 = 0.5;
~rit = Pseq([Pfuncn({r[1]},1), Pfuncn({r[2]},1), Pfuncn({r[3]},1), Pfuncn({r[4]},1)], inf).asStream;
~topR = 8590;
~rit2 = 1;


~snippet1 = Tdef(\snippet1, {
loop{
Ndef(\pulse, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0);
(1/~rit.next).wait;
}
  }).play;

);

r[1]=2
r[3]=3
r[4]=7
r[2]=2




~snippet1.stop;


~snippet2 = Tdef(\snippet2, {
loop{
Ndef(\pulse2, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);

(1/~tremolo).wait;
}
  }).play;


/// RECOGNIZING ANNE's TREMOLOS:

~tremolo = 1;

~tremolo = 7
~tremolo = 4
~tremolo = 2
~tremolo = 7

~tremolo = 4

~tremolo = 2
~tremolo = 7
~tremolo = 4
~tremolo = 5
~tremolo = 7
~tremolo = 5
~tremolo = 7
~tremolo = 2
~tremolo = 9
~tremolo = 2
~tremolo = 1
~tremolo = 12
~tremolo = 14
~tremolo = 19
~tremolo = 2
~tremolo = 19
~tremolo = 12
~tremolo = 1
~tremolo = 2
~tremolo = 4
~tremolo = 2
~tremolo = 5
~tremolo = 7
~tremolo = 5
~tremolo = 1

~snippet2 = Tdef(\snippet2, { loop{ Ndef(\pulse2, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 32
~tremolo = 36
~tremolo = 4
~tremolo = 5
~tremolo = 2
~tremolo = 12
~tremolo = 0
~tremolo = 11
~tremolo = 4

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 30
~tremolo = 7
~tremolo = 6
~tremolo = 4
~tremolo = 2
~tremolo = 5
~tremolo = 3
~tremolo = 2


~name = Pseq([\pulse, \pulse2, \pulse3, \pulse4, \pulse5, \pulse6], inf).asStream;
