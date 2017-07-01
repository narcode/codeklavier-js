/*

snippets for Mottipets

*/

t = TempoClock.default;
t.tempo = 20/60;

// snippet 1: beat
(
s.reboot;
r = ();
[1,2,3,4,5,6].do{|i| r[i] = 1};
~amp1 = 0.5;
~rit = Pseq([Pfuncn({r[1]},1), Pfuncn({r[2]},1), Pfuncn({r[3]},1), Pfuncn({r[4]},1)], inf).asStream;
~topR = 3000;
~rit2 = 1;
~name = Pseq([\pulse, \pulse2, \pulse3, \pulse4, \pulse5, \pulse6],inf).asStream;
~tremoloM = 1;
~tremoloH = 1;
~tremoloL = 1;
~rit = 1;
~ampacc= 0.4;

~snippet1 = Ndef(\acc, {|note=500, amp=0.1, cut=200, bw=0.5, fx=0.1| Resonz.ar(SinOsc.ar([note.lag(1), note.lag(2)*3/2, note*2, note.lag(1.5)*4/3]), note*LFTri.kr(fx).range(1/2, 8), bw) * amp}).play(0,2);

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

[\pulse, \pulse2, \pulse3, \pulse4, \pulse5, \pulse6].do{|i| Ndef(i).map(\pitch, Ndef(\krm1));}

Ndef(\pulse2).map(\pitch, 400);


//loop listener? is there a better solution?
Tdef(\listenerkr, {
  loop{
    Ndef(\krm1, {~tremoloM.linlin(1, 16, 200, 3000)}); // pitch
    /*Tdef(\snippet2).set(\rit, ~tremoloL);// speed*/
    Ndef(\krm3, {~tremoloH.linlin(1, 16, 1, 88)}); // fx

// motif2
    Ndef(\krm2_1, {~tremoloM.linlin(1, 16, 80, 800)}); // pitch
    Ndef(\krm2_2, {~tremoloL.linlin(1, 16, 0, 0.5)}); // amp
    Ndef(\krm2_3, {~tremoloH.linlin(1, 16, 0, 1)}); // fx


    0.5.wait;
    }
}).play


/// RECOGNIZING ANNE's TREMOLOS:
Ndef(\acc).map(\note, Ndef(\krm2_1));
