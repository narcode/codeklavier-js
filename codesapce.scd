// universal"
~path = thisProcess.nowExecutingPath.dirname

// hello world
(~path ++ "/SC/CodeKlavier_hello_world_v3.scd").load;
(~path ++ "/SC/toypiano_sampler.scd").load;

// mottipets:
(~path ++ "/SC/snippets.scd").load;



// TODO: ctl+cmd+m to select all in bracket
Ndef(\cond, {SinOsc.ar(440)*0.07}).play(0,2);
Ndef(\cond, {SinOsc.ar(440)*0.07}).play(0,2);
