// universal
~path = thisProcess.nowExecutingPath.dirname

// hello world Nacht van Kunst en Kennis
(~path ++ "/SC/CodeKlavier_hello_world_v_iclc.scd").load;
(~path ++ "/SC/CK_environment.scd").load;
{2.do{(~path ++ "/SC/toypiano_sampler.scd").load; 2.wait}}.fork;

// mottipets:
/*(~path ++ "/SC/snippets.scd").load;*/
