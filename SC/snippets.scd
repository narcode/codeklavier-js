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

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 2
~tremolo = 1
~tremolo = 7
~tremolo = 9
~tremolo = 12
~tremolo = 28
~tremolo = 1
~tremolo = 16
~tremolo = 7
~tremolo = 22
~tremolo = 1
~tremolo = 2
~tremolo = 3
~tremolo = 7
~tremolo = 25
~tremolo = 1
~tremolo = 2
~tremolo = 3
~tremolo = 4
~tremolo = 5
~tremolo = 6
~tremolo = 7
~tremolo = 8
~tremolo = 7
~tremolo = 8
~tremolo = 9
~tremolo = 10
~tremolo = 11
~tremolo = 12
~tremolo = 13
~tremolo = 7
~tremolo = 1

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 7
~tremolo = 1
~tremolo = 3
~tremolo = 2
~tremolo = 5
~tremolo = 11
~tremolo = 5
~tremolo = 1
~tremolo = 6
~tremolo = 2
~tremolo = 4
~tremolo = 12
~tremolo = 2
~tremolo = 1
~tremolo = 2
~tremolo = 3
~tremolo = 1

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 7

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 20
~tremolo = 7
~tremolo = 18
~tremolo = 1
~tremolo = 3
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 2
~tremolo = 4
~tremolo = 1
~tremolo = 2
~tremolo = 1
~tremolo = 6
~tremolo = 5
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 1
~tremolo = 4
~tremolo = 27
~tremolo = 23
~tremolo = 16
~tremolo = 7
~tremolo = 27
~tremolo = 17
~tremolo = 1
~tremolo = 10
~tremolo = 4
~tremolo = 5
~tremolo = 7
~tremolo = 9
~tremolo = 4
~tremolo = 5
~tremolo = 2
~tremolo = 17
~tremolo = 3
~tremolo = 14
~tremolo = 3
~tremolo = 14
~tremolo = 3
~tremolo = 17
~tremolo = 14
~tremolo = 3
~tremolo = 17
~tremolo = 14
~tremolo = 3
~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
~tremolo = 1

~snippet2 = Tdef(\snippet2, { loop{ Ndef(~name.next, {SinOsc.ar(456*LFTri.kr(88).range(300, ~topR)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/~tremolo).wait;}}).play;
