// universal
~path = thisProcess.nowExecutingPath.dirname

// "hello world" for ICLC
{2.do{(~path ++ "/SC/CodeKlavier_hello_world_v3.scd").load;2.wait}}.fork;
{2.do{(~path ++ "/SC/toypiano_sampler.scd").load; 2.wait}}.fork;

// mottipets:
/*(~path ++ "/SC/snippets.scd").load;*/

//////////// ⬇
