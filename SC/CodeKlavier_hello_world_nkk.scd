// midi mappings:
s.waitForBoot({
	"starting MIDI...".postln;
	MIDIIn.connectAll;
s.sync;
MIDIClient.init;
s.sync;
MIDIIn.connectAll;
s.sync;
m = MIDIOut.newByName("IAC Driver", "Bus 1");
s.sync;
// hello world \\
(
t = TempoClock.default.tempo=1;
s.sync;
"setting variables and ostinatos...".postln;
~pitch1 = 0;~pitch2 = 0;~pitch3 = 0;
// adjust the quant;
~quant=1/4;
s.sync;
// ostinatos:
~ost1=Pdef(\ostinato1, {Pbind(\dur, Pseq([Pfuncn({1/h}, 1), Pfuncn({1/e},1), Pfuncn({1/l},1)], inf), \ctranspose, Pfunc{~pitch1},
\midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi], inf),
\type, \midi, \chan,3,\midiout, m)});
~ost1.quant=~quant;
~ost2=Pdef(\ostinato2, {Pbind(\dur, Pseq([Pfuncn({1/o}, 1), Pfuncn({1/w},1), Pfuncn({1/r},1)], inf), \ctranspose, Pfunc{~pitch2},
\midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi], inf),
\type, \midi,\chan,3,\midiout, m)});
~ost2.quant=~quant;
~ost3=Pdef(\ostinato3, {Pbind(\dur, Pseq([Pfuncn({1/d}, 1), Pfuncn({1/a},1), Pfuncn({1/n},1)], inf), \ctranspose, Pfunc{~pitch3},
\midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi], inf),
\type, \midi,\chan,3,\midiout, m)});
~ost3.quant=~quant;
s.sync;
// stop
~stop=Tdef(\stop, {
	1.do{
	~hello1.stop;~hello2.stop;~hello3.stop;
	~ost1.stop;~ost2.stop;~ost3.stop;
	~reset.play;
		};
	});
// random ostinatos
~rand=Tdef(\randostinato, {
var rit = (1/2).rrand(4).round(0.5);
var rit2 = (1/2).rrand(4).round(0.5);
var rit3 = (1/2).rrand(4).round(0.5);
var randrit = [Pfuncn({1/(h*rit)}, 1), Pfuncn({1/(e*rit2)},1), Pfuncn({1/(l*rit3)},1)];
var randpitch = ["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi].scramble;
	Pdef(\ostinato1, {Pbind(\dur, Pseq(randrit, inf);, \ctranspose, Pfunc{~pitch},
\midinote, Pseq(randpitch, inf),
\type, \midi, \midiout, m)})});
s.sync;
// hello pulse
~hello1=Pdef(\hello, {Pbind(\dur, Pseq([2], inf), \ctranspose, Pfunc{~h1o}, \midinote, Pseq(["a2".namemidi], inf), \type, \midi, \midiout, m, \chan, 0)});
~hello1.quant=~quant;
~hello2=Pdef(\hello2, {Pbind(\dur, Pseq([2], inf), \ctranspose, Pfunc{~h2o}, \midinote, Pseq(["a2".namemidi], inf), \type, \midi, \midiout, m, \chan, 1)});
~hello2.quant=~quant;
~hello3=Pdef(\hello3, {Pbind(\dur, Pseq([2], inf), \ctranspose, Pfunc{~h3o}, \midinote, Pseq(["a2".namemidi], inf), \type, \midi, \midiout, m, \chan, 2)});
~hello3.quant=~quant;
s.sync;
~hello2.quant=~quant;
~h1o=~h2o=~h3o=0;
s.sync;
h=e=l=o=w=d=a=r=n=1;
~op1=0;~op2=0;~op3=0;~neer1=0;~neer2=0;~neer3=0;
s.sync;
~reset = Tdef(\reset, {1.do{h=e=l=o=w=d=a=r=n=1; t.tempo=1;
	~afx1=0;~afx2=0;~afx3=0;
	~del1=1;~del2=1;~del3=3;
	~r3=1;
	~h1o=~h2o=~h30=0;
	~ost1=Pdef(\ostinato1, {Pbind(\dur, Pseq([Pfuncn({1/h}, 1), Pfuncn({1/e},1), Pfuncn({1/l},1)], inf), \ctranspose, Pfunc{~pitch1},
	\midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi], inf),
	\type, \midi, \midiout, m)});
	~ost2=Pdef(\ostinato2, {Pbind(\dur, Pseq([Pfuncn({1/a}, 1), Pfuncn({1/f},1), Pfuncn({1/x},1)], inf), \ctranspose, Pfunc{~pitch2},
	\midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi], inf),
	\type, \midi, \midiout, m)});
	~ost3=Pdef(\ostinato3, {Pbind(\dur, Pseq([Pfuncn({1/n}, 1), Pfuncn({1/o},1), Pfuncn({1/p},1)], inf), \ctranspose, Pfunc{~pitch3},
	\midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi], inf),
	\type, \midi, \midiout, m)});
		}
	});
	s.sync;
);
(
"variables for SHA fx".postln;
~afx1=0;~afx2=0;~afx3=0;
~del1=1;~del2=1;~del3=3;
~r3=1;
	);
(
	"starting routine for re-pitching with piano pedal...".postln;
	/// re-pitching:
SkipJack({
	/*var key = "narcode".scramble;
Tdef(key.asSymbol, {*/
Tdef(\maps1, {
	inf.do{
		/*"debug".postln;*/
	Ndef(\fx).map(\del, Ndef(\krd, ~del1.abs+(0.0001)));
	Ndef(\fx).map(\amp, Ndef(\kra, ~afx1.linlin(0, 5, 0, 2)+~afx1/100));

	Ndef(\fx1).map(\del, Ndef(\krd2, ~del2.abs+(0.0001)));
	Ndef(\fx1).map(\amp, Ndef(\kra2, ~afx2.linlin(0,5,0,2)+~afx2/100));

	Ndef(\fx2).map(\del, Ndef(\krd3, ~del3.abs+(0.0001)));
	Ndef(\fx2).map(\amp, Ndef(\kra3, ~afx3.linlin(0,5,0,2)+~afx3/100));
	Ndef(\fx2).map(\rate, Ndef(\krr3, ~r3));
0.1.wait;
}
	}).play;


	1.do {

	if (~op1 > 0) {
		/*("op ---> running").postln;*/

		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato1 ***" + ~pitch1 + " semitones up").postln;
			}
		});
	};

	if (~op1 < 0) {
		/*("op ----> stopped").postln;*/
MIDIdef.cc(\pedalpitch).free;
	};

	if (~op2 > 0) {
		MIDIdef.cc(\pedalpitchop1, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, 12).round(1);
			  ("ostinato2 ***" + ~pitch2 + " semitones up").postln;
			}
		});
	};

	if (~op2 < 0) {
MIDIdef.cc(\pedalpitchop1).free;
	};

	if (~op3 > 0) {
		MIDIdef.cc(\pedalpitchop2, {arg ...args;
			if (args[1] == 64) {
				~pitch3 = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato3 *** " + ~pitch3 + " semitones up").postln;
			}
		});
	};

	if (~op3 < 0) {
MIDIdef.cc(\pedalpitchop2).free;
	};

	if (~neer1 > 0) {
		("down ---> running").postln;
		MIDIdef.cc(\pedalpitchd, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato1 ***" + ~pitch1 + " semitones down").postln;
			}
		});
	};

	if (~neer1 < 0) {
		/*("down ----> stopped").postln;*/

MIDIdef.cc(\pedalpitchd).free;
	};

	if (~neer2 > 0) {
		MIDIdef.cc(\pedalpitchd1, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, -7).round(1);
			  ("ostinato2 ***" + ~pitch2 + " semitones down").postln;
			}
		});
	};

	if (~neer2 < 0) {
MIDIdef.cc(\pedalpitchd1).free;
	};

	if (~neer3 > 0) {
		MIDIdef.cc(\pedalpitchd2, {arg ...args;
			if (args[1] == 64) {
				~pitch3 = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato3 ***" + ~pitch3 + " semitones down").postln;
			}
		});
	};

	if (~neer3 < 0) {
MIDIdef.cc(\pedalpitchd2).free;
	};
}; }, 1, name: "pedalwatch");
);
s.sync;
"CodeKlavier is ready and listening...".postln;
}.fork;
);

/// if you want to stop the pedal watcher:
/*SkipJack.stop("pedalwatch");*/
