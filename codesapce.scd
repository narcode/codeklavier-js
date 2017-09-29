// universal
~path = thisProcess.nowExecutingPath.dirname

// hello world Nacht van Kunst en Kennis
(~path ++ "/SC/CodeKlavier_hello_world_nkk.scd").load;
{2.do{(~path ++ "/SC/toypiano_sampler.scd").load; 2.wait}}.fork;

// mottipets:
(~path ++ "/SC/snippets.scd").load;

//////////// ⬇
~tremoloM = 7
~tremoloM = 12
~tremoloM = 11
~tremoloM = 10
~tremoloM = 12
~tremoloM = 11
~snippet1 = Tdef(\1, {|ev| loop{ Ndef(~name.next, {|pitch=400,fx=88| SinOsc.ar(456*LFTri.kr(fx).range(100, pitch)) * EnvGen.kr(Env.perc) * ~amp1}).play(0,2);(1/ev.rit).wait;}}).play(quant:0);
