// midi mappings:

s.boot;

MIDIIn.connectAll;

/*MIDIdef.noteOn(\test, {arg ...args;
	args.postln;
});*/

MIDIClient.init;
MIDIIn.connectAll;
m = MIDIOut.newByName("IAC Driver", "Bus 1");

// hello world \\
(
~pitch = 0;~pitch1 = 0;~pitch2 = 0; ~pulsepitch = 0;

// ostinatos:
~ost=Pdef(\ostinato1, {Pbind(\dur, Pxrand([Pfuncn({1/h}, 1), Pfuncn({1/e},1), Pfuncn({1/l},1)], inf), \ctranspose, Pfunc{~pitch}, \midinote, Pxrand(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});
~ost.quant=0;
~ost1=Pdef(\ostinato2, {Pbind(\dur, Pseq([Pfuncn({1/o}, 1), Pfuncn({1/w},1), Pfuncn({1/r},1)], inf), \ctranspose, Pfunc{~pitch1}, \midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});
~ost1.quant=0;
~ost2=Pdef(\ostinato3, {Pbind(\dur, Pseq([Pfuncn({1/d}, 1), Pfuncn({1/a},1), Pfuncn({1/n},1)], inf), \ctranspose, Pfunc{~pitch2}, \midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});
~ost2.quant=0;

// hello pulse
~hello=Pdef(\hello, {Pbind(\dur, Pseq([2], inf), \ctranspose, Pfunc{~h1o}, \midinote, Pseq(["a2".namemidi], inf), \type, \midi, \midiout, m)});
~hello.quant=0;
~hello2=Pdef(\hello2, {Pbind(\dur, Pseq([2], inf), \ctranspose, Pfunc{~h2o}, \midinote, Pseq(["a2".namemidi], inf), \type, \midi, \midiout, m)});
~hello2.quant=0;
~hello3=Pdef(\hello3, {Pbind(\dur, Pseq([2], inf), \ctranspose, Pfunc{~h3o}, \midinote, Pseq(["a2".namemidi], inf), \type, \midi, \midiout, m)});
~hello3.quant=0;

~hello2.quant=0;
~h1o=0;
~h2o=0;
~h3o=0;

~hello2.play;

h=e=l=o=w=d=a=r=n=1;

~p = 1; // ????

~reset = Tdef(\reset, {1.do{h=e=l=o=w=d=a=r=n=1; t.tempo=1; ~h1o=~h2o=~h30=0}});
)


/// re-pitching:
(
SkipJack({
	/*var key = "narcode".scramble;
Tdef(key.asSymbol, {*/
	1.do {

if (~rand == 1) {
	~ost=Pdef(\ostinato1, {Pbind(\dur, Pxrand([Pfuncn({1/h}, 1), Pfuncn({1/e},1), Pfuncn({1/l},1)], inf), \ctranspose, Pfunc{~pitch}, \midinote, Pxrand(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});
};

if (~rand == 0) {
	~ost=Pdef(\ostinato1, {Pbind(\dur, Pseq([Pfuncn({1/h}, 1), Pfuncn({1/e},1), Pfuncn({1/l},1)], inf), \ctranspose, Pfunc{~pitch}, \midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});
};

	if (~op == 1) {
		/*("op ---> running").postln;*/

		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato1 ***" + ~pitch + " semitones up").postln;
			}
		});
	};

	if (~op == 0) {
		/*("op ----> stopped").postln;*/
MIDIdef.cc(\pedalpitch).free;
	};

	if (~op1 == 1) {
		MIDIdef.cc(\pedalpitchop1, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, 12).round(1);
			  ("ostinato2 ***" + ~pitch1 + " semitones up").postln;
			}
		});
	};

	if (~op1 == 0) {
MIDIdef.cc(\pedalpitchop1).free;
	};

	if (~op2 == 1) {
		MIDIdef.cc(\pedalpitchop2, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato3 *** " + ~pitch2 + " semitones up").postln;
			}
		});
	};

	if (~op2 == 0) {
MIDIdef.cc(\pedalpitchop2).free;
	};

	if (~down == 1) {
		("down ---> running").postln;
		MIDIdef.cc(\pedalpitchd, {arg ...args;
			if (args[1] == 64) {
				~pitch = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato1 ***" + ~pitch + " semitones down").postln;
			}
		});
	};

	if (~down == 0) {
		/*("down ----> stopped").postln;*/

MIDIdef.cc(\pedalpitchd).free;
	};

	if (~down1 == 1) {
		MIDIdef.cc(\pedalpitchd1, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, -7).round(1);
			  ("ostinato2 ***" + ~pitch1 + " semitones down").postln;
			}
		});
	};

	if (~down1 == 0) {
MIDIdef.cc(\pedalpitchd1).free;
	};

	if (~down2 == 1) {
		MIDIdef.cc(\pedalpitchd2, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato3 ***" + ~pitch2 + " semitones down").postln;
			}
		});
	};

	if (~down2 == 0) {
MIDIdef.cc(\pedalpitchd2).free;
	};
}; }, 1, name: "pedalwatch");
);

/// if you want to stop the pedal watcher:
SkipJack.stop("pedalwatch");
