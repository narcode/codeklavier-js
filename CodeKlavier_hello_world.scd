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
~pitch = 0;~pitch1 = 0;~pitch2 = 0;

~ost=Pdef(\ostinato1, {Pbind(\dur, Pseq([Pfuncn({1/h}, 1), Pfuncn({1/e},1), Pfuncn({1/l},1)], inf), \ctranspose, Pfunc{~pitch}, \midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});

~ost1=Pdef(\ostinato2, {Pbind(\dur, Pseq([Pfuncn({1/o}, 1), Pfuncn({1/w},1), Pfuncn({1/r},1)], inf), \ctranspose, Pfunc{~pitch1}, \midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});

~ost2=Pdef(\ostinato3, {Pbind(\dur, Pseq([Pfuncn({1/d}, 1), Pfuncn({1/a},1), Pfuncn({1/n},1)], inf), \ctranspose, Pfunc{~pitch2}, \midinote, Pseq(["ab3".namemidi, "B3".namemidi, "C4".namemidi, "gb3".namemidi, "f3".namemidi, "db3".namemidi, "C4".namemidi, "ab3".namemidi], inf), \type, \midi, \midiout, m)});


h=e=l=1;
r=o=w=1;
a=d=n=1;

~p = 1; // ????
)


/// re-pitching:
(
Tdef(\changeq, {
	1.do {
		"running...".postln;
	if (~op == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato1 ***" + ~pitch + " semitones up").postln;
			}
		});
	};

	if (~op == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~op1 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, 12).round(1);
			  ("ostinato2 ***" + ~pitch1 + " semitones up").postln;
			}
		});
	};

	if (~op1 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~op2 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato3 *** " + ~pitch2 + " semitones up").postln;
			}
		});
	};

	if (~op2 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~down == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato1 ***" + ~pitch + " semitones down").postln;
			}
		});
	};

	if (~down == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~down1 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, -7).round(1);
			  ("ostinato2 ***" + ~pitch1 + " semitones down").postln;
			}
		});
	};

	if (~down1 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~down2 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato3 ***" + ~pitch2 + " semitones down").postln;
			}
		});
	};

	if (~down2 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};
	}
});
 );

SkipJack({
	/*var key = "narcode".scramble;
Tdef(key.asSymbol, {*/
	1.do {
		("running...").postln;
	if (~op == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato1 ***" + ~pitch + " semitones up").postln;
			}
		});
	};

	if (~op == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~op1 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, 12).round(1);
			  ("ostinato2 ***" + ~pitch1 + " semitones up").postln;
			}
		});
	};

	if (~op1 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~op2 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, 12).round(1);
				("ostinato3 *** " + ~pitch2 + " semitones up").postln;
			}
		});
	};

	if (~op2 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~down == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato1 ***" + ~pitch + " semitones down").postln;
			}
		});
	};

	if (~down == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~down1 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch1 = args[0].linlin(0, 127, 0, -7).round(1);
			  ("ostinato2 ***" + ~pitch1 + " semitones down").postln;
			}
		});
	};

	if (~down1 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};

	if (~down2 == 1) {
		MIDIdef.cc(\pedalpitch, {arg ...args;
			if (args[1] == 64) {
				~pitch2 = args[0].linlin(0, 127, 0, -7).round(1);
				("ostinato3 ***" + ~pitch2 + " semitones down").postln;
			}
		});
	};

	if (~down2 == 0) {
MIDIdef.cc(\pedalpitch).free;
	};
}; }, 1, name: "pedalwatch");

/// if you want to stop the pedal watcher:
SkipJack.stop("pedalwatch");
