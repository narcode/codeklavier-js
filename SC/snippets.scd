/*

snippets for Mottipets

*/
s.waitForBoot({
	"starting server...".postln;

t = TempoClock.default;
t.tempo = 20/60;
s.sync;
// snippet 1: beat
/*r = ();*/
/*[1,2,3,4,5,6].do{|i| r[i] = 1};*/
s.sync;
~amp1 = 0.1;
~rit = Pseq([Pfuncn({r[1]},1), Pfuncn({r[2]},1), Pfuncn({r[3]},1), Pfuncn({r[4]},1)], inf).asStream;
~topR = 3000;
~rit2 = 1;
~name = Pseq([\pulse, \pulse2, \pulse3, \pulse4, \pulse5, \pulse6],inf).asStream;
~tremoloM = 4;
~tremoloH = 16;
~tremoloL = 2;
~tremoloL1 = 2;
~tremoloL2 = 2;
~tremoloL1amp = 2;
~tremoloM1 = 2;
~tremoloM2 = 1;
~tremoloH1 = 2;
~tremoloH2 = 1;
~rit = 0.1;
~ampacc= 0.4;
~map_rhythm = false;
~map_amplitude = false;
s.sync;

//loop listener? is there a better solution?
Tdef(\listenerkr, {
  loop{
    Ndef(\krm1, {~tremoloM1.linlin(1, 16, 200, 1300)}); // pitch

	if (~map_rhythm == true) { Tdef(\1).set(\rit, ~tremoloL1);}; // rit

	if (~map_amplitude == true) {Tdef(\1).set(\amp, ~tremoloL1amp.linlin(1, 16, 0.01, 0.4));}; //amp
    /*Tdef(\snippet2).set(\rit, ~tremoloL);// speed*/
    Ndef(\krm3, {~tremoloH1.linlin(1, 16, 1, 88)}); // fx

// motif2
    Ndef(\krm2_1, {~tremoloM2.linlin(1, 16, 180, 800)}); // pitch
    Ndef(\krm2_2, {~tremoloL2.linlin(1, 16, 0.01, 0.4)}); // amp
    Ndef(\krm2_3, {~tremoloH2.linlin(1, 16, 0, 15)}); // fx


    0.08.wait;
    }
}).play;

s.sync;
"mottipets ready!...".postln;
});
/// CODE SPACE:
