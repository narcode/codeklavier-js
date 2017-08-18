// universal"
~path = thisProcess.nowExecutingPath.dirname

// hello world (and NKK)
(~path ++ "/SC/CodeKlavier_hello_world_v3.scd").load;
(~path ++ "/SC/toypiano_sampler.scd").load;

// mottipets:
(~path ++ "/SC/snippets.scd").load;

//////////// ⬇
