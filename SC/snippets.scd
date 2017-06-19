/*

snippets for Mottipets

*/

// snippet 1: beat
(
r = ();
[1,2,3,4,5,6].do{|i| r[i] = 1};
~amp1 = 0.5;
~rit = Pseq([Pfuncn({r[1]},1), Pfuncn({r[2]},1), Pfuncn({r[3]},1), Pfuncn({r[4]},1)], inf).asStream;
~topR = 3000;
~rit2 = 1;
~name = Pseq([\pulse, \pulse2, \pulse3, \pulse4, \pulse5, \pulse6],inf).asStream;
~tremolo = 1;

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
Ndef(\pulse2, {|pitch=400| SinOsc.ar(456*LFTri.kr(88).range(300, pitch)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);

(1/1).wait;
}
  }).play;


Ndef(\pulse2).map(\pitch, Ndef(\krm1));

Ndef(\pulse2).map(\pitch, 400);

//loop listener?
Tdef(\listenerkr, {
  loop{
    Ndef(\krm1, {~tremolo.linlin(1, 16, 200, 3000)});
    0.5.wait;
    }
  }).play

/// RECOGNIZING ANNE's TREMOLOS:
s.boot;
